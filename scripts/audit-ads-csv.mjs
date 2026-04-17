#!/usr/bin/env node
/**
 * Google Ads CSV Auditor
 *
 * Import'tan once tum CSV'leri validate eder:
 *   - Duplicate keyword (ayni kampanyada cift kelime)
 *   - Karakter limit (headline 30, description 90, path 15, callout 25, sitelink title 25)
 *   - Tutarli kampanya/ad group isimleri
 *   - Eksik/bozuk CSV satirlari
 *
 * Kullanim: npm run ads:audit
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = join(__dirname, 'data');

const VALID_CAMPAIGNS = new Set([
  'Cephe-Totem-Genel',
  'Isikli-Tabela-LED',
  'Kutu-Harf-Tabela',
  'Dijital-Baski-Arac-Giydirme',
]);

const VALID_GROUPS = new Set([
  'cephe-totem-genel',
  'Isikli-Tabela-Genel',
  'kutu-harf-genel',
  'Dijital-Baski-genel',
]);

const LIMITS = {
  headline: 30,
  description: 90,
  path: 15,
  callout: 25,
  sitelinkTitle: 25,
  sitelinkDesc: 35,
  keyword: 80,
};

let warnings = 0;
let errors = 0;

function warn(msg) { console.warn('⚠ ', msg); warnings++; }
function err(msg) { console.error('✗ ', msg); errors++; }
function ok(msg) { console.log('✓ ', msg); }

// Basit CSV parser (RFC 4180 benzeri, cift tirnak destegi)
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') { row.push(field); field = ''; }
      else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (ch === '\r') { /* skip */ }
      else field += ch;
    }
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0]));
}

function loadCSV(name) {
  const path = join(DATA, name);
  if (!existsSync(path)) {
    err(`CSV bulunamadi: ${name}`);
    return null;
  }
  const raw = readFileSync(path, 'utf8');
  const rows = parseCSV(raw);
  if (rows.length < 2) {
    err(`${name}: bos dosya`);
    return null;
  }
  const header = rows[0];
  const data = rows.slice(1).map((r) => {
    const o = {};
    header.forEach((h, i) => { o[h] = r[i] || ''; });
    return o;
  });
  return { header, data };
}

