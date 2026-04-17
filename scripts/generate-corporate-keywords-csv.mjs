#!/usr/bin/env node
/**
 * Corporate Keyword CSV — AVM, Plaza, Hastane, Otel, Fabrika
 *
 * İter#11 long-tail CSV'si ilçe+hizmet'e odaklandı.
 * Bu CSV ise "kurumsal + hizmet" kombinelerini Isikli-LED, Kutu-Harf,
 * Dijital-Baski kampanyalarına ekler (Cephe-Totem'de zaten var).
 *
 * Hedef: AVM/plaza/fabrika/hastane/otel arayanları yakalamak.
 *
 * Çıktı: scripts/data/google-ads-corporate-keywords.csv
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'data', 'google-ads-corporate-keywords.csv');

const CORPORATES = ['avm', 'plaza', 'kurumsal', 'fabrika', 'hastane', 'otel', 'ofis', 'banka'];

// Kampanya + ad group + hizmet eşlemesi
const CAMPAIGNS = [
  {
    campaign: 'Isikli-Tabela-LED',
    group: 'Isikli-Tabela-Genel',
    services: ['isikli tabela', 'led tabela', 'lightbox tabela', 'led kutu harf', 'aydinlatmali tabela'],
  },
  {
    campaign: 'Kutu-Harf-Tabela',
    group: 'kutu-harf-genel',
    services: ['kutu harf', 'pleksi harf', 'paslanmaz harf', 'isikli harf'],
  },
  {
    campaign: 'Dijital-Baski-Arac-Giydirme',
    group: 'Dijital-Baski-genel',
    services: ['arac giydirme', 'arac kaplama', 'filo giydirme', 'dijital baski'],
  },
];

// Proven yüksek niyetli + sektörel jenerik
const EXTRA_CORPORATE = [
  // Cephe-Totem'e eklendi ama 3 kampanyaya da eklenebilir (kategori bazlı)
  { kw: 'avm tabela imalati',          match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'plaza tabela imalati',        match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'hastane yonlendirme sistemi', match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'otel tabela sistemi',         match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'fabrika cephe tabela',        match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'kurumsal kimlik tabela',      match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'magaza tabela fiyatlari',     match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'zincir magaza tabela',        match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'osb tabela imalati',          match: 'Phrase', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  // Isikli-LED özel
  { kw: 'avm led tabela',              match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel' },
  { kw: 'plaza led tabela',            match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel' },
  { kw: 'otel led cephe',              match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel' },
  { kw: 'kurumsal led tabela',         match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel' },
  { kw: 'ip65 led tabela',             match: 'Phrase', campaign: 'Isikli-Tabela-LED', group: 'Isikli-Tabela-Genel' },
  // Kutu-Harf özel
  { kw: 'avm kutu harf',               match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel' },
  { kw: 'plaza paslanmaz harf',        match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel' },
  { kw: 'kurumsal pleksi harf',        match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel' },
  { kw: 'pvd kapli harf',              match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel' },
  { kw: 'isikli kutu harf fiyat',      match: 'Phrase', campaign: 'Kutu-Harf-Tabela', group: 'kutu-harf-genel' },
  // Dijital-Baski / Arac özel
  { kw: 'kurumsal filo giydirme',      match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
  { kw: 'servis araci giydirme',       match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
  { kw: 'ticari arac kaplama',         match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
  { kw: 'minibus reklam kaplama',      match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
  { kw: 'orajet folyo uygulama',       match: 'Phrase', campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
];

// Negative keywords (shared library)
const NEGATIVES = [
  // Uzak/alakasız
  'ankara', 'izmir', 'bursa', 'antalya', 'konya', 'adana',
  // Ucuz arayışlar (kurumsal dönüşmez)
  'bedava', 'ucuz', 'cok ucuz', 'en ucuz',
  // Dışarıdan sahne
  'tabela nasil yapilir', 'tabela yapimi', 'kendim nasil', 'evde yapim',
  // İşçilik arayanlar
  'is ilanlari', 'tabelaci is', 'usta ariyor', 'isci',
  // Eğitim
  'tabela tasarimi ders', 'egitim', 'kurs',
  // Şablon / template
  'sablon', 'template', 'vektorel', 'hazir tasarim',
];

function esc(s) {
  const str = String(s ?? '');
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

// === Keywords CSV ===
const kwHeader = 'Action,Campaign,Ad group,Keyword,Match type,Status,Notes';
const kwRows = [kwHeader];

// 1) 8 corporate token × 5 Isikli-LED hizmet = 40
// 2) 8 × 4 Kutu-Harf = 32
// 3) 8 × 4 Dijital-Baski = 32
// Toplam ~104 systematic kombinasyon
for (const c of CORPORATES) {
  for (const camp of CAMPAIGNS) {
    for (const svc of camp.services) {
      kwRows.push([
        'Add', camp.campaign, camp.group,
        `${c} ${svc}`, 'Phrase', 'Enabled',
        `corporate+${svc}`,
      ].map(esc).join(','));
    }
  }
}

// Extra proven corporate keywords
for (const k of EXTRA_CORPORATE) {
  kwRows.push([
    'Add', k.campaign, k.group, k.kw, k.match, 'Enabled',
    'İter#16 kurumsal altın',
  ].map(esc).join(','));
}

writeFileSync(OUT, kwRows.join('\n'));

// === Negatives CSV ===
const negHeader = 'Action,Campaign,Negative keyword,Match type';
const negRows = [negHeader];
for (const camp of CAMPAIGNS) {
  for (const n of NEGATIVES) {
    negRows.push(['Add', camp.campaign, n, 'Broad'].map(esc).join(','));
  }
}
// Cephe-Totem için de
for (const n of NEGATIVES) {
  negRows.push(['Add', 'Cephe-Totem-Genel', n, 'Broad'].map(esc).join(','));
}

writeFileSync(join(__dirname, 'data', 'google-ads-negatives-import.csv'), negRows.join('\n'));

const systematicCount = CORPORATES.length * CAMPAIGNS.reduce((s, c) => s + c.services.length, 0);

console.log('[CorpKW] Keywords CSV üretildi:', OUT);
console.log(`  Systematic corporate × service: ${systematicCount}`);
console.log(`  Extra proven: ${EXTRA_CORPORATE.length}`);
console.log(`  Toplam: ${kwRows.length - 1} satır`);
console.log('');
console.log('[Negatives] CSV üretildi:', join(__dirname, 'data', 'google-ads-negatives-import.csv'));
console.log(`  Toplam: ${negRows.length - 1} satır (${NEGATIVES.length} × 4 kampanya)`);
