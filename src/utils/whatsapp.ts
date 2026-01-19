import { WHATSAPP_LINK } from '../consts';

type Lang = 'tr' | 'en' | 'ar';

const BRAND_PATTERNS = [
  /\s*[\-|–|—|\|]\s*A2 Reklam.*$/i,
  /\s*[\-|–|—|\|]\s*A2 Advertising.*$/i,
];

const FALLBACK_TOPICS: Record<Lang, string> = {
  tr: 'tabela projesi',
  en: 'signage project',
  ar: 'مشروع لافتات',
};

interface WhatsAppMessageOptions {
  lang: Lang;
  pageTitle?: string | null;
  location?: string | null;
  prompt?: string | null;
}

export function sanitizePageTitle(title?: string | null): string | null {
  if (!title) return null;
  let cleaned = title.trim();
  for (const pattern of BRAND_PATTERNS) {
    cleaned = cleaned.replace(pattern, '').trim();
  }
  return cleaned || null;
}

export function buildWhatsAppMessage({
  lang,
  pageTitle,
  location,
  prompt,
}: WhatsAppMessageOptions): string {
  const topic = pageTitle || FALLBACK_TOPICS[lang];
  const parts: string[] = [];

  if (prompt) {
    parts.push(prompt);
  }

  if (lang === 'tr') {
    parts.push(`Merhaba, ${topic} için teklif almak istiyorum.`);
    parts.push('Keşif ve montaj süresi hakkında bilgi rica ederim.');
    if (location) parts.push(`Konum: ${location}.`);
    return parts.join(' ');
  }

  if (lang === 'ar') {
    parts.push(`مرحبًا، أود الحصول على عرض سعر لخدمة ${topic}.`);
    parts.push('هل يمكن مشاركة مدة المعاينة والتركيب؟');
    if (location) parts.push(`الموقع: ${location}.`);
    return parts.join(' ');
  }

  parts.push(`Hello, I'd like a quote for ${topic}.`);
  parts.push('Please share discovery and installation timing.');
  if (location) parts.push(`Location: ${location}.`);
  return parts.join(' ');
}

export function buildWhatsAppLink(message?: string | null): string {
  if (!message) return WHATSAPP_LINK;
  const separator = WHATSAPP_LINK.includes('?') ? '&' : '?';
  return `${WHATSAPP_LINK}${separator}text=${encodeURIComponent(message)}`;
}
