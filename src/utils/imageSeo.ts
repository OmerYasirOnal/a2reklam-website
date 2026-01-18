type Lang = 'tr' | 'en';

const CATEGORY_LABELS: Record<string, { tr: string; en: string }> = {
  'arac-giydirme': { tr: 'araç giydirme', en: 'vehicle wrapping' },
  'ayakli-a-pano': { tr: 'ayaklı A pano', en: 'A-frame signage' },
  'banko-uygulamalari': { tr: 'banko uygulamaları', en: 'reception desk branding' },
  'cephe-tabela': { tr: 'cephe tabela', en: 'facade signage' },
  'cati-tabelasi': { tr: 'çatı tabelası', en: 'rooftop signage' },
  'fener-tabela': { tr: 'fener tabela', en: 'blade sign' },
  harmanlama: { tr: 'harmanlama', en: 'Harmanlama' },
  'isikli-isiksiz-tabelalar': { tr: 'ışıklı ve ışıksız tabelalar', en: 'illuminated and non-illuminated signage' },
  'kabartma-pleksiglass': { tr: 'kabartma pleksiglass', en: 'raised acrylic lettering' },
  'kapi-isimlik': { tr: 'kapı isimlik', en: 'door nameplates' },
  'ofis-kumlama-folyolari': { tr: 'ofis kumlama folyoları', en: 'office frosted films' },
  'ozel-imalatlar': { tr: 'özel imalatlar', en: 'custom manufacturing' },
  'paslanmaz-harfler': { tr: 'paslanmaz harfler', en: 'stainless steel letters' },
  totem: { tr: 'totem tabela', en: 'totem signage' },
  yonlendirme: { tr: 'yönlendirme', en: 'wayfinding signage' },
};

function fallbackLabel(category: string): string {
  return category.replace(/-/g, ' ');
}

export function getCategoryLabel(category: string, lang: Lang): string {
  const entry = CATEGORY_LABELS[category];
  if (!entry) return fallbackLabel(category);
  return entry[lang];
}

interface ImageAltOptions {
  category: string;
  lang: Lang;
  district?: string;
}

export function buildImageAlt({ category, lang, district }: ImageAltOptions): string {
  const label = getCategoryLabel(category, lang);
  if (lang === 'tr') {
    const location = district ? `İstanbul'da, ${district} ilçesinde` : "İstanbul'da";
    return `A2 Reklam tarafından ${location} üretilen ${label} uygulaması - örnek proje fotoğrafı.`;
  }
  const location = district ? `in Istanbul, ${district} district` : 'in Istanbul';
  return `Example ${label} project manufactured by A2 Reklam ${location}.`;
}
