#!/usr/bin/env node
/**
 * Rakip Keşif Scripti
 *
 * Gemini 2.5 Flash + Google Search grounding ile istanbul tabela sektöründeki
 * rakip firmaları tespit eder, competitors.json'a yazar.
 *
 * Env:
 *   GEMINI_API_KEY — Google AI Studio API key
 *
 * Kullanım:
 *   node scripts/competitor-discovery.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPETITORS_FILE = join(__dirname, 'data', 'competitors.json');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_CANDIDATES = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-latest'];
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

function log(msg) { console.log(`[Discovery] ${msg}`); }
function err(msg) { console.error(`[ERROR] ${msg}`); }

async function callGeminiWithSearch(model, prompt) {
  const url = `${API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    tools: [{ google_search: {} }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 4096,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`${response.status}: ${errText.substring(0, 200)}`);
  }

  const data = await response.json();
  if (!data.candidates?.[0]?.content) {
    throw new Error(`Geçersiz yanıt: ${JSON.stringify(data).substring(0, 200)}`);
  }

  // Tüm parts'ı birleştir
  const text = data.candidates[0].content.parts
    .map(p => p.text || '')
    .join('\n');

  // Grounding meta'da URL'leri çıkar (Gemini search chunks)
  const groundingUrls = [];
  const groundingMetadata = data.candidates[0].groundingMetadata;
  if (groundingMetadata?.groundingChunks) {
    for (const chunk of groundingMetadata.groundingChunks) {
      if (chunk.web?.uri) {
        try {
          const u = new URL(chunk.web.uri);
          groundingUrls.push({ url: chunk.web.uri, domain: u.hostname, title: chunk.web.title });
        } catch {}
      }
    }
  }

  return { text, groundingUrls };
}

function extractDomains(text, excludeList) {
  // Text'ten URL/domain çıkar
  const domains = new Set();
  const urlRegex = /https?:\/\/([a-z0-9.-]+\.[a-z]{2,}(?:\.[a-z]{2,})?)\/?/gi;
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    let domain = match[1].toLowerCase();
    if (domain.startsWith('www.')) domain = domain.slice(4);
    // Alt domain'leri ana domaine indir
    const parts = domain.split('.');
    if (parts.length > 2 && !['com.tr', 'net.tr', 'org.tr'].includes(parts.slice(-2).join('.'))) {
      domain = parts.slice(-2).join('.');
    }
    if (!excludeList.includes(domain)) {
      domains.add(domain);
    }
  }
  return Array.from(domains);
}

async function discoverWithKeyword(keyword, excludeList) {
  const prompt = `İstanbul'da "${keyword}" sektöründe faaliyet gösteren profesyonel tabela ve reklam imalat firmalarının web sitelerini araştır. Google arama yap.

KURAL:
- Sadece İstanbul'da faaliyet gösteren, tabela/reklam imalatı yapan firmaları listele
- Aracı/pazaryeri siteleri dahil etme (sahibinden, hepsiburada, vb.)
- Sosyal medya profillerini dahil etme (facebook, instagram, vb.)
- Wikipedia veya haber sitelerini dahil etme
- Sadece kendi domaini olan firma sitelerini listele

FORMAT:
Her firma için sadece tam web sitesi URL'sini ver, başka açıklama yapma.
Örnek:
https://tabelacik.com
https://reklam-istanbul.com.tr

En az 10, en fazla 20 rakip firma listele.`;

  for (const model of MODEL_CANDIDATES) {
    try {
      log(`Arama: "${keyword}" (model: ${model})`);
      const { text, groundingUrls } = await callGeminiWithSearch(model, prompt);
      const domainsFromText = extractDomains(text, excludeList);
      const domainsFromGrounding = groundingUrls
        .map(g => g.domain.replace(/^www\./, ''))
        .filter(d => !excludeList.includes(d));
      const allDomains = [...new Set([...domainsFromText, ...domainsFromGrounding])];
      log(`  ✓ ${allDomains.length} domain bulundu`);
      return allDomains;
    } catch (e) {
      log(`  Model başarısız (${model}): ${e.message.substring(0, 60)}`);
    }
  }
  throw new Error('Hiçbir model çalışmadı');
}

async function main() {
  if (!GEMINI_API_KEY) {
    err('GEMINI_API_KEY tanımlı değil!');
    process.exit(1);
  }

  const db = JSON.parse(readFileSync(COMPETITORS_FILE, 'utf-8'));
  const allFoundDomains = new Set();

  for (const keyword of db.seedKeywords) {
    try {
      const domains = await discoverWithKeyword(keyword, db.excludeList);
      domains.forEach(d => allFoundDomains.add(d));
      // Rate limit: 10s bekle (Gemini free tier)
      await new Promise(r => setTimeout(r, 10000));
    } catch (e) {
      err(`"${keyword}" için başarısız: ${e.message}`);
    }
  }

  // Mevcut competitors listesini güncelle (yeni bulunanları ekle, mevcutları koru)
  const existingDomains = new Set(db.competitors.map(c => c.domain));
  const newDomains = [...allFoundDomains].filter(d => !existingDomains.has(d));

  for (const domain of newDomains) {
    db.competitors.push({
      domain,
      url: `https://${domain}`,
      firstSeen: new Date().toISOString(),
      lastAnalyzed: null,
      metrics: null,
    });
  }

  db.lastUpdated = new Date().toISOString();
  writeFileSync(COMPETITORS_FILE, JSON.stringify(db, null, 2));

  log(`Toplam: ${db.competitors.length} rakip (${newDomains.length} yeni)`);
  log('Yeni eklenenler:');
  newDomains.slice(0, 20).forEach(d => console.log(`  + ${d}`));
}

main().catch(e => {
  err(e.message);
  process.exit(1);
});
