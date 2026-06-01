# Cloudflare Pages Geçiş Kılavuzu

Site Astro ile üretilen **statik** bir site. Bu kılavuz GuzelHosting (cPanel/LiteSpeed)
üzerinden Cloudflare Pages'e taşımanın adımlarını içerir.

> **Önemli:** Bu daldaki kod değişiklikleri canlı siteyi etkilemez. Geçiş ancak
> Cloudflare Pages bağlanıp **DNS çevrildiğinde** gerçekleşir. PR mergelenmeden ve
> Cloudflare bağlanmadan önce canlı site GuzelHosting'de çalışmaya devam eder.

## Kod tarafında yapılanlar (bu PR)

| Eski (cPanel/PHP) | Yeni (Cloudflare) |
|---|---|
| `@astrojs/vercel` adapter | Adapter yok — saf statik build (`output: 'static'`) |
| `.htaccess` 301 yönlendirmeleri | `public/_redirects` (gerçek 301) |
| `.htaccess` regex yönlendirmeleri (`X-tabela → X-tabelaci`) | `functions/_middleware.js` |
| `.htaccess` güvenlik/cache header'ları | `public/_headers` |
| `public/api/contact.php` (PHPMailer/SMTP) | `functions/api/contact.js` (Resend) |
| `.htaccess` hotlink koruması | Cloudflare panel > Scrape Shield > Hotlink Protection |
| LiteSpeed cache purge PHP'leri | Gereksiz (Cloudflare kendi cache'ini yönetir) |

## Geçiş adımları (panel + DNS)

1. **Cloudflare hesabı + site ekle:** `a2reklam.com`'u Cloudflare'e ekle (Free plan).
2. **Pages projesi:** Pages > Connect to Git > bu repo.
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **Ortam değişkeni:** Pages > Settings > Environment variables:
   - `RESEND_API_KEY = re_...` (Production)
4. **Resend kurulumu:** resend.com'da `a2reklam.com` domainini doğrula (DNS kayıtları:
   SPF/DKIM). Gönderen `noreply@a2reklam.com`, alıcı `info@a2reklam.com`.
5. **(Opsiyonel) Rate limit:** KV namespace oluştur, Pages'e `RATE_LIMIT` adıyla bağla.
6. **Panel ayarları:**
   - SSL/TLS > "Always Use HTTPS" → açık
   - Scrape Shield > Hotlink Protection → açık (bant genişliği koruması)
7. **DNS / yayın (geçiş anı):**
   - Önce `*.pages.dev` preview'da her şeyi test et (formlar, yönlendirmeler, sayfalar).
   - Custom domain olarak `a2reklam.com` + `www` ekle.
   - Domain'in nameserver'larını Cloudflare'e çevir **veya** GuzelHosting'de tutup
     ilgili DNS kayıtlarını Cloudflare Pages'e yönlendir.
8. **Geçiş sonrası kontrol:**
   - `/hakkinda/ → /hakkimizda/`, `/bagcilar-tabela/ → /bagcilar-tabelaci/`,
     `/en/* → /`, `/tabelacesitleri/* → /hizmetler/` 301 dönüyor mu?
   - İletişim formu maili `info@a2reklam.com`'a düşüyor mu?
   - `www → non-www` ve HTTPS zorlaması çalışıyor mu?
   - Search Console'da `sitemap-index.xml` hâlâ geçerli mi?

## Domain maliyeti notu

Hosting Cloudflare'de ücretsiz; ancak `.com` alan adının yıllık ücreti devam eder
(GuzelHosting'de tutulabilir ya da Cloudflare Registrar'a maliyetine taşınabilir).

## Geri dönüş (rollback)

DNS değişikliği geri alınabilir: nameserver/DNS kayıtları eski GuzelHosting değerlerine
döndürülür. cPanel ve PHP dosyaları git geçmişinde durur.
