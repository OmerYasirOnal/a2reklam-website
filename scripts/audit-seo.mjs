#!/usr/bin/env node
/**
 * Site SEO Audit — tüm build edilmiş sayfaları tara.
 *
 * Kontroller:
 *   - Title uzunluk (50-65 ideal, uyarı <30 veya >70)
 *   - Meta description uzunluk (130-160 ideal)
 *   - Canonical varlığı
 *   - H1 sayısı (tam 1 olmalı)
 *   - Schema.org sayısı + türleri
 *   - İç/dış link sayısı
 *   - Word count (<200 = "thin content")
 *   - Duplicate title tespiti
 *   - Missing OG image
 *
 * Çıktı:
 *   scripts/data/seo-audit-report.md
 *   scripts/data/seo-audit-raw.json
 *
 * Kullanım:
 *   npm run build && node scripts/audit-seo.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const DIST_DIR = join(PROJECT_DIR, 'dist');
const DATA_DIR = join(__dirname, 'data');

const TITLE_MIN = 30;
const TITLE_MAX = 70;
const DESC_MIN = 120;
const DESC_MAX = 170;
const WORD_MIN = 200;

function walk(dir, fileList = []) {
  for (const name of readdirSync(dir)) {
    const fp = join(dir, name);
    try {
      const s = statSync(fp);
      if (s.isDirectory()) walk(fp, fileList);
      else if (name.endsWith('.html')) fileList.push(fp);
    } catch { /* skip */ }
  }
  return fileList;
}

