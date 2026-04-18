#!/usr/bin/env node
/**
 * Google Ads Editor — Ad Extensions CSV Generator (v2 — 2026-04-17 iter#22)
 *
 * DEGISIKLIKLER:
 *   - Sitelinks: her kampanya icin KENDI URL seti (onceden tumu ayniydi)
 *   - Callouts: 20 → 12 (Google 4-6 gosteriyor, daralt = daha iyi test)
 *   - Snippets: "Brands" header YANLISTI (o gercek marka ismi icin).
 *               Dogru karsilik = "Types" (sektorel tipler) + "Service catalog" (hizmet listesi)
 *
 * Ciktilar:
 *   scripts/data/google-ads-sitelinks.csv
 *   scripts/data/google-ads-callouts.csv
 *   scripts/data/google-ads-snippets.csv
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');

const BASE = 'https://a2reklam.com';

// ============================================================
// SITELINKS — HER KAMPANYAYA OZEL (landing relevance = Quality Score boost)
// ============================================================
const UNIVERSAL = [
  { title: 'Ücretsiz Keşif Al', desc1: 'Sahada ölçüm + 3D tasarım', desc2: 'Aynı gün teklif',          url: `${BASE}/iletisim/` },
  { title: 'Referanslarımız',   desc1: '2.500+ tamamlanmış proje',  desc2: 'AVM, plaza, kurumsal',    url: `${BASE}/referans/` },
  { title: '5.0 / 90 Google Yorum', desc1: 'Gerçek müşteri yorumları', desc2: '90 onaylı yorum, 5.0 puan', url: `${BASE}/yorum-birakin/` },
  { title: 'Proje Galerisi',    desc1: '2.500+ gerçek tabela',      desc2: 'Video + foto arşiv',      url: `${BASE}/galeri/` },
];

const CAMPAIGN_SITELINKS = {
  'Cephe-Totem-Genel': [
    { title: 'Kurumsal Tabela',   desc1: 'AVM, plaza, fabrika, otel', desc2: '2.500+ proje deneyimi',  url: `${BASE}/kurumsal-tabela/` },
    { title: 'AVM Tabela',        desc1: 'Mağaza + yönlendirme',      desc2: 'Gece montaj + kira uyum', url: `${BASE}/avm-tabelasi/` },
    { title: 'Plaza Tabela',      desc1: 'Metrocity, Sabancı, Sun',   desc2: 'Cephe + lobi + kat no',  url: `${BASE}/plaza-tabelasi/` },
    { title: 'Fabrika & OSB',     desc1: 'ATEX + TSE sertifikalı',    desc2: 'Ana giriş, trafik, uyarı',url: `${BASE}/fabrika-tabelasi/` },
    ...UNIVERSAL,
  ],
  'Isikli-Tabela-LED': [
    { title: 'Işıklı Tabela',     desc1: 'LED kutu harf + cephe',     desc2: 'IP65 sertifikalı',       url: `${BASE}/hizmetler/isikli-tabela/` },
    { title: 'LED Kutu Harf',     desc1: 'Premium aydınlatma',        desc2: '3 yıl LED garantisi',    url: `${BASE}/hizmetler/paslanmaz-harfler/` },
    { title: 'Kurumsal LED',      desc1: 'AVM, plaza, otel cephe',    desc2: 'Gece yüksek görünürlük', url: `${BASE}/kurumsal-tabela/` },
    { title: 'Hastane Tabela',    desc1: 'Yönlendirme + acil',        desc2: 'Braille + dayanıklı',    url: `${BASE}/hastane-tabelasi/` },
    ...UNIVERSAL,
  ],
  'Kutu-Harf-Tabela': [
    { title: 'Paslanmaz Harf',    desc1: 'PVD kaplamalı premium',     desc2: 'Kendi atölye üretimi',   url: `${BASE}/hizmetler/paslanmaz-harfler/` },
    { title: 'Pleksi Kutu Harf',  desc1: 'CNC lazer hassas kesim',    desc2: '5mm-25cm derinlik',      url: `${BASE}/hizmetler/paslanmaz-harfler/` },
    { title: 'Cephe Tabelası',    desc1: 'Plaza + AVM uygulama',      desc2: 'Kompozit + paslanmaz',   url: `${BASE}/hizmetler/cephe-tabela/` },
    { title: 'Kurumsal Harfler',  desc1: 'AVM mağaza + plaza',        desc2: 'Aracısız fabrika fiyatı',url: `${BASE}/kurumsal-tabela/` },
    ...UNIVERSAL,
  ],
  'Dijital-Baski-Arac-Giydirme': [
    { title: 'Araç Giydirme',     desc1: 'Orajet/3M folyo',           desc2: '3 yıl folyo garantisi',  url: `${BASE}/hizmetler/arac-giydirme/` },
    { title: 'Filo Kaplama',      desc1: 'Kurumsal tek tasarım',      desc2: 'Servis + ticari araç',   url: `${BASE}/hizmetler/arac-giydirme/` },
    { title: 'Esenyurt Atölye',   desc1: 'Aynı gün uygulama',         desc2: 'Kağıthane + Esenyurt',   url: `${BASE}/iletisim/` },
    { title: 'Kurumsal Çözüm',    desc1: 'Logo + renk + tasarım',     desc2: 'Fiyat garantisi',        url: `${BASE}/kurumsal-tabela/` },
    ...UNIVERSAL,
  ],
};

// ============================================================
// CALLOUTS — 12 odakli (Google max 4-6 gosterir)
// Once guven > sosyal kanit > fark > kalite teknik
// ============================================================
const CALLOUTS = [
  // GUVEN / OTORITE (4)
  "2005'ten Beri Üretici",
  '2.500+ Tamamlanmış Proje',
  '5.0 / 90 Google Yorum',
  'Kendi Atölyemiz',
  // FARK / DIFFERENTIATOR (3)
  'Aracısız Fabrika Fiyatı',
  'Ücretsiz Keşif + 3D',
  'Aynı Gün Hızlı Teklif',
  // KALITE TEKNIK (3)
  '2 Yıl Tam Garanti',
  'IP65 Sertifikalı LED',
  'CNC Lazer Hassas Kesim',
  // HEDEF NIS (2)
  'AVM & Plaza Uzmanı',
  'İstanbul 39 İlçeye',
];

// ============================================================
// STRUCTURED SNIPPETS — Google'in gecerli header'lari
//   "Brands" yanlis secim: bu APPLE/SAMSUNG gibi GERCEK markalar icin.
//   Bizde sektor tipleri = "Types", hizmet katalogu = "Service catalog".
// ============================================================
const SNIPPETS = [
  {
    header: 'Service catalog',
    values: [
      'Cephe Tabela', 'Kutu Harf', 'LED Işıklı Tabela', 'Totem Tabela',
      'Paslanmaz Harf', 'Araç Giydirme', 'Dijital Baskı', 'Yönlendirme',
    ],
  },
  {
    header: 'Types',
    values: [
      'AVM Tabelası', 'Plaza Tabelası', 'Hastane Yönlendirme',
      'Otel Tabela', 'Fabrika & OSB', 'Okul Kampüs',
      'Restoran & Kafe', 'Banka & Finans',
    ],
  },
  {
    header: 'Neighborhoods',
    values: [
      'Kâğıthane', 'Şişli', 'Beşiktaş', 'Kadıköy',
      'Beylikdüzü', 'Esenyurt', 'Başakşehir', 'Ataşehir',
    ],
  },
];

// ============================================================
// CSV YAZIMI
// ============================================================
function esc(s) {
  if (!s) return '';
  const str = String(s);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

const CAMPAIGNS = Object.keys(CAMPAIGN_SITELINKS);

// === SITELINKS — per-campaign ===
const sitelinkRows = ['Action,Campaign,Sitelink text,Description line 1,Description line 2,Final URL'];
for (const camp of CAMPAIGNS) {
  for (const sl of CAMPAIGN_SITELINKS[camp]) {
    sitelinkRows.push(['Add', camp, sl.title, sl.desc1, sl.desc2, sl.url].map(esc).join(','));
  }
}
writeFileSync(join(DATA_DIR, 'google-ads-sitelinks.csv'), sitelinkRows.join('\n'));

// === CALLOUTS ===
const calloutRows = ['Action,Campaign,Callout text'];
for (const camp of CAMPAIGNS) {
  for (const c of CALLOUTS) {
    calloutRows.push(['Add', camp, c].map(esc).join(','));
  }
}
writeFileSync(join(DATA_DIR, 'google-ads-callouts.csv'), calloutRows.join('\n'));

// === STRUCTURED SNIPPETS ===
const snippetRows = ['Action,Campaign,Header,Values'];
for (const camp of CAMPAIGNS) {
  for (const sn of SNIPPETS) {
    snippetRows.push(['Add', camp, sn.header, sn.values.join(';')].map(esc).join(','));
  }
}
writeFileSync(join(DATA_DIR, 'google-ads-snippets.csv'), snippetRows.join('\n'));

const slPerCampaign = Object.values(CAMPAIGN_SITELINKS)[0].length;
console.log('[AdsExt v2] 3 CSV uretildi:');
console.log(`  Sitelinks: ${sitelinkRows.length - 1} satir (${CAMPAIGNS.length} kampanya × ${slPerCampaign} sitelink, PER-CAMPAIGN)`);
console.log(`  Callouts:  ${calloutRows.length - 1} satir (${CAMPAIGNS.length} × ${CALLOUTS.length} daraltilmis set)`);
console.log(`  Snippets:  ${snippetRows.length - 1} satir (${CAMPAIGNS.length} × ${SNIPPETS.length} header, Brands→Types/ServiceCat fix)`);
console.log('');
console.log('Import sirasi:');
console.log('  1. google-ads-sitelinks.csv');
console.log('  2. google-ads-callouts.csv');
console.log('  3. google-ads-snippets.csv');
