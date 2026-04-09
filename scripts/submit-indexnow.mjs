#!/usr/bin/env node
/**
 * IndexNow Submission Script — Bing + Yandex
 * Sitemap'ten tüm URL'leri okur ve IndexNow API'ye gönderir.
 *
 * Kullanım: node scripts/submit-indexnow.mjs [--dry-run]
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');

const HOST = 'a2reklam.com';
const INDEXNOW_KEY = 'b2046b967c6a4b2c3bf5f215a3cb6c8d';
const SITEMAP_PATH = join(PROJECT_DIR, 'dist', 'sitemap-0.xml');
const DRY_RUN = process.argv.includes('--dry-run');

// Colors
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const NC = '\x1b[0m';

function log(msg) { console.log(`${GREEN}[IndexNow]${NC} ${msg}`); }
function warn(msg) { console.log(`${YELLOW}[WARN]${NC} ${msg}`); }
function err(msg) { console.error(`${RED}[ERROR]${NC} ${msg}`); }

function extractUrlsFromSitemap(sitemapPath) {
  const xml = readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function submitToIndexNow(urls) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return {
    status: response.status,
    statusText: response.statusText,
    ok: response.status === 200 || response.status === 202,
  };
}

async function main() {
  log(`IndexNow submission başlatılıyor...`);
  log(`Host: ${HOST}`);
  log(`Key: ${INDEXNOW_KEY.slice(0, 8)}...`);

  // Sitemap'ten URL'leri çek
  let urls;
  try {
    urls = extractUrlsFromSitemap(SITEMAP_PATH);
    log(`Sitemap'ten ${urls.length} URL okundu`);
  } catch (e) {
    err(`Sitemap okunamadı: ${e.message}`);
    err(`Önce 'npm run build' çalıştırın.`);
    process.exit(1);
  }

  if (urls.length === 0) {
    warn('Sitemap boş, gönderilecek URL yok.');
    return;
  }

  if (DRY_RUN) {
    log(`[DRY RUN] ${urls.length} URL gönderilecekti:`);
    urls.slice(0, 10).forEach(u => console.log(`  ${u}`));
    if (urls.length > 10) console.log(`  ... ve ${urls.length - 10} tane daha`);
    return;
  }

  // IndexNow'a gönder
  log(`${urls.length} URL IndexNow'a gönderiliyor...`);
  const result = await submitToIndexNow(urls);

  if (result.ok) {
    log(`Başarılı! (HTTP ${result.status}) — ${urls.length} URL Bing ve Yandex'e bildirildi.`);
  } else {
    err(`Başarısız! HTTP ${result.status} ${result.statusText}`);
    process.exit(1);
  }
}

main().catch(e => {
  err(e.message);
  process.exit(1);
});