function extract(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

function countWordsInBody(html) {
  // sadece <body> içindeki görünür metin
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!body) return 0;
  const text = body[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(/\s+/).filter(Boolean).length;
}

function audit(file) {
  const html = readFileSync(file, 'utf-8');
  const rel = relative(DIST_DIR, file);
  const url = '/' + rel.replace(/\\/g, '/').replace(/index\.html$/, '');

  const title = extract(html, /<title>([^<]+)<\/title>/);
  // Astro HTML kullanıyor " (double quote) attribute wrapper; content içeriğinde ' (apostrof) olur.
  const desc = extract(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = extract(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const ogImage = extract(html, /<meta\s+property="og:image"\s+content="([^"]+)"/i);
  const noindex = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html);

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const schemaBlocks = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];
  const schemaTypes = new Set();
  for (const b of schemaBlocks) {
    const types = b.match(/"@type":\s*"([^"]+)"/g) || [];
    for (const t of types) {
      const m = t.match(/"([^"]+)"$/);
      if (m) schemaTypes.add(m[1]);
    }
    const arrTypes = b.match(/"@type":\s*\[([^\]]+)\]/g) || [];
    for (const a of arrTypes) {
      const inner = a.match(/"([A-Za-z]+)"/g) || [];
      for (const i of inner) schemaTypes.add(i.replace(/"/g, ''));
    }
  }

  const internalLinks = (html.match(/href=["']\/(?![/])/g) || []).length;
  const words = countWordsInBody(html);

  const issues = [];
  if (!title) issues.push('TITLE_MISSING');
  else {
    if (title.length < TITLE_MIN) issues.push(`TITLE_SHORT(${title.length})`);
    if (title.length > TITLE_MAX) issues.push(`TITLE_LONG(${title.length})`);
  }
  if (!desc) issues.push('DESC_MISSING');
  else {
    if (desc.length < DESC_MIN) issues.push(`DESC_SHORT(${desc.length})`);
    if (desc.length > DESC_MAX) issues.push(`DESC_LONG(${desc.length})`);
  }
  if (!canonical) issues.push('CANONICAL_MISSING');
  if (!ogImage) issues.push('OG_IMAGE_MISSING');
  if (h1Count === 0) issues.push('H1_MISSING');
  if (h1Count > 1) issues.push(`H1_MULTIPLE(${h1Count})`);
  if (words < WORD_MIN && !noindex) issues.push(`THIN_CONTENT(${words}w)`);
  if (schemaBlocks.length === 0) issues.push('SCHEMA_MISSING');

  return {
    url,
    title,
    titleLen: title?.length || 0,
    desc,
    descLen: desc?.length || 0,
    canonical,
    ogImage,
    noindex,
    h1Count,
    schemaCount: schemaBlocks.length,
    schemaTypes: [...schemaTypes],
    internalLinks,
    words,
    issues,
  };
}

const files = walk(DIST_DIR);
console.log(`[SEO] ${files.length} HTML dosyası taranıyor...`);

const results = files.map(audit);

// Duplicate title detection
const titleMap = new Map();
for (const r of results) {
  if (!r.title || r.noindex) continue;
  if (!titleMap.has(r.title)) titleMap.set(r.title, []);
  titleMap.get(r.title).push(r.url);
}
for (const [t, urls] of titleMap) {
  if (urls.length > 1) {
    for (const u of urls) {
      const r = results.find(x => x.url === u);
      r.issues.push(`TITLE_DUPLICATE(${urls.length})`);
    }
  }
}

// Summary
const total = results.length;
const withIssues = results.filter(r => r.issues.length > 0).length;
const indexable = results.filter(r => !r.noindex).length;

const issueCount = {};
for (const r of results) {
  for (const i of r.issues) {
    const key = i.replace(/\(\d+[a-z]?\)/, '').replace(/\(\d+\)/, '');
    issueCount[key] = (issueCount[key] || 0) + 1;
  }
}

const lines = [];
lines.push('# A2 Reklam — SEO Audit Raporu');
lines.push('');
lines.push(`**Tarih:** ${new Date().toISOString()}`);
lines.push(`**Toplam HTML:** ${total}`);
lines.push(`**Indexable:** ${indexable} (noindex olmayan)`);
lines.push(`**Sorunlu sayfa:** ${withIssues} (%${Math.round(withIssues/total*100)})`);
lines.push('');
lines.push('## 📊 Sorun Özeti');
lines.push('');
lines.push('| Sorun | Sayı |');
lines.push('|-------|------|');
for (const [k, v] of Object.entries(issueCount).sort((a,b) => b[1]-a[1])) {
  lines.push(`| ${k} | ${v} |`);
}
lines.push('');

// Top priority fixes
const critical = results.filter(r =>
  r.issues.some(i => ['TITLE_MISSING', 'H1_MISSING', 'SCHEMA_MISSING', 'THIN_CONTENT'].some(c => i.startsWith(c))) &&
  !r.noindex
);

lines.push(`## 🚨 Kritik Sayfalar (${critical.length})`);
lines.push('');
lines.push('Title/H1/Schema eksik veya thin content (noindex değil):');
lines.push('');
lines.push('| URL | Issues |');
lines.push('|-----|--------|');
for (const r of critical.slice(0, 30)) {
  lines.push(`| ${r.url} | ${r.issues.join(', ')} |`);
}
if (critical.length > 30) {
  lines.push(`| ... ve ${critical.length - 30} diğer sayfa | (raw.json'da) |`);
}
lines.push('');

// Thin content
const thin = results.filter(r =>
  r.issues.some(i => i.startsWith('THIN_CONTENT')) && !r.noindex
);
lines.push(`## 📄 Thin Content (${thin.length})`);
lines.push('');
lines.push('Word count < 200 olan indexable sayfalar (içerik zenginleştir):');
lines.push('');
lines.push('| URL | Word Count |');
lines.push('|-----|------------|');
for (const r of thin.slice(0, 20)) {
  lines.push(`| ${r.url} | ${r.words} |`);
}
lines.push('');

// Title issues
const titleIssues = results.filter(r =>
  r.issues.some(i => i.startsWith('TITLE_')) && !r.noindex
);
lines.push(`## 📝 Title Sorunları (${titleIssues.length})`);
lines.push('');
lines.push('| URL | Title | Uzunluk | Problem |');
lines.push('|-----|-------|---------|---------|');
for (const r of titleIssues.slice(0, 20)) {
  const probs = r.issues.filter(i => i.startsWith('TITLE_')).join(', ');
  lines.push(`| ${r.url} | ${(r.title || '').slice(0, 70)} | ${r.titleLen} | ${probs} |`);
}
lines.push('');

// Description issues
const descIssues = results.filter(r =>
  r.issues.some(i => i.startsWith('DESC_')) && !r.noindex
);
lines.push(`## 📋 Meta Description Sorunları (${descIssues.length})`);
lines.push('');
lines.push('| URL | Uzunluk | Problem |');
lines.push('|-----|---------|---------|');
for (const r of descIssues.slice(0, 20)) {
  const probs = r.issues.filter(i => i.startsWith('DESC_')).join(', ');
  lines.push(`| ${r.url} | ${r.descLen} | ${probs} |`);
}
lines.push('');

// Schema coverage
const noSchema = results.filter(r => r.schemaCount === 0 && !r.noindex);
lines.push(`## 🏷 Schema Eksik (${noSchema.length})`);
lines.push('');
if (noSchema.length > 0) {
  for (const r of noSchema.slice(0, 15)) lines.push(`- ${r.url}`);
} else {
  lines.push('Hepsi schema içeriyor ✅');
}
lines.push('');

// Top performing pages
lines.push('## 🏆 En İyi 10 Sayfa (içerik + schema bakımından)');
lines.push('');
const best = results
  .filter(r => !r.noindex)
  .sort((a, b) => (b.words + b.schemaCount * 100 + b.internalLinks) - (a.words + a.schemaCount * 100 + a.internalLinks))
  .slice(0, 10);
lines.push('| URL | Words | Schema | İç Link |');
lines.push('|-----|-------|--------|---------|');
for (const r of best) {
  lines.push(`| ${r.url} | ${r.words} | ${r.schemaCount} | ${r.internalLinks} |`);
}
lines.push('');

// Schema type distribution
const typeCount = {};
for (const r of results) {
  for (const t of r.schemaTypes) typeCount[t] = (typeCount[t] || 0) + 1;
}
lines.push('## 📐 Schema Türü Dağılımı');
lines.push('');
lines.push('| Schema Türü | Sayfa Sayısı |');
lines.push('|-------------|--------------|');
for (const [t, v] of Object.entries(typeCount).sort((a,b) => b[1]-a[1]).slice(0, 20)) {
  lines.push(`| ${t} | ${v} |`);
}

writeFileSync(join(DATA_DIR, 'seo-audit-report.md'), lines.join('\n'));
writeFileSync(join(DATA_DIR, 'seo-audit-raw.json'), JSON.stringify(results, null, 2));

console.log('[SEO] Rapor:', join(DATA_DIR, 'seo-audit-report.md'));
console.log('[SEO] Raw JSON:', join(DATA_DIR, 'seo-audit-raw.json'));
console.log('');
console.log(`[SEO] Toplam: ${total} sayfa, ${withIssues} sorunlu (%${Math.round(withIssues/total*100)})`);
console.log('[SEO] Kritik fix gereken:', critical.length);
console.log('[SEO] Thin content:', thin.length);
console.log('[SEO] Title sorunu:', titleIssues.length);
console.log('[SEO] Desc sorunu:', descIssues.length);
console.log('[SEO] Schema eksik:', noSchema.length);
