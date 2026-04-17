#!/usr/bin/env node
/**
 * SEO Metadata Enricher — districts.ts + sectors.ts
 *
 * İter#17 audit raporu: 104 DESC_SHORT + 22 TITLE_SHORT.
 * Bu script ilçe ve sektör sayfalarının title+metaDescription'larını
 * kurumsal pitch + sosyal kanıt ile zenginleştirir.
 *
 * Hedef:
 *   - Title: 55-65 karakter (Google SERP kesilmez)
 *   - Description: 140-160 karakter (mobil snippet optimum)
 *   - İçerik: lokasyon + kurumsal (AVM/plaza/hastane) + sosyal kanıt + CTA
 *
 * Kullanım:
 *   node scripts/enrich-seo-metadata.mjs
 *
 * DİKKAT: Mevcut dosyaları override eder. Git commit edilmeden çalıştırma!
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');

const PHONE = '0531 618 16 72';
const REVIEWS = '90';
const RATING = '5.0';
const PROJECTS = '2.500+';

// ============================================================
// DISTRICTS — 39 ilçe
// ============================================================

const districtTitle = (name) => {
  // Uzun ilçe isimleri için daha kısa varyant (70 kar altı)
  const full = `${name} Tabelacı | Kurumsal Tabela İmalatı & Montaj | A2 Reklam`;
  if (full.length <= 70) return full;
  // Kısa: "Büyükçekmece Tabelacı | Kurumsal Tabela İmalatı | A2 Reklam" (62 kar)
  return `${name} Tabelacı | Kurumsal Tabela İmalatı | A2 Reklam`;
};

const districtDesc = (name) =>
  `${name}'de kurumsal tabela imalatı: AVM, plaza, hastane, otel. ⭐${RATING}/${REVIEWS} Google yorum, ${PROJECTS} proje. Ücretsiz keşif + 3D tasarım. ☎ ${PHONE}`;

// ============================================================
// SECTORS — 20 sektör
// ============================================================

// Sektör name'i zaten "X Tabelası" veya "X" olabilir. Çift "Tabelası"yı engelle.
const normalizeSectorBase = (name) => {
  if (/tabela(s[ıi])?$/i.test(name)) return name; // zaten "Tabelası" ile bitiyor
  return `${name} Tabelası`;
};

const sectorTitle = (name) => {
  const base = normalizeSectorBase(name);
  const full = `${base} | Kurumsal İmalat & Montaj | A2 Reklam`;
  if (full.length <= 70) return full;
  return `${base} | Kurumsal İmalat | A2 Reklam`;
};

const sectorDesc = (name) => {
  const base = normalizeSectorBase(name);
  const subject = base.replace(/\s*[Tt]abela(s[ıi])?$/i, '');
  return `${subject} işletmeniz için özel ${base.toLowerCase()} imalatı. Cephe, kutu harf, LED, yönlendirme. ⭐${RATING}/${REVIEWS} yorum, ${PROJECTS} proje. ☎ ${PHONE}`;
};

// ============================================================
// DISTRICTS.TS işle
// ============================================================

const districtsPath = join(PROJECT_DIR, 'src/data/districts.ts');
let dtxt = readFileSync(districtsPath, 'utf-8');

// name: 'Kağıthane', title: 'old', metaDescription: 'old'
// Yapı: her block'ta name → title → metaDescription sıralı.
const districtBlockRe = /\{\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*title:\s*'([^']*)',\s*metaDescription:\s*(\n\s*)?"([^"]*)"/g;

let dCount = 0;
dtxt = dtxt.replace(districtBlockRe, (m, slug, name, oldTitle, nl, oldDesc) => {
  dCount++;
  const newTitle = districtTitle(name);
  const newDesc = districtDesc(name);
  const prefix = nl || ' ';
  return `{\n    slug: '${slug}',\n    name: '${name}',\n    title: '${newTitle}',\n    metaDescription:${prefix}"${newDesc}"`;
});

writeFileSync(districtsPath, dtxt);
console.log(`[Districts] ${dCount} ilçe güncellendi`);
console.log(`  Title örneği: "${districtTitle('Kadıköy')}" (${districtTitle('Kadıköy').length} kar)`);
console.log(`  Desc örneği: "${districtDesc('Kadıköy')}" (${districtDesc('Kadıköy').length} kar)`);

// ============================================================
// SECTORS.TS işle
// ============================================================

const sectorsPath = join(PROJECT_DIR, 'src/data/sectors.ts');
let stxt = readFileSync(sectorsPath, 'utf-8');

// Structure check
const hasMetaDesc = /metaDescription/.test(stxt);
const hasTitle = /^\s*title:/m.test(stxt);

if (!hasMetaDesc || !hasTitle) {
  console.log('[Sectors] ⚠ title/metaDescription alanı yok — sectors.ts\'de template seviyesinde düzeltilecek (skip)');
} else {
  // sectors.ts tek tırnak ('...') kullanıyor. Apostrof içeren değerler için
  // title ve metaDescription'ı ayrı ayrı değiştirelim (name'den faydalanarak).
  // 1) Önce tüm sektörleri name listesine çıkar
  const sectorNameRe = /slug:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
  const sectorList = [];
  for (const m of stxt.matchAll(sectorNameRe)) {
    sectorList.push({ slug: m[1], name: m[2] });
  }

  let sCount = 0;
  for (const s of sectorList) {
    // Title: sonraki title: '…' satırını bul (slug match)
    // Stratejisi: slug ile başlayan block'u bul, title'ı değiştir
    const slugAnchor = `slug: '${s.slug}'`;
    const idx = stxt.indexOf(slugAnchor);
    if (idx === -1) continue;
    // Block sonu: bir sonraki "slug:" ya da dosyanın sonu
    const nextSlugIdx = stxt.indexOf("slug: '", idx + slugAnchor.length);
    const blockEnd = nextSlugIdx === -1 ? stxt.length : nextSlugIdx;
    let block = stxt.slice(idx, blockEnd);

    // Title: hem tek hem çift tırnak
    const newTitle = sectorTitle(s.name);
    const newDesc = sectorDesc(s.name);
    let changed = false;

    // Title: 'xxx' veya "xxx" — gerçek apostrof sorunu: escape backtick kullanalım
    const titleBefore = block;
    block = block.replace(/^(\s*title:\s*)(['"])([^\n]*?)\2,/m,
      `$1\`${newTitle}\`,`);
    if (block !== titleBefore) changed = true;

    const descBefore = block;
    block = block.replace(/^(\s*metaDescription:\s*)(['"])([^\n]*?)\2,/m,
      `$1\`${newDesc}\`,`);
    // Sometimes metaDescription on next line:
    if (block === descBefore) {
      block = block.replace(/^(\s*metaDescription:\s*\n\s*)(['"])([^\n]*?)\2,/m,
        `$1\`${newDesc}\`,`);
    }
    if (block !== descBefore) changed = true;

    if (changed) {
      sCount++;
      stxt = stxt.slice(0, idx) + block + stxt.slice(blockEnd);
    }
  }
  writeFileSync(sectorsPath, stxt);
  console.log(`[Sectors] ${sCount} sektör güncellendi`);
  console.log(`  Title örneği: "${sectorTitle('Restoran')}" (${sectorTitle('Restoran').length} kar)`);
  console.log(`  Desc örneği: "${sectorDesc('Restoran')}" (${sectorDesc('Restoran').length} kar)`);
}

console.log('');
console.log('[Enrich] ✅ Tamamlandı. Sonraki: npm run build && node scripts/audit-seo.mjs');
