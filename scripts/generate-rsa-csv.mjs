#!/usr/bin/env node
/**
 * Google Ads Editor — Responsive Search Ad (RSA) CSV Generator
 *
 * ads-copy-kit.md icindeki 4 kampanyanin 15 baslik + 4 aciklama setini
 * Google Ads Editor'un kabul ettigi format olarak uretir.
 *
 * Pin stratejisi:
 *   Position 1 pin → brand + lokasyon basligi
 *   Position 2 pin → social proof basligi
 *   Digerleri unpinned (Google optimize eder)
 *
 * Karakter limiti (Google Ads — UTF-16 code unit):
 *   Headline: 30
 *   Description: 90
 *   Path: 15
 *
 * Cikti:
 *   scripts/data/google-ads-rsa-import.csv
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'data', 'google-ads-rsa-import.csv');

// ============================================================
// KAMPANYALAR — her biri 1 RSA olacak
// ============================================================
const CAMPAIGNS = [
  {
    campaign: 'Cephe-Totem-Genel',
    group: 'cephe-totem-genel',
    finalUrl: 'https://a2reklam.com/kurumsal-tabela/',
    path1: 'kurumsal',
    path2: 'avm-plaza',
    headlines: [
      { text: 'Kurumsal Tabela İstanbul', pin: 1 },
      { text: 'AVM & Plaza Tabelası' },
      { text: '2.500+ Proje 5.0/90 Yorum', pin: 2 },
      { text: "2005'ten Beri Kurumsal" },
      { text: 'Fabrika & OSB Tabelaları' },
      { text: 'Hastane Yönlendirme Uzmanı' },
      { text: 'Otel Tabela Sistemleri' },
      { text: 'Ücretsiz Keşif + 3D' },
      { text: 'Uygun Fiyat Garantisi' },
      { text: '48 Saatte Teklif' },
      { text: '39 İlçeye Hizmet' },
      { text: 'Aracı Yok Direkt Üretici' },
      { text: '2 Yıl Garanti + Bakım' },
      { text: 'Cephe Giydirme Uzmanı' },
      { text: 'Hemen Ara 0531 618 16 72' },
    ],
    descriptions: [
      '20+ yıl deneyim. AVM, plaza, fabrika kurumsal tabela. Keşif, üretim, montaj tek adres.',
      '2.500+ proje. 5.0/90 Google yorum. 39 ilçeye hizmet. Aynı gün detaylı teklif alın.',
      'Uygun fiyat garantisi. LED kutu harf, cephe, totem, paslanmaz. Kurumsal kimliğe özel.',
      'Ücretsiz keşif + 3D tasarım. 2 yıl garanti. Hemen ara: 0531 618 16 72.',
    ],
  },
  {
    campaign: 'Isikli-Tabela-LED',
    group: 'Isikli-Tabela-Genel',
    finalUrl: 'https://a2reklam.com/hizmetler/isikli-tabela/',
    path1: 'isikli-tabela',
    path2: 'led-kutu-harf',
    headlines: [
      { text: 'Işıklı Tabela İmalatı', pin: 1 },
      { text: 'LED Kutu Harf Uzmanı' },
      { text: '2.500+ LED Proje 5.0/90', pin: 2 },
      { text: 'Lightbox & Vakum Tabela' },
      { text: 'IP65 Su Geçirmez LED' },
      { text: '3 Yıl LED Garantisi' },
      { text: 'AVM Vitrin Tabelası' },
      { text: 'Plaza Işıklı Cephe' },
      { text: 'Otel Gece Görünürlüğü' },
      { text: 'Pleksi Harf + Neon' },
      { text: 'Dayanıklı Alüminyum' },
      { text: 'Ücretsiz Keşif + Ölçüm' },
      { text: 'İstanbul 39 İlçe Hizmet' },
      { text: 'Aracısız Fabrika Fiyatı' },
      { text: '0531 618 16 72 Ara' },
    ],
    descriptions: [
      'Enerji verimli LED kutu harf ve ışıklı tabela. IP65 sertifikalı, 3 yıl LED garantili.',
      'AVM, plaza, otel için gece parlayan dikkat çeken tabela. 2.500+ proje, 5.0/90 yorum.',
      'Pleksi harf, lightbox, vakum tabela hepsi kendi atölyemizde üretilir. Aracısız fiyat.',
      'Ücretsiz keşif + 3D tasarım. Aynı gün teklif. Hemen ara: 0531 618 16 72.',
    ],
  },
  {
    campaign: 'Kutu-Harf-Tabela',
    group: 'kutu-harf-genel',
    finalUrl: 'https://a2reklam.com/hizmetler/paslanmaz-harfler/',
    path1: 'kutu-harf',
    path2: 'pleksi-harf',
    headlines: [
      { text: 'Pleksi Harf Kutu Tabela', pin: 1 },
      { text: 'Paslanmaz Kutu Harf' },
      { text: 'Kutu Harf İstanbul 2.500+', pin: 2 },
      { text: 'CNC Lazer Hassas Kesim' },
      { text: 'PVD Kaplamalı Harf' },
      { text: 'Işıklı Pleksi Harf' },
      { text: 'Kurumsal Cephe Harfleri' },
      { text: '5mm - 25cm Derinlik' },
      { text: 'Fabrika Çıkışı Fiyat' },
      { text: '2 Yıl İşçilik Garantisi' },
      { text: '5.0 / 90 Google Yorum' },
      { text: '2.500+ Proje Deneyimi' },
      { text: 'Ücretsiz Keşif + Ölçü' },
      { text: 'AVM & Plaza Harfler' },
      { text: 'Hemen Ara 0531 618 16 72' },
    ],
    descriptions: [
      'Pleksi, paslanmaz, alüminyum kutu harf. CNC hassas kesim. 3D render + gönderim.',
      'Işıklı LED kutu harf. AVM, plaza, kurumsal cephe için özel üretim. 2.500+ proje.',
      'Kendi atölyemizde üretim. Aracısız fabrika fiyatı. 2 yıl işçilik + malzeme garantisi.',
      'Ücretsiz keşif + 3D tasarım. Aynı gün teklif. Hemen ara: 0531 618 16 72.',
    ],
  },
  {
    campaign: 'Dijital-Baski-Arac-Giydirme',
    group: 'Dijital-Baski-genel',
    finalUrl: 'https://a2reklam.com/hizmetler/arac-giydirme/',
    path1: 'arac-kaplama',
    path2: 'filo-giydirme',
    headlines: [
      { text: 'Araç Giydirme İstanbul', pin: 1 },
      { text: 'Filo Reklam Kaplama' },
      { text: '2.500+ Kaplama 5.0/90', pin: 2 },
      { text: 'Araç Kaplama Uzmanı' },
      { text: 'Dijital Baskı + Montaj' },
      { text: 'Orajet 3M Garantili Folyo' },
      { text: 'Kurumsal Filo Tasarımı' },
      { text: 'Tek Araç veya Filo' },
      { text: 'Esenyurt Atölye Hizmeti' },
      { text: 'Aynı Gün Hızlı Uygulama' },
      { text: '3 Yıl Folyo Garantisi' },
      { text: 'Transfer Servis Araçları' },
      { text: 'Ticari Araç + Minibüs' },
      { text: 'Ücretsiz Keşif + Tasarım' },
      { text: 'Hemen Ara 0531 618 16 72' },
    ],
    descriptions: [
      'Tek araç veya filo kaplama. Orajet/3M folyo, 3 yıl garanti. 2.500+ tamamlanmış proje.',
      'Kurumsal logo, renk, yönlendirme + reklam tasarımı. Atölyemizde aynı gün uygulama.',
      'Esenyurt ve Kâğıthane atölyelerimizden İstanbul geneli. Servis aracı uzmanı.',
      'Ücretsiz keşif + 3D tasarım. Hızlı teklif: 0531 618 16 72.',
    ],
  },
];

// ============================================================
// VALIDASYON
// ============================================================
const LIMITS = { headline: 30, description: 90, path: 15 };

function validate(campaigns) {
  const errors = [];
  const warnings = [];

  for (const c of campaigns) {
    // Headlines
    if (c.headlines.length < 3 || c.headlines.length > 15) {
      errors.push(`[${c.campaign}] Baslik sayisi ${c.headlines.length} (3-15 araliginda olmali)`);
    }
    c.headlines.forEach((h, i) => {
      if (h.text.length > LIMITS.headline) {
        errors.push(`[${c.campaign}] Headline #${i + 1} "${h.text}" ${h.text.length} kar (max ${LIMITS.headline})`);
      }
      if (h.pin && ![1, 2, 3].includes(h.pin)) {
        errors.push(`[${c.campaign}] Headline #${i + 1} gecersiz pin: ${h.pin}`);
      }
    });

    // Descriptions
    if (c.descriptions.length < 2 || c.descriptions.length > 4) {
      errors.push(`[${c.campaign}] Aciklama sayisi ${c.descriptions.length} (2-4 araliginda)`);
    }
    c.descriptions.forEach((d, i) => {
      if (d.length > LIMITS.description) {
        errors.push(`[${c.campaign}] Description #${i + 1} "${d}" ${d.length} kar (max ${LIMITS.description})`);
      }
    });

    // Paths
    for (const p of ['path1', 'path2']) {
      if (c[p] && c[p].length > LIMITS.path) {
        errors.push(`[${c.campaign}] ${p} "${c[p]}" ${c[p].length} kar (max ${LIMITS.path})`);
      }
    }

    // Best practice warnings
    const pinsUsed = c.headlines.filter((h) => h.pin).length;
    if (pinsUsed === 0) warnings.push(`[${c.campaign}] Hicbir headline pinlenmemis`);
    if (pinsUsed > 3) warnings.push(`[${c.campaign}] ${pinsUsed} pin aktif → Google optimizasyonu kisitlaniyor`);
  }

  return { errors, warnings };
}

const { errors, warnings } = validate(CAMPAIGNS);
if (errors.length) {
  console.error('[RSA] VALIDATION ERRORS:');
  errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}
if (warnings.length) {
  console.warn('[RSA] Uyarilar:');
  warnings.forEach((w) => console.warn('  ⚠', w));
}

// ============================================================
// CSV YAZIM — Google Ads Editor formati
// ============================================================
const HEADER_COLS = [
  'Action', 'Campaign', 'Ad group', 'Ad type', 'Ad status', 'Final URL',
  ...Array.from({ length: 15 }, (_, i) => [`Headline ${i + 1}`, `Headline ${i + 1} position`]).flat(),
  'Description 1', 'Description 2', 'Description 3', 'Description 4',
  'Path 1', 'Path 2',
];

function esc(s) {
  if (s === null || s === undefined) return '';
  const str = String(s);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

const rows = [HEADER_COLS.join(',')];
for (const c of CAMPAIGNS) {
  const cols = [
    'Add', c.campaign, c.group, 'Responsive search ad', 'Enabled', c.finalUrl,
  ];

  // 15 headline slots
  for (let i = 0; i < 15; i++) {
    const h = c.headlines[i];
    cols.push(h ? h.text : '');
    cols.push(h && h.pin ? String(h.pin) : '');
  }

  // 4 description slots
  for (let i = 0; i < 4; i++) {
    cols.push(c.descriptions[i] || '');
  }

  cols.push(c.path1 || '', c.path2 || '');
  rows.push(cols.map(esc).join(','));
}

writeFileSync(OUT, rows.join('\n'));

// ============================================================
// ÖZET
// ============================================================
console.log(`[RSA] ${CAMPAIGNS.length} Responsive Search Ad uretildi.`);
console.log('');
for (const c of CAMPAIGNS) {
  const pins = c.headlines.filter((h) => h.pin).map((h) => `[${h.pin}] ${h.text}`);
  const maxH = Math.max(...c.headlines.map((h) => h.text.length));
  const maxD = Math.max(...c.descriptions.map((d) => d.length));
  console.log(`${c.campaign} → ${c.finalUrl}`);
  console.log(`  ${c.headlines.length} baslik (en uzun: ${maxH}/${LIMITS.headline}) | ${c.descriptions.length} aciklama (en uzun: ${maxD}/${LIMITS.description})`);
  console.log(`  Pins: ${pins.join(', ')}`);
  console.log(`  Path: /${c.path1}/${c.path2}`);
  console.log('');
}
console.log(`Cikti: ${OUT}`);
console.log(`Import: Google Ads Editor → Account → Import → ${OUT.split('/').pop()}`);
