#!/usr/bin/env node
/**
 * Google Ads Keyword CSV Generator (v2 — 2026-04-17 iter#22)
 *
 * STRATEJI DEGISIKLIGI:
 *   v1: 39 ilce × 16 hizmet = 624 spekulatif long-tail (cogu hicbir zaman goruntulenmedi)
 *   v2: TOP ILCELER × CEKIRDEK HIZMETLER → proven-first, quality over quantity
 *
 * Iter#1-21 verisine gore:
 *   - %100+ CTR: pleksi harf kutu, isikli tabela ornekleri, arac kaplama esenyurt
 *   - %20-50 CTR: beylikduzu reklam tabela, esenyurt tabela, tabela imalatcilari
 *   - 39 ilcenin cogu < 5 gosterim/ay → keyword bloat
 *
 * Cikti:
 *   scripts/data/google-ads-keywords-import.csv
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, 'data', 'google-ads-keywords-import.csv');

// ============================================================
// 1) PROVEN CHAMPIONS — Exact match, yuksek bid, en iyi QS
//    Arama terimleri raporundan > %50 CTR alan kelimeler
// ============================================================
const CHAMPIONS = [
  { kw: 'pleksi harf kutu',        match: 'Exact',  campaign: 'Kutu-Harf-Tabela',            group: 'kutu-harf-genel',     note: 'Iter#10 %100 CTR sampiyon' },
  { kw: 'isikli tabela ornekleri', match: 'Exact',  campaign: 'Isikli-Tabela-LED',           group: 'Isikli-Tabela-Genel', note: 'Iter#10 %200 CTR' },
  { kw: 'arac kaplama esenyurt',   match: 'Exact',  campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'Iter#10 %100 CTR lokal' },
  { kw: 'kuyumcu tabela',          match: 'Exact',  campaign: 'Cephe-Totem-Genel',           group: 'cephe-totem-genel',   note: 'Iter#10 %200 CTR nis' },
  { kw: 'tabela imalatcilari',     match: 'Exact',  campaign: 'Cephe-Totem-Genel',           group: 'cephe-totem-genel',   note: 'Iter#10 %50 CTR profesyonel niyet' },
  { kw: 'tabelaci istanbul',       match: 'Exact',  campaign: 'Cephe-Totem-Genel',           group: 'cephe-totem-genel',   note: 'Iter#10 net niyet' },
  { kw: 'elektrikli tabela',       match: 'Exact',  campaign: 'Isikli-Tabela-LED',           group: 'Isikli-Tabela-Genel', note: 'Iter#10 %200 CTR' },
];

// ============================================================
// 2) CORE KEYWORDS — Phrase match, kampanya temas noktalari
// ============================================================
const CORE = [
  // Cephe-Totem-Genel (kurumsal + genel)
  { kw: 'kurumsal tabela',            match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Iter#1 +%2500 YoY patlayan' },
  { kw: 'cephe tabela',               match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Cekirdek hizmet' },
  { kw: 'cephe tabelasi',             match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Cekirdek hizmet varyant' },
  { kw: 'totem tabela',               match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Cekirdek hizmet' },
  { kw: 'magaza tabelasi',            match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'B2B niyet' },
  { kw: 'dukkan tabelasi',            match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'KOBI niyet' },
  { kw: 'isyeri tabela',              match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'B2B niyet' },
  { kw: 'dukkan tabela tasarimlari',  match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Iter#10 %37.5 CTR' },
  { kw: 'hastane tabela',             match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Iter#1 320 arama/ay dusuk rekabet' },
  { kw: 'otel tabela',                match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Iter#1 70 arama/ay' },
  { kw: 'dis cephe reklam',           match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Iter#1 +%150 YoY' },
  { kw: 'otel yonlendirme',           match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Iter#1 +%200 YoY' },
  { kw: 'plaza tabela',               match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Kurumsal B2B' },
  { kw: 'avm tabela',                 match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Kurumsal B2B' },
  { kw: 'fabrika tabela',             match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Kurumsal sanayi' },
  { kw: 'osb tabela',                 match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Sanayi nis' },
  { kw: 'tabela istanbul',            match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Genel lokal' },
  { kw: 'istanbul tabela imalati',    match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel', note: 'Profesyonel niyet' },

  // Kutu-Harf-Tabela
  { kw: 'kutu harf',           match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Cekirdek' },
  { kw: 'kutu harf tabela',    match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Cekirdek' },
  { kw: 'paslanmaz harf',      match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Premium' },
  { kw: 'pleksi harf',         match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Iter#1 yuksek donusum' },
  { kw: 'isikli harf tabela',  match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Iter#10' },
  { kw: 'isikli kutu harf',    match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Premium' },
  { kw: 'led kutu harf',       match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Premium LED' },
  { kw: 'aluminyum kutu harf', match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Malzeme nis' },
  { kw: 'pvd kapli harf',      match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel', note: 'Premium finish' },

  // Isikli-Tabela-LED
  { kw: 'isikli tabela',     match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel', note: 'Cekirdek' },
  { kw: 'led tabela',        match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel', note: 'Cekirdek' },
  { kw: 'lightbox tabela',   match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel', note: 'Premium' },
  { kw: 'vakum tabela',      match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel', note: 'Nis tip' },
  { kw: 'aydinlatmali tabela', match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel', note: 'Synonym' },
  { kw: 'isikli reklam panosu', match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel', note: 'B2B' },

  // Dijital-Baski-Arac-Giydirme
  { kw: 'arac giydirme',        match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'Cekirdek' },
  { kw: 'arac kaplama',         match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'Cekirdek' },
  { kw: 'filo giydirme',        match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'Kurumsal filo' },
  { kw: 'arac giydirme reklam', match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'Iter#10' },
  { kw: 'arac reklam giydirme', match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'Iter#10' },
  { kw: 'ticari arac kaplama',  match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'B2B' },
  { kw: 'servis araci giydirme',match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'Transfer/otel' },
  { kw: 'dijital baski',        match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel', note: 'Genel hizmet' },
];

// ============================================================
// 3) TOP PERFORMING ILCELER — long-tail phrase match
//    Iter#1-10'da gosterim/tiklama verisi olan + stratejik kurumsal hub'lar
// ============================================================
const TOP_DISTRICTS = [
  // Proven (arama terimleri verisi var)
  'esenyurt', 'beylikduzu', 'kadikoy', 'cekmekoy',
  // Kurumsal merkez (plaza/AVM/ofis yogun)
  'kagithane', 'sisli', 'besiktas', 'atasehir', 'uskudar', 'maltepe', 'bakirkoy', 'fatih',
  // Yuksek hacim ilceler
  'basaksehir', 'umraniye', 'pendik', 'kartal', 'bagcilar', 'bahcelievler',
];

// Ilce + hizmet kombinasyonlari (6 cekirdek hizmet × 18 ilce = 108)
const DISTRICT_SERVICES = [
  { kw: 'tabela',         campaign: 'Cephe-Totem-Genel',           group: 'cephe-totem-genel' },
  { kw: 'reklam tabela',  campaign: 'Cephe-Totem-Genel',           group: 'cephe-totem-genel' },
  { kw: 'kutu harf',      campaign: 'Kutu-Harf-Tabela',            group: 'kutu-harf-genel' },
  { kw: 'isikli tabela',  campaign: 'Isikli-Tabela-LED',           group: 'Isikli-Tabela-Genel' },
  { kw: 'led tabela',     campaign: 'Isikli-Tabela-LED',           group: 'Isikli-Tabela-Genel' },
  { kw: 'arac giydirme',  campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
];

// ============================================================
// CSV OLUSUMU
// ============================================================
const CSV_HEADER = 'Action,Campaign,Ad group,Keyword,Match type,Status,Notes';

function esc(s) {
  if (!s) return '';
  const str = String(s);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function row({ campaign, group, keyword, match, notes }) {
  return [
    'Add',
    esc(campaign),
    esc(group),
    match === 'Exact' ? `[${keyword}]` : match === 'Phrase' ? `"${keyword}"` : esc(keyword),
    esc(match),
    'Enabled',
    esc(notes || ''),
  ].join(',');
}

const rows = [CSV_HEADER];

// 1) Champions (exact)
for (const c of CHAMPIONS) rows.push(row(c));

// 2) Core phrase keywords
for (const c of CORE) rows.push(row(c));

// 3) Top district × service long-tail
for (const d of TOP_DISTRICTS) {
  for (const s of DISTRICT_SERVICES) {
    rows.push(row({
      campaign: s.campaign,
      group: s.group,
      keyword: `${d} ${s.kw}`,
      match: 'Phrase',
      notes: 'top-ilce long-tail',
    }));
  }
}

writeFileSync(OUTPUT_FILE, rows.join('\n'));

const champions = CHAMPIONS.length;
const core = CORE.length;
const longtail = TOP_DISTRICTS.length * DISTRICT_SERVICES.length;

console.log(`[KeywordCSV v2] ${rows.length - 1} keyword uretildi.`);
console.log(`  Champions (Exact): ${champions}`);
console.log(`  Core (Phrase):    ${core}`);
console.log(`  Long-tail:        ${TOP_DISTRICTS.length} ilce × ${DISTRICT_SERVICES.length} hizmet = ${longtail}`);
console.log(`  Toplam:           ${champions + core + longtail}`);
console.log(`  Cikti: ${OUTPUT_FILE}`);
console.log('');
console.log('v1 ile karsilastirma: 639 → ' + (champions + core + longtail) + ' (%' + Math.round(100 - ((champions + core + longtail) / 639 * 100)) + ' daralma)');
