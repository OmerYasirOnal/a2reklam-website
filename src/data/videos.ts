export type SupportedLang = 'tr' | 'en';

type LocalizedText = {
  tr: string;
  en: string;
};

export type ProjectVideo = {
  id: string;
  file: string;
  poster: string;
  uploadDate: string;
  duration: string;
  title: LocalizedText;
  description: LocalizedText;
};

export const PROJECT_VIDEOS: ProjectVideo[] = [
  {
    id: 'babas-gastropub-01',
    file: '/assets/videos/babas-gastropub-01.mp4',
    poster: '/assets/videos/posters/babas-gastropub-01.webp',
    uploadDate: '2026-02-13',
    duration: 'PT14S',
    title: {
      tr: 'Neon LED Tabela Uygulaması – Genel Görünüm',
      en: 'Neon LED Signage Installation – Full Overview',
    },
    description: {
      tr: 'Neon LED tabelanın tamamlanmış halini farklı açılardan gösteren genel görünüm videosu. Işık homojenliği ve okunabilirlik detaylarını inceleyin.',
      en: 'Full overview video of a completed neon LED sign from multiple angles. Examine light uniformity and readability details.',
    },
  },
  {
    id: 'babas-gastropub-02',
    file: '/assets/videos/babas-gastropub-02.mp4',
    poster: '/assets/videos/posters/babas-gastropub-02.webp',
    uploadDate: '2026-02-13',
    duration: 'PT48S',
    title: {
      tr: 'Alüminyum Kutu Harf LED Kalite Detayı',
      en: 'Aluminum Channel Letter LED Quality Detail',
    },
    description: {
      tr: 'Alüminyum kutu harf üretiminde LED yerleşimi, iç montaj ve ışık performansı gibi kalite detaylarını gösteren saha çekimi.',
      en: 'On-site footage showing LED placement, internal assembly, and light performance details in aluminum channel letter production.',
    },
  },
  {
    id: 'babas-gastropub-03',
    file: '/assets/videos/babas-gastropub-03.mp4',
    poster: '/assets/videos/posters/babas-gastropub-03.webp',
    uploadDate: '2026-02-13',
    duration: 'PT30S',
    title: {
      tr: 'Kutu Harf İmalat Süreci – Adım Adım Üretim',
      en: 'Channel Letter Manufacturing Process – Step by Step',
    },
    description: {
      tr: 'Kutu harf üretim adımlarını; bükme, birleştirme işçiliği detaylarıyla birlikte adım adım gösteren imalat süreci videosu.',
      en: 'Step-by-step manufacturing process video showing bending, assembly, and craftsmanship details in channel letter production.',
    },
  },
  {
    id: 'cephe-tabela-01',
    file: '/assets/videos/cephe-tabela-01.mp4',
    poster: '/assets/videos/posters/cephe-tabela-01.webp',
    uploadDate: '2026-02-14',
    duration: 'PT30S',
    title: {
      tr: 'Cephe Tabelası Montaj Süreci – Saha Uygulaması',
      en: 'Facade Sign Installation Process – On-site Application',
    },
    description: {
      tr: 'Cephe tabela uygulamasında ölçülendirme, hizalama ve montaj hazırlık adımlarını gösteren saha süreci videosu.',
      en: 'On-site process video showing measurement, alignment, and installation preparation steps for facade signage.',
    },
  },
  {
    id: 'cephe-tabela-02',
    file: '/assets/videos/cephe-tabela-02.mp4',
    poster: '/assets/videos/posters/cephe-tabela-02.webp',
    uploadDate: '2026-02-14',
    duration: 'PT17S',
    title: {
      tr: 'Cephe Tabelası Son Kontrol – Kalite Güvence',
      en: 'Facade Sign Final Inspection – Quality Assurance',
    },
    description: {
      tr: 'Teslimat öncesi ışık kontrolü, hizalama doğrulaması ve yüzey kalite denetim görüntüleri.',
      en: 'Pre-delivery footage of lighting verification, alignment checks, and surface quality inspection.',
    },
  },
  {
    id: 'kutu-harf-01',
    file: '/assets/videos/kutu-harf-01.mp4',
    poster: '/assets/videos/posters/kutu-harf-01.webp',
    uploadDate: '2026-02-14',
    duration: 'PT14S',
    title: {
      tr: 'Kutu Harf Tabela Detayı – Malzeme ve İşçilik',
      en: 'Channel Letter Detail – Materials and Craftsmanship',
    },
    description: {
      tr: 'Kutu harf tabela uygulamasında kullanılan malzeme kalitesi ve işçilik detaylarını gösteren yakın plan video.',
      en: 'Close-up video showcasing material quality and craftsmanship details in channel letter signage application.',
    },
  },
];

export function getVideoById(id: string): ProjectVideo | undefined {
  return PROJECT_VIDEOS.find((video) => video.id === id);
}
