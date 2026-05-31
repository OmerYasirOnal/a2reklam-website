import type { Sector } from '../data/sectors';

/**
 * AEO/AIO yardımcıları — sektör verisinden (materialTable, intro) AI yanıt
 * motorlarının (ChatGPT, Perplexity, Google AI Overviews) alıntılayabileceği
 * yapılandırılmış özet + fiyat cümlesi + kısa bilgiler türetir.
 * Manuel veri girişi YOK — her şey mevcut sector alanlarından hesaplanır.
 */

export interface QuickFact {
  label: string;
  value: string;
}

/** "₺2.500 - ₺6.000/m²" → [2500, 6000] gibi tüm sayıları çıkarır */
function parsePrices(text: string): number[] {
  const matches = text.match(/₺\s*([\d.]+)/g) ?? [];
  return matches
    .map((m) => Number(m.replace(/[₺.\s]/g, '')))
    .filter((n) => Number.isFinite(n) && n > 0);
}

/** Türkçe binlik ayraçlı biçim: 2500 → "2.500" */
function formatTRY(n: number): string {
  return n.toLocaleString('tr-TR');
}

/** materialTable'daki tüm fiyatlardan genel min–max aralığı */
export function getPriceRange(sector: Sector): { min: number; max: number } | null {
  const all = (sector.materialTable ?? []).flatMap((row) => parsePrices(row.priceRange));
  if (!all.length) return null;
  return { min: Math.min(...all), max: Math.max(...all) };
}

/** "Eczane Tabelası 2026'da ₺8.000–₺75.000 fiyat aralığındadır." (sector.name zaten "Tabelası" içerir) */
export function getPriceSummary(sector: Sector): string | null {
  const range = getPriceRange(sector);
  if (!range) return null;
  // sector.name zaten "... Tabelası" içerir → tekrar "tabelası" ekleme (çiftlenmeyi önler)
  return `${sector.name} 2026'da ₺${formatTRY(range.min)}–₺${formatTRY(
    range.max
  )} fiyat aralığındadır.`;
}

/** materialTable durability hücrelerinden en geniş "X-Y yıl" aralığı */
function getDurabilitySpan(sector: Sector): string | null {
  const years = (sector.materialTable ?? [])
    .flatMap((row) => (row.durability.match(/\d+/g) ?? []).map(Number))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (!years.length) return null;
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? `${min} yıl` : `${min}-${max} yıl`;
}

/** AnswerBox "Kısa Bilgiler" satırları — sadece veri varsa eklenir */
export function getQuickFacts(sector: Sector): QuickFact[] {
  const facts: QuickFact[] = [];
  const range = getPriceRange(sector);
  if (range) {
    facts.push({ label: 'Fiyat Aralığı', value: `₺${formatTRY(range.min)}–₺${formatTRY(range.max)}` });
  }
  const durability = getDurabilitySpan(sector);
  if (durability) facts.push({ label: 'Dayanıklılık', value: durability });
  facts.push({ label: 'Hizmet Bölgesi', value: 'İstanbul (39 ilçe)' });
  facts.push({ label: 'Süreç', value: 'Keşif · Tasarım · Üretim · Montaj' });
  return facts;
}

/**
 * Alıntılanabilir tek-cümle tanım: intro'nun ilk DEKLARATİF cümlesi.
 * intro bazı sektörlerde "X Tabelası Nedir? <cevap>." kalıbıyla başlar; baştaki
 * kısa soruyu atıp doğrudan cevabı döndürür (AI motorları için temiz alıntı).
 */
export function getDefinition(sector: Sector): string {
  let s = (sector.content?.intro ?? '').trim();
  if (!s) return '';
  // Baştaki kısa "... Nedir?" tipi soruyu temizle (≤ 70 kar, ? ile biten)
  const lead = s.match(/^[^.!?]{0,70}\?\s+/);
  if (lead) s = s.slice(lead[0].length).trim();
  const match = s.match(/^.*?[.!?](\s|$)/);
  const sentence = (match ? match[0] : s).trim();
  return sentence.length > 240 ? sentence.slice(0, 237).trimEnd() + '…' : sentence;
}
