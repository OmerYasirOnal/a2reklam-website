#!/usr/bin/env node
/**
 * Content Gap Analizi
 *
 * Rakip sitelerin sitemap'lerini tarar, kendi blog'umuzda olmayan konuları tespit eder,
 * blog-topic-queue.json'a yeni konular olarak ekler. Gemini ile konu başlığı üretir.
 *
 * Bu script'in amacı: rakiplerin yazdığı ama bizim yazmadığımız konularda pozisyon almak.
 *
 * Env:
 *   GEMINI_API_KEY
 *
 * Kullanım:
 *   node scripts/content-gap-analysis.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPETITORS_FILE = join(__dirname, 'data', 'competitors.json');
const QUEUE_FILE = join(__dirname, 'data', 'blog-topic-queue.json');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_CANDIDATES = ['gemini-2.5-flash', 'gemini-2.0-flash'];
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const TIMEOUT_MS = 15000;
const USER_AGENT = 'Mozilla/5.0 (compatible; A2ReklamBot/1.0)';

function log(msg) { console.log(`[ContentGap] ${msg}`); }

async function fetchText(url) {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: 'follow',
    });
    if (!r.ok) return null;
    return await r.text();
  } catch { return null; }
}

async function extractCompetitorUrls(competitor) {
  const candidates = [
    `${competitor.url}/sitemap-index.xml`,
    `${competitor.url}/sitemap.xml`,
  ];
  const urls = [];
  for (const c of candidates) {
    const xml = await fetchText(c);
    if (!xml) continue;
    if (xml.includes('<sitemapindex')) {
      const subs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map(m => m[1])
        .filter(u => u.includes('sitemap'))
        .slice(0, 3);
      for (const sub of subs) {
        const subXml = await fetchText(sub);
        if (subXml) {
          urls.push(...[...subXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
        }
      }
    } else {
      urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
    }
    if (urls.length > 0) break;
  }
  return urls;
}

function extractSlugFromUrl(url) {
  try {
    const u = new URL(url);
    return u.pathname
      .replace(/^\/+|\/+$/g, '')
      .split('/')
      .pop()
      ?.replace(/\.html?$/, '') || '';
  } catch { return ''; }
}

function isBlogLikeUrl(url) {
  try {
    const u = new URL(url);
    const path = u.pathname.toLowerCase();
    // Blog, makale, rehber patterns
    return /\/(blog|makale|haber|icerik|rehber|guide|yazi|article)s?\//.test(path)
      && path.length > 20
      && !path.endsWith('/blog/')
      && !path.endsWith('/blog');
  } catch { return false; }
}

async function extractTopicsWithGemini(slugs) {
  const prompt = `Aşağıdaki URL slug listesi rakip tabela firmalarının blog yazılarına ait. Bu slug'lardan profesyonel Türkçe blog yazısı başlıkları türet.

SLUG LİSTESİ:
${slugs.slice(0, 50).join('\n')}

KURAL:
- Her slug için doğal, Türkçe, SEO odaklı bir blog başlığı üret
- Tabela/reklam sektörüyle ilgili olanları koru, ilgisizleri ÇIKAR
- Genel konular kabul edilmez (ör. "hakkımızda", "iletişim")
- Sadece içerik makaleleri

FORMAT (her satır):
slug|Başlık

Örnek:
led-tabela-fiyatlari-2024|LED Tabela Fiyatları 2024: Detaylı Rehber

SADECE bu formatta yanıt ver, açıklama yapma.`;

  for (const model of MODEL_CANDIDATES) {
    try {
      const url = `${API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 4096 },
        }),
      });
      if (!r.ok) continue;
      const data = await r.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) continue;
      return text
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.includes('|'))
        .map(l => {
          const [slug, title] = l.split('|').map(s => s.trim());
          return { slug, title };
        })
        .filter(t => t.slug && t.title && t.slug.length > 3);
    } catch { continue; }
  }
  return [];
}

async function main() {
  if (!GEMINI_API_KEY) {
    console.error('[ERROR] GEMINI_API_KEY yok');
    process.exit(1);
  }

  const competitors = JSON.parse(readFileSync(COMPETITORS_FILE, 'utf-8'));
  const queue = JSON.parse(readFileSync(QUEUE_FILE, 'utf-8'));

  log(`${competitors.competitors.length} rakip taranacak...`);

  const allBlogSlugs = new Set();
  for (const comp of competitors.competitors.slice(0, 15)) {
    try {
      const urls = await extractCompetitorUrls(comp);
      const blogUrls = urls.filter(isBlogLikeUrl);
      for (const u of blogUrls) {
        const slug = extractSlugFromUrl(u);
        if (slug && slug.length > 5 && slug.length < 100) {
          allBlogSlugs.add(slug);
        }
      }
      log(`  ${comp.domain}: ${blogUrls.length} blog URL bulundu`);
    } catch (e) {
      log(`  ${comp.domain}: hata`);
    }
  }

  // Mevcut bloglardaki slug'lar
  const existingSlugs = new Set([
    ...queue.topics.map(t => t.slug),
    ...queue.used,
  ]);

  // Yeni slug'lar (ilk 100 eşsiz)
  const newSlugs = [...allBlogSlugs]
    .filter(s => !existingSlugs.has(s))
    .filter(s => !queue.topics.some(t => slugsSimilar(t.slug, s)))
    .slice(0, 50);

  log(`Yeni bulunan slug: ${newSlugs.length}`);

  if (newSlugs.length === 0) {
    log('Yeni konu bulunamadı. Mevcut havuz yeterli.');
    return;
  }

  // Gemini ile başlık üret
  const topics = await extractTopicsWithGemini(newSlugs);
  log(`Gemini ile ${topics.length} başlık üretildi`);

  if (topics.length === 0) {
    log('Gemini uygun konu üretmedi.');
    return;
  }

  // Queue'a ekle
  const newTopics = topics
    .filter(t => !existingSlugs.has(t.slug))
    .slice(0, 20)
    .map((t, i) => ({
      slug: `gap-${t.slug}`.substring(0, 80),
      title: t.title,
      description: `${t.title} — İstanbul'da profesyonel tabela ve reklam çözümleri için detaylı rehber.`,
      service: 'Özel İmalat',
      district: 'İstanbul',
      tags: ['Rehber', '2026'],
      heroImage: '/assets/img/isikli-isiksiz-tabelalar/a2reklam-isikli-isiksiz-tabelalar-001-960.webp',
      source: 'content-gap',
    }));

  queue.topics.push(...newTopics);
  queue.lastGapAnalysis = new Date().toISOString();
  writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));

  log(`${newTopics.length} yeni konu blog queue'ya eklendi`);
  newTopics.forEach(t => console.log(`  + ${t.title}`));
}

function slugsSimilar(a, b) {
  const na = a.toLowerCase().replace(/[-_\s]/g, '');
  const nb = b.toLowerCase().replace(/[-_\s]/g, '');
  return na === nb || na.includes(nb) || nb.includes(na);
}

main().catch(e => { console.error(e); process.exit(1); });
