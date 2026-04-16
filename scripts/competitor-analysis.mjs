#!/usr/bin/env node
/**
 * Rakip Analiz Scripti
 *
 * competitors.json'daki her rakip için:
 * - Sitemap'ten sayfa sayısı
 * - Homepage meta tag'leri (title, description)
 * - robots.txt
 * - Blog/içerik yayın sıklığı (sitemap lastmod'a göre)
 *
 * Çıktı: scripts/data/competitor-report-{YYYY-MM}.md + GitHub Actions'ta issue
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPETITORS_FILE = join(__dirname, 'data', 'competitors.json');
const DATA_DIR = join(__dirname, 'data');

const TIMEOUT_MS = 20000;
const USER_AGENT = 'Mozilla/5.0 (compatible; A2ReklamBot/1.0; +https://a2reklam.com/bot)';

function log(msg) { console.log(`[Analysis] ${msg}`); }
function warn(msg) { console.log(`[WARN] ${msg}`); }

async function fetchText(url) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: 'follow',
    });
    if (!response.ok) return null;
    return await response.text();
  } catch (e) {
    return null;
  }
}

async function fetchHead(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: 'follow',
    });
    return { status: response.status, ok: response.ok };
  } catch (e) {
    return { status: 0, ok: false, error: e.message };
  }
}

function extractSitemapUrls(xml) {
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = locRegex.exec(xml)) !== null) urls.push(m[1]);
  return urls;
}

function extractLastmods(xml) {
  const dates = [];
  const regex = /<lastmod>([^<]+)<\/lastmod>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    try { dates.push(new Date(m[1])); } catch {}
  }
  return dates;
}

function extractMeta(html, name) {
  const regex = new RegExp(`<meta\\s+(?:name|property)=["']${name}["']\\s+content=["']([^"']+)["']`, 'i');
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim().substring(0, 150) : null;
}

async function analyzeSitemap(baseUrl) {
  const candidates = [
    `${baseUrl}/sitemap-index.xml`,
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap_index.xml`,
  ];
  for (const u of candidates) {
    const xml = await fetchText(u);
    if (!xml) continue;

    // Sitemap index mi yoksa URL listesi mi?
    if (xml.includes('<sitemapindex')) {
      // Index — ilk 3 alt sitemap'i çek, birleştir
      const subUrls = extractSitemapUrls(xml).slice(0, 5);
      let totalUrls = 0;
      const allLastmods = [];
      for (const sub of subUrls) {
        const subXml = await fetchText(sub);
        if (subXml) {
          totalUrls += extractSitemapUrls(subXml).length;
          allLastmods.push(...extractLastmods(subXml));
        }
      }
      return { sitemapUrl: u, totalUrls, lastmods: allLastmods };
    } else {
      const totalUrls = extractSitemapUrls(xml).length;
      const lastmods = extractLastmods(xml);
      return { sitemapUrl: u, totalUrls, lastmods };
    }
  }
  return null;
}

function estimateBlogFrequency(lastmods) {
  if (!lastmods || lastmods.length < 2) return 'Bilinmiyor';
  const recent = lastmods.filter(d => {
    const ageMs = Date.now() - d.getTime();
    return ageMs < 90 * 24 * 60 * 60 * 1000; // Son 90 gün
  });
  if (recent.length === 0) return 'Son 90 günde güncelleme yok';
  const perWeek = (recent.length / 13).toFixed(1);
  return `~${perWeek} güncelleme/hafta (son 90 gün)`;
}

async function analyzeCompetitor(competitor) {
  const url = competitor.url;
  log(`Analiz: ${competitor.domain}`);

  const result = {
    domain: competitor.domain,
    url,
    timestamp: new Date().toISOString(),
    homepage: null,
    sitemap: null,
    robots: null,
    meta: {},
    errors: [],
  };

  // Homepage
  const homepage = await fetchText(url);
  if (homepage) {
    result.homepage = {
      length: homepage.length,
      ok: true,
    };
    result.meta.title = extractTitle(homepage);
    result.meta.description = extractMeta(homepage, 'description');
    result.meta.ogImage = extractMeta(homepage, 'og:image');
    result.meta.h1Count = (homepage.match(/<h1[\s>]/gi) || []).length;
    result.meta.wordCount = (homepage.replace(/<[^>]+>/g, ' ').match(/\S+/g) || []).length;
  } else {
    result.errors.push('Homepage alınamadı');
  }

  // Sitemap
  const sitemap = await analyzeSitemap(url);
  if (sitemap) {
    result.sitemap = {
      url: sitemap.sitemapUrl,
      totalUrls: sitemap.totalUrls,
      blogFrequency: estimateBlogFrequency(sitemap.lastmods),
      lastUpdate: sitemap.lastmods.length ? new Date(Math.max(...sitemap.lastmods.map(d => d.getTime()))).toISOString() : null,
    };
  } else {
    result.errors.push('Sitemap bulunamadı');
  }

  // robots.txt
  const robots = await fetchText(`${url}/robots.txt`);
  if (robots) {
    result.robots = {
      size: robots.length,
      hasSitemap: robots.toLowerCase().includes('sitemap:'),
      hasAISupport: /ai\.txt|gptbot|claudebot/i.test(robots),
    };
  }

  return result;
}

function generateReport(analyses, db) {
  const now = new Date();
  const month = now.toISOString().slice(0, 7);
  const lines = [
    `# Rakip Analiz Raporu — ${month}`,
    ``,
    `**Üretim:** ${now.toISOString()}`,
    `**Toplam Rakip:** ${analyses.length}`,
    `**A2 Reklam Referansı:** https://a2reklam.com`,
    ``,
    `## Özet Tablo`,
    ``,
    `| # | Domain | Sayfa | H.Başlık Uzunluk | H.Kelime | Son Güncelleme | Blog Freq |`,
    `|---|---|---|---|---|---|---|`,
  ];

  // Sayfa sayısına göre sırala
  const sorted = [...analyses].sort((a, b) => (b.sitemap?.totalUrls || 0) - (a.sitemap?.totalUrls || 0));

  sorted.forEach((a, i) => {
    const titleLen = a.meta.title?.length || 0;
    const wc = a.meta.wordCount || 0;
    const urls = a.sitemap?.totalUrls || '-';
    const freq = a.sitemap?.blogFrequency || '-';
    const lastUpd = a.sitemap?.lastUpdate ? a.sitemap.lastUpdate.slice(0, 10) : '-';
    lines.push(`| ${i + 1} | [${a.domain}](${a.url}) | ${urls} | ${titleLen} | ${wc} | ${lastUpd} | ${freq} |`);
  });

  lines.push('', '## A2 Reklam ile Karşılaştırma', '');
  lines.push('| Metrik | A2 Reklam | En İyi Rakip | Ortalama Rakip |');
  lines.push('|---|---|---|---|');
  const avgPages = sorted.reduce((s, a) => s + (a.sitemap?.totalUrls || 0), 0) / (sorted.length || 1);
  const maxPages = Math.max(...sorted.map(a => a.sitemap?.totalUrls || 0));
  lines.push(`| Sayfa sayısı | 193 | ${maxPages || '-'} | ${Math.round(avgPages)} |`);
  lines.push(`| Blog sistemi | Haftada 2 otomatik | değişken | değişken |`);
  lines.push(`| AI/LLM desteği | ai.txt + llms.txt var | ? | ? |`);
  lines.push('');

  lines.push('## Detay — Sayfa Sayısına Göre Top 10', '');
  sorted.slice(0, 10).forEach((a, i) => {
    lines.push(`### ${i + 1}. ${a.domain}`);
    lines.push(`- **URL:** ${a.url}`);
    if (a.meta.title) lines.push(`- **Başlık:** ${a.meta.title}`);
    if (a.meta.description) lines.push(`- **Meta Desc:** ${a.meta.description.substring(0, 160)}...`);
    if (a.sitemap) {
      lines.push(`- **Sitemap URL'leri:** ${a.sitemap.totalUrls}`);
      lines.push(`- **Blog sıklığı:** ${a.sitemap.blogFrequency}`);
    }
    if (a.meta.wordCount) lines.push(`- **Anasayfa kelime sayısı:** ${a.meta.wordCount}`);
    if (a.errors.length) lines.push(`- **Uyarılar:** ${a.errors.join(', ')}`);
    lines.push('');
  });

  lines.push('## Aksiyon Önerileri', '');
  lines.push('- [ ] En çok sayfaya sahip rakibin konu kategorilerini incele');
  lines.push('- [ ] Blog sıklığı bizden fazla olan rakiplerin içerik stratejisine bak');
  lines.push('- [ ] Rakip yok olan anahtar kelimelerde pozisyon al');
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const db = JSON.parse(readFileSync(COMPETITORS_FILE, 'utf-8'));

  if (db.competitors.length === 0) {
    log('Rakip listesi boş. Önce competitor-discovery.mjs çalıştırın.');
    process.exit(0);
  }

  log(`${db.competitors.length} rakip analiz edilecek...`);

  const analyses = [];
  const BATCH = 5;
  for (let i = 0; i < db.competitors.length; i += BATCH) {
    const batch = db.competitors.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(c => analyzeCompetitor(c).catch(e => {
      warn(`${c.domain}: ${e.message}`);
      return { domain: c.domain, url: c.url, errors: [e.message], meta: {} };
    })));
    analyses.push(...results);
  }

  // Metrikleri db'ye kaydet
  for (const a of analyses) {
    const comp = db.competitors.find(c => c.domain === a.domain);
    if (comp) {
      comp.lastAnalyzed = a.timestamp;
      comp.metrics = {
        totalUrls: a.sitemap?.totalUrls,
        titleLen: a.meta.title?.length,
        wordCount: a.meta.wordCount,
      };
    }
  }
  writeFileSync(COMPETITORS_FILE, JSON.stringify(db, null, 2));

  // Rapor üret
  const report = generateReport(analyses, db);
  const reportFile = join(DATA_DIR, `competitor-report-${new Date().toISOString().slice(0, 7)}.md`);
  writeFileSync(reportFile, report);

  log(`Rapor: ${reportFile}`);
  console.log('\n--- RAPOR ÖZET ---\n');
  console.log(report.substring(0, 2000));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
