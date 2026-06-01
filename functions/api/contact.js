/**
 * A2 Reklam — İletişim Formu Endpoint (Cloudflare Pages Function)
 *
 * public/api/contact.php'nin yerine geçer. Aynı sözleşme:
 *   POST /api/contact  (JSON)  -> { ok: boolean, ... }
 *   Alanlar: fullName, email, phone, serviceType, message, website (honeypot)
 *
 * Mail gönderimi: Resend API (env.RESEND_API_KEY) -> info@a2reklam.com
 * Rate limit: KV binding "RATE_LIMIT" varsa IP başına saatte 5 istek; yoksa atlanır.
 *
 * Gerekli ortam değişkeni (Cloudflare Pages > Settings > Environment variables):
 *   RESEND_API_KEY = re_...   (gizli; repoya YAZILMAZ)
 * İsteğe bağlı KV binding: RATE_LIMIT
 */

const RECIPIENT = 'info@a2reklam.com';
const SENDER = 'A2 Reklam <noreply@a2reklam.com>'; // Resend'de a2reklam.com doğrulanmalı
const ALLOWED_HOSTS = ['a2reklam.com', 'www.a2reklam.com', 'localhost'];
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600; // saniye

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Referer kontrolü (basit anti-CSRF) — .htaccess/PHP ile aynı mantık
  const referer = request.headers.get('referer') || '';
  if (referer) {
    try {
      const host = new URL(referer).hostname;
      if (!ALLOWED_HOSTS.includes(host)) {
        return json({ ok: false, error: 'Invalid referer' }, 403);
      }
    } catch {
      return json({ ok: false, error: 'Invalid referer' }, 403);
    }
  }

  // Rate limit (KV varsa)
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  if (env.RATE_LIMIT) {
    const key = `rl:${ip}`;
    const count = parseInt((await env.RATE_LIMIT.get(key)) || '0', 10);
    if (count >= RATE_LIMIT_MAX) {
      return json({ ok: false, error: 'Too many requests. Please try again later.' }, 429);
    }
    await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW });
  }

  // Gövdeyi oku
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  // Honeypot — doluysa bot
  if (data.website) {
    return json({ ok: false, error: 'Spam detected' }, 400);
  }

  // Zorunlu alanlar
  for (const field of ['fullName', 'email', 'phone', 'serviceType']) {
    if (!data[field] || String(data[field]).trim() === '') {
      return json({ ok: false, error: `Missing required field: ${field}` }, 400);
    }
  }

  const fullName = String(data.fullName).trim();
  const email = String(data.email).trim();
  const phone = String(data.phone).trim();
  const serviceType = String(data.serviceType).trim();
  const message = String(data.message || '').trim();

  // Doğrulamalar (PHP ile aynı eşikler)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Invalid email address' }, 400);
  }
  if (fullName.length < 3) {
    return json({ ok: false, error: 'Name too short' }, 400);
  }
  if (phone.length < 10) {
    return json({ ok: false, error: 'Invalid phone number' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: 'Mail servisi yapılandırılmamış.' }, 500);
  }

  // Başlık enjeksiyonuna karşı serviceType'ı tek satıra indir
  const safeSubject = `[A2 Reklam] Yeni İletişim Formu - ${serviceType.replace(/[\r\n]+/g, ' ')}`;
  const body =
    `Yeni İletişim Formu Mesajı\n\n` +
    `Ad Soyad: ${fullName}\n` +
    `E-posta: ${email}\n` +
    `Telefon: ${phone}\n` +
    `Hizmet Türü: ${serviceType}\n\n` +
    `Mesaj:\n${message}\n\n` +
    `---\nIP: ${ip}\nZaman: ${new Date().toISOString()}\n`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: SENDER,
      to: [RECIPIENT],
      reply_to: email,
      subject: safeSubject,
      text: body,
    }),
  });

  if (!res.ok) {
    return json({ ok: false, error: 'Failed to send email. Please try again later.' }, 500);
  }

  return json({ ok: true, message: 'Email sent successfully' }, 200);
}
