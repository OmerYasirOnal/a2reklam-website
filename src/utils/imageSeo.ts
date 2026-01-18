type Lang = 'tr' | 'en' | 'ar';

const CATEGORY_LABELS: Record<string, { tr: string; en: string; ar: string }> = {
  'arac-giydirme': { tr: 'araç giydirme', en: 'vehicle wrapping', ar: 'تغليف المركبات' },
  'ayakli-a-pano': { tr: 'ayaklı A pano', en: 'A-frame signage', ar: 'لوحة A متنقلة' },
  'banko-uygulamalari': { tr: 'banko uygulamaları', en: 'reception desk branding', ar: 'تطبيقات الكاونتر' },
  'cephe-tabela': { tr: 'cephe tabela', en: 'facade signage', ar: 'لوحات واجهة' },
  'cati-tabelasi': { tr: 'çatı tabelası', en: 'rooftop signage', ar: 'لوحات السطح' },
  'fener-tabela': { tr: 'fener tabela', en: 'blade sign', ar: 'لوحة جانبية معلقة' },
  harmanlama: { tr: 'harmanlama', en: 'Harmanlama', ar: 'هارمنلاما' },
  'isikli-isiksiz-tabelalar': { tr: 'ışıklı ve ışıksız tabelalar', en: 'illuminated and non-illuminated signage', ar: 'لوحات مضيئة وغير مضيئة' },
  'kabartma-pleksiglass': { tr: 'kabartma pleksiglass', en: 'raised acrylic lettering', ar: 'حروف أكريليك بارزة' },
  'kapi-isimlik': { tr: 'kapı isimlik', en: 'door nameplates', ar: 'لوحات أسماء الأبواب' },
  'ofis-kumlama-folyolari': { tr: 'ofis kumlama folyoları', en: 'office frosted films', ar: 'أفلام تعتيم للمكاتب' },
  'ozel-imalatlar': { tr: 'özel imalatlar', en: 'custom manufacturing', ar: 'تصنيع مخصص' },
  'paslanmaz-harfler': { tr: 'paslanmaz harfler', en: 'stainless steel letters', ar: 'حروف ستانلس ستيل' },
  totem: { tr: 'totem tabela', en: 'totem signage', ar: 'لوحة توتم' },
  yonlendirme: { tr: 'yönlendirme', en: 'wayfinding signage', ar: 'لوحات إرشادية' },
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
  if (lang === 'ar') {
    const location = district ? `في إسطنبول، منطقة ${district}` : 'في إسطنبول';
    return `مثال لمشروع ${label} تم تصنيعه بواسطة A2 Reklam ${location}.`;
  }
  const location = district ? `in Istanbul, ${district} district` : 'in Istanbul';
  return `Example ${label} project manufactured by A2 Reklam ${location}.`;
}
