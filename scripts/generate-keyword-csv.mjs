#!/usr/bin/env node
/**
 * Google Ads Keyword CSV Generator
 *
 * 39 ilçe × 16 hizmet kombinasyonlarını Google Ads Editor için CSV olarak üretir.
 * Research'te kanıtlanan "ilçe+hizmet" altın kombineler (%20-100 CTR):
 *   - "beylikdüzü reklam tabela"
 *   - "esenyurt tabela"
 *   - "arac kaplama esenyurt"
 *
 * Kullanım:
 *   node scripts/generate-keyword-csv.mjs
 *
 * Çıktı:
 *   scripts/data/google-ads-keywords-import.csv
 *
 * Bu CSV Google Ads Editor'a import edilebilir:
 *   Account > Import > CSV seç
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const OUTPUT_FILE = join(__dirname, 'data', 'google-ads-keywords-import.csv');

// 39 İstanbul ilçesi (ASCII, Google Ads'te yakın varyant eşleşir)
const DISTRICTS = [
  'kadikoy', 'besiktas', 'sisli', 'uskudar', 'fatih', 'bakirkoy', 'beyoglu',
  'atasehir', 'umraniye', 'maltepe', 'esenyurt', 'basaksehir', 'kagithane',
  'pendik', 'kartal', 'beykoz', 'sariyer', 'eyupsultan', 'zeytinburnu', 'bayrampasa',
  'gaziosmanpasa', 'sultangazi', 'gungoren', 'esenler', 'arnavutkoy', 'avcilar',
  'bagcilar', 'bahcelievler', 'beylikduzu', 'buyukcekmece', 'catalca', 'cekmekoy',
  'kucukcekmece', 'sancaktepe', 'silivri', 'sultanbeyli', 'sile', 'tuzla', 'adalar',
];

// 16 hizmet + kampanya eşlemesi
const SERVICES = [
  { kw: 'tabela',           campaign: 'Cephe-Totem-Genel',       group: 'cephe-totem-genel' },
  { kw: 'reklam tabela',    campaign: 'Cephe-Totem-Genel',       group: 'cephe-totem-genel' },
  { kw: 'cephe tabela',     campaign: 'Cephe-Totem-Genel',       group: 'cephe-totem-genel' },
  { kw: 'totem tabela',     campaign: 'Cephe-Totem-Genel',       group: 'cephe-totem-genel' },
  { kw: 'kutu harf',        campaign: 'Kutu-Harf-Tabela',         group: 'kutu-harf-genel' },
  { kw: 'paslanmaz harf',   campaign: 'Kutu-Harf-Tabela',         group: 'kutu-harf-genel' },
  { kw: 'pleksi harf',      campaign: 'Kutu-Harf-Tabela',         group: 'kutu-harf-genel' },
  { kw: 'isikli tabela',    campaign: 'Isikli-Tabela-LED',        group: 'Isikli-Tabela-Genel' },
  { kw: 'led tabela',       campaign: 'Isikli-Tabela-LED',        group: 'Isikli-Tabela-Genel' },
  { kw: 'lightbox tabela',  campaign: 'Isikli-Tabela-LED',        group: 'Isikli-Tabela-Genel' },
  { kw: 'arac giydirme',    campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
  { kw: 'arac kaplama',     campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
  { kw: 'dijital baski',    campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
  { kw: 'kurumsal tabela',  campaign: 'Cephe-Totem-Genel',       group: 'cephe-totem-genel' },
  { kw: 'dukkan tabelasi',  campaign: 'Cephe-Totem-Genel',       group: 'cephe-totem-genel' },
  { kw: 'magaza tabelasi',  campaign: 'Cephe-Totem-Genel',       group: 'cephe-totem-genel' },
];

// Arama terimleri raporundan kanıtlanan altın kelimeler (doğrulanmış CTR)
const PROVEN_KEYWORDS = [
  // Cephe-Totem-Genel
  { kw: 'dukkan tabela tasarimlari', match: 'Broad', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'İter#10 %37.5 CTR' },
  { kw: 'tabela imalatcilari',       match: 'Broad', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'İter#10 %50 CTR' },
  { kw: 'kuyumcu tabela',            match: 'Broad', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'İter#10 %200 CTR' },
  { kw: 'tabelaci istanbul',         match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'İter#10 net niyet' },
  { kw: 'hastane tabela',            match: 'Broad', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'İter#1 320 arama/ay' },
  { kw: 'otel tabela',               match: 'Broad', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'İter#1' },
  { kw: 'dis cephe reklam',          match: 'Broad', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'İter#1 +%150 YoY' },
  { kw: 'otel yonlendirme',          match: 'Broad', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'İter#1 +%200' },

  // Kutu-Harf-Tabela
  { kw: 'pleksi harf kutu',          match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'İter#10 %100 CTR!' },
  { kw: 'pleksi harf',               match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'İter#1 %20 dönüşüm' },
  { kw: 'isikli harf tabela',        match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'İter#10' },

  // Isikli-Tabela-LED
  { kw: 'isikli tabela ornekleri',   match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel', note: 'İter#10 %200 CTR' },
  { kw: 'elektrikli tabela',         match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel', note: 'İter#10' },

  // Dijital-Baski
  { kw: 'arac giydirme reklam',      match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'İter#10' },
  { kw: 'arac reklam giydirme',      match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'İter#10' },
];

// CSV row formatı Google Ads Editor için:
// Action, Campaign, Ad group, Keyword, Match type, Status
const CSV_HEADER = 'Action,Campaign,Ad group,Keyword,Match type,Status,Notes';

function esc(s) {
  if (!s) return '';
  const str = String(s);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(row) {
  return [
    esc(row.action),
    esc(row.campaign),
    esc(row.group),
    esc(row.keyword),
    esc(row.match),
    esc(row.status),
    esc(row.notes),
  ].join(',');
}

const rows = [];

// 1) PROVEN keywords (arama terimleri raporundan)
for (const k of PROVEN_KEYWORDS) {
  rows.push({
    action: 'Add',
    campaign: k.campaign,
    group: k.group,
    keyword: k.kw,
    match: k.match,
    status: 'Enabled',
    notes: k.note,
  });
}

// 2) LONG-TAIL: ilçe + hizmet kombinasyonları
for (const district of DISTRICTS) {
  for (const svc of SERVICES) {
    // "{ilce} {hizmet}" phrase match
    rows.push({
      action: 'Add',
      campaign: svc.campaign,
      group: svc.group,
      keyword: `${district} ${svc.kw}`,
      match: 'Phrase',
      status: 'Enabled',
      notes: 'long-tail ilçe+hizmet',
    });
  }
}

// CSV çıkışı
const csv = [CSV_HEADER, ...rows.map(csvRow)].join('\n');
writeFileSync(OUTPUT_FILE, csv);

console.log(`[KeywordCSV] ${rows.length} keyword üretildi.`);
console.log(`[KeywordCSV] Proven: ${PROVEN_KEYWORDS.length}`);
console.log(`[KeywordCSV] Long-tail (ilçe×hizmet): ${DISTRICTS.length} × ${SERVICES.length} = ${DISTRICTS.length * SERVICES.length}`);
console.log(`[KeywordCSV] Çıktı: ${OUTPUT_FILE}`);
console.log('');
console.log('Google Ads Editor\'da import etmek için:');
console.log('  1. Google Ads Editor indir: https://ads.google.com/intl/tr/home/tools/ads-editor/');
console.log('  2. Account Details → Download Recent Changes');
console.log('  3. File → Import → CSV file → bu dosyayı seç');
console.log('  4. Preview ve onayla → Post');
