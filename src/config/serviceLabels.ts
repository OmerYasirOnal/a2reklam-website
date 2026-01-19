export type ServiceLabel = {
  slug: string;
  tr: string;
  en: string;
  ar: string;
  short?: {
    tr?: string;
    en?: string;
    ar?: string;
  };
};

export const SERVICE_LABELS: Record<string, ServiceLabel> = {
  'arac-giydirme': {
    slug: 'arac-giydirme',
    tr: 'Araç Giydirme',
    en: 'Vehicle Wrapping',
    ar: 'تغليف المركبات',
  },
  'ayakli-a-pano': {
    slug: 'ayakli-a-pano',
    tr: 'Ayaklı A-Pano',
    en: 'A-Frame Signage',
    ar: 'لوحات A متنقلة',
  },
  'banko-uygulamalari': {
    slug: 'banko-uygulamalari',
    tr: 'Banko Uygulamaları',
    en: 'Reception Desk Branding',
    ar: 'تطبيقات الكاونتر',
  },
  'cati-tabelasi': {
    slug: 'cati-tabelasi',
    tr: 'Çatı Tabelası',
    en: 'Rooftop Signage',
    ar: 'لافتات السطح',
  },
  'cephe-tabela': {
    slug: 'cephe-tabela',
    tr: 'Cephe Tabelası',
    en: 'Facade Signage',
    ar: 'لافتات الواجهة',
  },
  'fener-tabela': {
    slug: 'fener-tabela',
    tr: 'Fener Tabela',
    en: 'Blade Sign',
    ar: 'لافتة جانبية',
  },
  'isikli-isiksiz-tabelalar': {
    slug: 'isikli-isiksiz-tabelalar',
    tr: 'Işıklı / Işıksız Tabelalar',
    en: 'Neon & LED Signage',
    ar: 'لافتات نيون و LED',
  },
  'kabartma-pleksiglass': {
    slug: 'kabartma-pleksiglass',
    tr: 'Kabartma Pleksi (Pleksiglas)',
    en: 'Raised Acrylic Lettering',
    ar: 'حروف أكريليك بارزة',
  },
  'kapi-isimlik': {
    slug: 'kapi-isimlik',
    tr: 'Kapı İsimlik',
    en: 'Door Nameplates',
    ar: 'لوحات أسماء الأبواب',
  },
  'ofis-kumlama-folyolari': {
    slug: 'ofis-kumlama-folyolari',
    tr: 'Ofis Kumlama Folyoları',
    en: 'Office Frosted Films',
    ar: 'أفلام تعتيم للمكاتب',
  },
  'ozel-imalatlar': {
    slug: 'ozel-imalatlar',
    tr: 'Özel İmalatlar',
    en: 'Custom Fabrication',
    ar: 'تصنيع مخصص',
  },
  'paslanmaz-harfler': {
    slug: 'paslanmaz-harfler',
    tr: 'Paslanmaz Harfler',
    en: 'Stainless Steel Letters',
    ar: 'حروف ستانلس ستيل',
  },
  totem: {
    slug: 'totem',
    tr: 'Totem Tabela',
    en: 'Totem Signage',
    ar: 'لوحات توتم',
  },
  yonlendirme: {
    slug: 'yonlendirme',
    tr: 'Yönlendirme Sistemleri',
    en: 'Wayfinding Signage',
    ar: 'لوحات إرشادية',
  },
};

export const getServiceLabel = (slug: string, lang: 'tr' | 'en' | 'ar' = 'tr') => {
  const entry = SERVICE_LABELS[slug];
  if (!entry) return null;
  if (lang === 'en') return entry.en;
  if (lang === 'ar') return entry.ar;
  return entry.tr;
};
