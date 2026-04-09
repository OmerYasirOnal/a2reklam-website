#!/usr/bin/env node
/**
 * Google Indexing API Submission Script
 * Sitemap'ten URL'leri okur, daha önce gönderilenler hariç günde 20 URL gönderir.
 *
 * Gereksinimler:
 *   1. Google Cloud Console'da Indexing API etkinleştirilmiş proje
 *   2. Service Account JSON key dosyası
 *   3. Service Account email'inin GSC'de sahip olarak eklenmesi
 *
 * Kullanım:
 *   node scripts/submit-google-indexing.mjs                    # Günlük 20 URL
 *   node scripts/submit-google-indexing.mjs --batch=50         # 50 URL gönder
 *   node scripts/submit-google-indexing.mjs --dry-run          # Sadece listele
 *   node scripts/submit-google-indexing.mjs --reset            # Takip dosyasını sıfırla
 *
 * Env:
 *   GOOGLE_SERVICE_ACCOUNT_JSON — Service account JSON dosya yolu
 *                                  (varsayılan: ./service_account.json)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');

const SITEMAP_PATH = join(PROJECT_DIR, 'dist', 'sitemap-0.xml');
const DATA_DIR = join(__dirname, 'data');
const INDEXED_FILE = join(DATA_DIR, 'indexed-urls.json');
const LOG_FILE = join(DATA_DIR, 'indexing-log.txt');

const SERVICE_ACCOUNT_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  || join(PROJECT_DIR, 'service_account.json');

const DAILY_BATCH = parseInt(process.argv.find(a => a.startsWith('--batch='))?.split('=')[1] || '20');
const DRY_RUN = process.argv.includes('--dry-run');
const RESET = process.argv.includes('--reset');

// Colors
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const NC = '\x1b[0m';

function log(msg) { console.log(`${GREEN}[Google]${NC} ${msg}`); }
function warn(msg) { console.log(`${YELLOW}[WARN]${NC} ${msg}`); }
function err(msg) { console.error(`${RED}[ERROR]${NC} ${msg}`); }

function extractUrlsFromSitemap(path) {
  const xml = readFileSync(path, 'utf-8');
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function loadIndexedUrls() {
  if (!existsSync(INDEXED_FILE)) return { submitted: [], lastRun: null };
  return JSON.parse(readFileSync(INDEXED_FILE, 'utf-8'));
}

function saveIndexedUrls(data) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(INDEXED_FILE, JSON.stringify(data, null, 2));
}

function appendLog(msg) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  const timestamp = new Date().toISOString();
  writeFileSync(LOG_FILE, `[${timestamp}] ${msg}\n`, { flag: 'a' });
}

async function getAccessToken(serviceAccount) {
  // Create JWT for Google OAuth2
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url');

  const { createSign } = await import('node:crypto');
  const sign = createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(serviceAccount.private_key, 'base64url');

  const jwt = `${header}.${payload}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!response.ok) {
    throw new Error(`OAuth token alma hatası: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function submitUrl(accessToken, url) {
  const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      url: url,
      type: 'URL_UPDATED',
    }),
  });

  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

async function main() {
  log('Google Indexing API submission başlatılıyor...');

  // Reset mode
  if (RESET) {
    saveIndexedUrls({ submitted: [], lastRun: null });
    log('Takip dosyası sıfırlandı.');
    return;
  }

  // Load service account
  if (!existsSync(SERVICE_ACCOUNT_PATH)) {
    err(`Service Account JSON bulunamadı: ${SERVICE_ACCOUNT_PATH}`);
    err('');
    err('Kurulum adımları:');
    err('1. https://console.cloud.google.com → Proje oluştur');
    err('2. "Indexing API" etkinleştir');
    err('3. Service Account oluştur → JSON key indir');
    err('4. JSON dosyasını proje köküne "service_account.json" olarak kaydet');
    err('5. Service Account email\'ini GSC\'de sahip olarak ekle');
    process.exit(1);
  }

  const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8'));
  log(`Service Account: ${serviceAccount.client_email}`);

  // Sitemap URL'lerini oku
  let allUrls;
  try {
    allUrls = extractUrlsFromSitemap(SITEMAP_PATH);
    log(`Sitemap'ten ${allUrls.length} URL okundu`);
  } catch (e) {
    err(`Sitemap okunamadı: ${e.message}`);
    err(`Önce 'npm run build' çalıştırın.`);
    process.exit(1);
  }

  // Daha önce gönderilenler
  const indexed = loadIndexedUrls();
  const submittedSet = new Set(indexed.submitted);
  const pending = allUrls.filter(u => !submittedSet.has(u));

  log(`Daha önce gönderilmiş: ${indexed.submitted.length}`);
  log(`Bekleyen: ${pending.length}`);
  log(`Bu turda gönderilecek: ${Math.min(pending.length, DAILY_BATCH)}`);

  if (pending.length === 0) {
    log('Tüm URL\'ler zaten gönderilmiş. Yeni sayfa eklendiğinde tekrar çalıştırın.');
    return;
  }

  const batch = pending.slice(0, DAILY_BATCH);

  if (DRY_RUN) {
    log(`[DRY RUN] ${batch.length} URL gönderilecekti:`);
    batch.forEach(u => console.log(`  ${u}`));
    return;
  }

  // OAuth token al
  log('OAuth token alınıyor...');
  let accessToken;
  try {
    accessToken = await getAccessToken(serviceAccount);
    log('Token alındı.');
  } catch (e) {
    err(`Token hatası: ${e.message}`);
    process.exit(1);
  }

  // URL'leri gönder
  let success = 0;
  let failed = 0;

  for (const url of batch) {
    try {
      const result = await submitUrl(accessToken, url);
      if (result.ok) {
        console.log(`  ${GREEN}✓${NC} ${url}`);
        indexed.submitted.push(url);
        success++;
      } else {
        console.log(`  ${RED}✗${NC} ${url} — ${result.status}: ${JSON.stringify(result.data)}`);
        failed++;
      }
    } catch (e) {
      console.log(`  ${RED}✗${NC} ${url} — ${e.message}`);
      failed++;
    }

    // Rate limit: 500ms bekleme
    await new Promise(r => setTimeout(r, 500));
  }

  // Sonuçları kaydet
  indexed.lastRun = new Date().toISOString();
  saveIndexedUrls(indexed);

  const summary = `Gönderilen: ${success}, Başarısız: ${failed}, Toplam bekleyen: ${pending.length - success}`;
  log(summary);
  appendLog(summary);
}

main().catch(e => {
  err(e.message);
  process.exit(1);
});
