// Blog/rehber hero görsellerinin gerçek piksel boyutları (sips ile üretildi, 2026-06-01).
// CLS önleme: blog/rehber template'i img'e width/height verir → layout shift sıfırlanır.
// Yeni bir hero görseli eklenirse boyutunu buraya ekle (yoksa width/height atlanır, graceful).
export const HERO_SIZES: Record<string, { w: number; h: number }> = {
  "/assets/img/arac-giydirme/a2reklam-arac-giydirme-001-960.webp": { w: 960, h: 540 },
  "/assets/img/arac-giydirme/a2reklam-arac-giydirme-003-960.webp": { w: 960, h: 540 },
  "/assets/img/cati-tabelasi/a2reklam-cati-tabelasi-001-960.webp": { w: 960, h: 1280 },
  "/assets/img/cati-tabelasi/a2reklam-cati-tabelasi-002-960.webp": { w: 960, h: 1280 },
  "/assets/img/cephe-tabela/a2reklam-cephe-tabela-001-960.webp": { w: 960, h: 720 },
  "/assets/img/cephe-tabela/a2reklam-cephe-tabela-002-960.webp": { w: 960, h: 720 },
  "/assets/img/demo/a2reklam-cephe-tabela-001-960.webp": { w: 960, h: 720 },
  "/assets/img/demo/a2reklam-fener-tabela-001-960.webp": { w: 960, h: 1280 },
  "/assets/img/demo/a2reklam-isikli-isiksiz-tabelalar-001-960.webp": { w: 960, h: 720 },
  "/assets/img/demo/a2reklam-paslanmaz-harfler-001-960.webp": { w: 960, h: 1280 },
  "/assets/img/fener-tabela/a2reklam-fener-tabela-001-960.webp": { w: 960, h: 1280 },
  "/assets/img/isikli-isiksiz-tabelalar/a2reklam-isikli-isiksiz-tabelalar-001-960.webp": { w: 960, h: 720 },
  "/assets/img/isikli-isiksiz-tabelalar/a2reklam-isikli-isiksiz-tabelalar-004-960.webp": { w: 960, h: 720 },
  "/assets/img/ozel-imalatlar/a2reklam-ozel-imalatlar-001-960.webp": { w: 960, h: 1280 },
  "/assets/img/ozel-imalatlar/a2reklam-ozel-imalatlar-004-960.webp": { w: 960, h: 889 },
  "/assets/img/ozel-imalatlar/a2reklam-ozel-imalatlar-005-960.webp": { w: 960, h: 960 },
  "/assets/img/paslanmaz-harfler/a2reklam-paslanmaz-harfler-001-960.webp": { w: 960, h: 1280 },
  "/assets/img/totem/a2reklam-totem-001-960.webp": { w: 960, h: 1280 },
  "/assets/img/totem/a2reklam-totem-002-960.webp": { w: 960, h: 1280 },
};
