#!/usr/bin/env node
/**
 * Blog description enricher.
 *
 * Amaç: İter#17 audit'te 52 blog sayfasının metaDescription'ı < 120 kar.
 * Google SERP optimum: 140-160 kar.
 * Bu script her blog frontmatter'ına kurumsal CTA suffix ekler
 * (sadece description < 130 ise; zaten uzun olanlara dokunmaz).
 *
 * Kullanım:
 *   node scripts/enrich-blog-descriptions.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', 'src', 'content', 'blog');
const REHBER_DIR = join(__dirname, '..', 'src', 'content', 'tabela_rehberi');

// Suffix seçenekleri: description konusuna göre varyans
const SUFFIXES = [
  ' | A2 Reklam: 2.500+ proje, ⭐5.0/90 yorum.',
  ' — 2.500+ proje deneyimi, ⭐5.0/90 Google yorum | A2 Reklam.',
  ' | 2.500+ tamamlanmış proje, 20+ yıl deneyim — A2 Reklam.',
  ' — A2 Reklam: ⭐5.0/90 Google yorum, 39 ilçede hizmet.',
];

const TARGET_MIN = 140;
const TARGET_MAX = 165;

function pickSuffix(existingDesc, index) {
  // En kısa suffix'i seç ki mümkünse 140-165 hedefinde kalınsın
  const cur = existingDesc.length;
  const candidates = SUFFIXES
    .map((s, i) => ({ s, total: cur + s.length, idx: i }))
    .filter(c => c.total <= TARGET_MAX);
  if (candidates.length === 0) {
    // Çok uzun suffix zorluyor; en kısasını seç
    return SUFFIXES.reduce((a, b) => a.length < b.length ? a : b);
  }
  // En 140'a yakın olanı seç
  const best = candidates.reduce((a, b) =>
    Math.abs(a.total - 150) < Math.abs(b.total - 150) ? a : b
  );
  return best.s;
}

function processDir(dir, label) {
  let updated = 0;
  let skipped = 0;
  const files = readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  for (let i = 0; i < files.length; i++) {
    const fp = join(dir, files[i]);
    let txt = readFileSync(fp, 'utf-8');

    // Frontmatter description
    const m = txt.match(/^---\n([\s\S]*?)\n---/);
    if (!m) { skipped++; continue; }
    const fm = m[1];

    // description: "..." veya description: '...'
    const dm = fm.match(/^description:\s*(["'])((?:(?!\1).)*)\1/m);
    if (!dm) { skipped++; continue; }
    const quote = dm[1];
    const desc = dm[2];

    if (desc.length >= TARGET_MIN) { skipped++; continue; }

    // Suffix zaten var mı (A2 Reklam içeren)?
    if (/A2 Reklam[.,:]/.test(desc)) { skipped++; continue; }

    const suffix = pickSuffix(desc, i);
    let newDesc = desc.trimEnd();
    // Noktalama ile bitiriyorsa yeniden ekleme
    if (/[.!?]$/.test(newDesc)) {
      // Suffix'in başındaki " |" veya " —" kullan
      newDesc = newDesc + suffix;
    } else {
      newDesc = newDesc + '.' + suffix;
    }

    // Encode quotes in content
    const safeDesc = quote === '"' ? newDesc.replace(/"/g, '\\"') : newDesc.replace(/'/g, "\\'");

    const newFm = fm.replace(
      /^description:\s*(["'])((?:(?!\1).)*)\1/m,
      `description: ${quote}${safeDesc}${quote}`
    );

    txt = txt.replace(fm, newFm);
    writeFileSync(fp, txt);
    updated++;
  }

  console.log(`[${label}] Updated: ${updated}, Skipped: ${skipped}`);
  return { updated, skipped };
}

const blogStats = processDir(BLOG_DIR, 'Blog');
const rehberStats = processDir(REHBER_DIR, 'Tabela Rehberi');

console.log('');
console.log(`[Total] ${blogStats.updated + rehberStats.updated} dosya güncellendi`);