// ============================================================
// 1) KEYWORDS (ana + corporate)
// ============================================================
function auditKeywords(file, label) {
  console.log(`\n=== ${label} (${file}) ===`);
  const csv = loadCSV(file);
  if (!csv) return;

  const seen = new Map(); // campaign → Set<keyword>
  let dupCount = 0;

  for (const row of csv.data) {
    const campaign = row.Campaign;
    const group = row['Ad group'];
    const kw = row.Keyword;
    const match = row['Match type'];

    if (!VALID_CAMPAIGNS.has(campaign)) warn(`Gecersiz kampanya: "${campaign}" (kw: ${kw})`);
    if (!VALID_GROUPS.has(group)) warn(`Gecersiz ad group: "${group}" (kw: ${kw})`);
    if (!['Exact', 'Phrase', 'Broad'].includes(match)) warn(`Gecersiz match type: ${match} (kw: ${kw})`);
    if (kw.length > LIMITS.keyword) err(`Keyword cok uzun: "${kw}" (${kw.length}/${LIMITS.keyword})`);

    if (/["\[\]]/.test(kw)) err(`Keyword'de rezerve karakter: "${kw}" (Editor match type sutunundan alir)`);

    // Duplicate
    const key = `${campaign}::${kw}`;
    if (!seen.has(campaign)) seen.set(campaign, new Set());
    if (seen.get(campaign).has(kw)) {
      err(`Duplicate: "${kw}" → ${campaign}`);
      dupCount++;
    }
    seen.get(campaign).add(kw);
  }

  ok(`${csv.data.length} keyword, ${dupCount} duplicate`);
  for (const [camp, set] of seen) {
    ok(`  ${camp}: ${set.size} unique keyword`);
  }
}

// ============================================================
// 2) NEGATIVES
// ============================================================
function auditNegatives() {
  console.log(`\n=== NEGATIVES (google-ads-negatives-import.csv) ===`);
  const csv = loadCSV('google-ads-negatives-import.csv');
  if (!csv) return;

  const seen = new Map();
  let dupCount = 0;
  for (const row of csv.data) {
    const camp = row.Campaign;
    const kw = row['Negative keyword'];
    if (!VALID_CAMPAIGNS.has(camp)) warn(`Gecersiz kampanya: ${camp}`);
    const key = `${camp}::${kw}`;
    if (seen.has(key)) { err(`Negatif duplicate: ${kw} → ${camp}`); dupCount++; }
    seen.set(key, true);
  }
  ok(`${csv.data.length} negatif, ${dupCount} duplicate`);
}

// ============================================================
// 3) SITELINKS
// ============================================================
function auditSitelinks() {
  console.log(`\n=== SITELINKS (google-ads-sitelinks.csv) ===`);
  const csv = loadCSV('google-ads-sitelinks.csv');
  if (!csv) return;

  const perCampaign = new Map();
  for (const row of csv.data) {
    const camp = row.Campaign;
    const title = row['Sitelink text'];
    const d1 = row['Description line 1'];
    const d2 = row['Description line 2'];
    const url = row['Final URL'];

    if (title.length > LIMITS.sitelinkTitle) err(`Sitelink title uzun: "${title}" (${title.length}/${LIMITS.sitelinkTitle})`);
    if (d1.length > LIMITS.sitelinkDesc) err(`Sitelink desc1 uzun: "${d1}" (${d1.length}/${LIMITS.sitelinkDesc})`);
    if (d2.length > LIMITS.sitelinkDesc) err(`Sitelink desc2 uzun: "${d2}" (${d2.length}/${LIMITS.sitelinkDesc})`);
    if (!/^https?:\/\//.test(url)) err(`Sitelink URL http(s)// ile baslamali: ${url}`);

    perCampaign.set(camp, (perCampaign.get(camp) || 0) + 1);
  }
  for (const [c, n] of perCampaign) {
    if (n < 4) warn(`${c}: sadece ${n} sitelink (min 4 onerilir)`);
    ok(`  ${c}: ${n} sitelink`);
  }
}

// ============================================================
// 4) CALLOUTS
// ============================================================
function auditCallouts() {
  console.log(`\n=== CALLOUTS (google-ads-callouts.csv) ===`);
  const csv = loadCSV('google-ads-callouts.csv');
  if (!csv) return;

  const perCampaign = new Map();
  for (const row of csv.data) {
    const camp = row.Campaign;
    const text = row['Callout text'];
    if (text.length > LIMITS.callout) err(`Callout uzun: "${text}" (${text.length}/${LIMITS.callout})`);
    perCampaign.set(camp, (perCampaign.get(camp) || 0) + 1);
  }
  for (const [c, n] of perCampaign) {
    if (n < 4) warn(`${c}: ${n} callout (min 4 gerekli)`);
    ok(`  ${c}: ${n} callout`);
  }
}

// ============================================================
// 5) RSA
// ============================================================
function auditRSA() {
  console.log(`\n=== RSA (google-ads-rsa-import.csv) ===`);
  const csv = loadCSV('google-ads-rsa-import.csv');
  if (!csv) return;

  for (const row of csv.data) {
    const camp = row.Campaign;
    const finalUrl = row['Final URL'];
    if (!VALID_CAMPAIGNS.has(camp)) warn(`Gecersiz RSA kampanya: ${camp}`);
    if (!/^https:\/\/a2reklam\.com\//.test(finalUrl)) warn(`Final URL a2reklam.com disinda: ${finalUrl}`);

    let headlines = 0, pins = 0;
    for (let i = 1; i <= 15; i++) {
      const h = row[`Headline ${i}`];
      if (h) {
        headlines++;
        if (h.length > LIMITS.headline) err(`${camp} Headline ${i}: "${h}" (${h.length}/${LIMITS.headline})`);
      }
      const p = row[`Headline ${i} position`];
      if (p) pins++;
    }
    for (let i = 1; i <= 4; i++) {
      const d = row[`Description ${i}`];
      if (d && d.length > LIMITS.description) err(`${camp} Description ${i}: "${d}" (${d.length}/${LIMITS.description})`);
    }
    const p1 = row['Path 1'] || '';
    const p2 = row['Path 2'] || '';
    if (p1.length > LIMITS.path) err(`${camp} Path 1 uzun: "${p1}" (${p1.length}/${LIMITS.path})`);
    if (p2.length > LIMITS.path) err(`${camp} Path 2 uzun: "${p2}" (${p2.length}/${LIMITS.path})`);

    ok(`  ${camp}: ${headlines} headline (${pins} pinned), path /${p1}/${p2}`);
  }
}

// ============================================================
// ÇALIŞTIR
// ============================================================
auditKeywords('google-ads-keywords-import.csv', 'KEYWORDS (ana)');
auditKeywords('google-ads-corporate-keywords.csv', 'KEYWORDS (kurumsal)');
auditNegatives();
auditSitelinks();
auditCallouts();
auditRSA();

console.log(`\n${'='.repeat(50)}`);
if (errors === 0 && warnings === 0) {
  console.log('✓ Tum CSV\'ler temiz — import icin hazir');
} else {
  console.log(`${errors} hata, ${warnings} uyari`);
  if (errors > 0) process.exit(1);
}
