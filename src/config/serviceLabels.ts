export type ServiceLabel = {
  slug: string;
  tr: string;
  en: string;
  short?: {
    tr?: string;
    en?: string;
  };
};

export const SERVICE_LABELS: Record<string, ServiceLabel> = {
  'arac-giydirme': {
    slug: 'arac-giydirme',
    tr: 'Araç Giydirme',
    en: 'Vehicle Wrapping',
  },
  'ayakli-a-pano': {
    slug: 'ayakli-a-pano',
    tr: 'Ayaklı A-Pano',
    en: 'A-Frame Signage',
  },
  'banko-uygulamalari': {
    slug: 'banko-uygulamalari',
    tr: 'Banko Uygulamaları',
    en: 'Reception Desk Branding',
  },
  'cati-tabelasi': {
    slug: 'cati-tabelasi',
    tr: 'Çatı Tabelası',
    en: 'Rooftop Signage',
  },
  'cephe-tabela': {
    slug: 'cephe-tabela',
    tr: 'Cephe Tabelası',
    en: 'Facade Signage',
  },
  'fener-tabela': {
    slug: 'fener-tabela',
    tr: 'Fener Tabela',
    en: 'Blade Sign',
  },
  'isikli-tabela': {
    slug: 'isikli-tabela',
    tr: 'Işıklı Tabelalar',
    en: 'Illuminated Signage',
  },
  'isiksiz-tabela': {
    slug: 'isiksiz-tabela',
    tr: 'Işıksız Tabelalar',
    en: 'Non-Illuminated Signage',
  },
  'kabartma-pleksiglass': {
    slug: 'kabartma-pleksiglass',
    tr: 'Kabartma Pleksi (Pleksiglas)',
    en: 'Raised Acrylic Lettering',
  },
  'kapi-isimlik': {
    slug: 'kapi-isimlik',
    tr: 'Kapı İsimlik',
    en: 'Door Nameplates',
  },
  'ofis-kumlama-folyolari': {
    slug: 'ofis-kumlama-folyolari',
    tr: 'Ofis Kumlama Folyoları',
    en: 'Office Frosted Films',
  },
  'ozel-imalatlar': {
    slug: 'ozel-imalatlar',
    tr: 'Özel İmalatlar',
    en: 'Custom Fabrication',
  },
  'paslanmaz-harfler': {
    slug: 'paslanmaz-harfler',
    tr: 'Paslanmaz Harfler',
    en: 'Stainless Steel Letters',
  },
  totem: {
    slug: 'totem',
    tr: 'Totem Tabela',
    en: 'Totem Signage',
  },
  yonlendirme: {
    slug: 'yonlendirme',
    tr: 'Yönlendirme Sistemleri',
    en: 'Wayfinding Signage',
  },
};

export const getServiceLabel = (slug: string, lang: 'tr' | 'en' = 'tr') => {
  const entry = SERVICE_LABELS[slug];
  if (!entry) return null;
  if (lang === 'en') return entry.en;
  return entry.tr;
};
