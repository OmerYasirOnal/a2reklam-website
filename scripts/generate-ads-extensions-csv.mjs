#!/usr/bin/env node
/**
 * Google Ads Editor — Ad Extensions CSV Generator
 *
 * ads-copy-kit.md içindeki 8 Sitelink + 20 Callout + 3 Structured Snippet
 * verilerini tüm kampanyalara uygulanabilir CSV formatında üretir.
 *
 * Çıktılar:
 *   scripts/data/google-ads-sitelinks.csv
 *   scripts/data/google-ads-callouts.csv
 *   scripts/data/google-ads-snippets.csv
 *
 * Kullanım:
 *   node scripts/generate-ads-extensions-csv.mjs
 *
 * Import:
 *   Google Ads Editor → Account → File → Import → Choose CSV
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');

const CAMPAIGNS = [
  'Cephe-Totem-Genel',
  'Isikli-Tabela-LED',
  'Kutu-Harf-Tabela',
  'Dijital-Baski-Arac-Giydirme',
];

const SITELINKS = [
  { title: 'Kurumsal Tabela Çözümleri', desc1: 'AVM, plaza, hastane, otel', desc2: '2.500+ proje, 5 yıldız', url: 'https://a2reklam.com/kurumsal-tabela/' },
  { title: 'Tüm Hizmetlerimiz',          desc1: '16 farklı tabela hizmeti', desc2: 'Cephe, kutu harf, LED', url: 'https://a2reklam.com/hizmetler/' },
  { title: 'Referanslarımız',            desc1: '2.500+ tamamlanmış proje', desc2: 'Kurumsal portföy',     url: 'https://a2reklam.com/referans/' },
  { title: 'Ücretsiz Keşif Al',          desc1: 'Sahada ölçüm + 3D tasarım', desc2: 'Aynı gün teklif',      url: 'https://a2reklam.com/iletisim/' },
  { title: 'İstanbul 39 İlçe',           desc1: 'Tüm ilçelerde montaj',      desc2: 'Hızlı teslim',         url: 'https://a2reklam.com/istanbul-tabelaci/' },
  { title: 'Sektörel Çözümler',          desc1: '20 sektör için özel',       desc2: 'Restoran, AVM, plaza', url: 'https://a2reklam.com/sektorel/' },
  { title: 'Blog & Rehber',              desc1: 'Tabela yönetmeliği',        desc2: '80+ rehber içerik',    url: 'https://a2reklam.com/blog/' },
  { title: 'Galeri & Projeler',          desc1: '2.500+ gerçek proje',       desc2: 'Video + foto',         url: 'https://a2reklam.com/galeri/' },
];

const CALLOUTS = [
  "2005'ten Beri Kurumsal",
  '2.500+ Tamamlanmış Proje',
  '⭐ 5.0 / 90 Google Yorum',
  'Ücretsiz Keşif + 3D',
  'Aynı Gün Hızlı Teklif',
  'Aracısız Fabrika Fiyatı',
  'Uygun Fiyat Garantisi',
  '2 Yıl Tam Garanti',
  'IP65 Sertifikalı LED',
  'PVD Kaplama Seçeneği',
  'CNC Lazer Hassas Kesim',
  'AVM Projeleri (50+)',
  'Plaza & İş Merkezi',
  'Hastane Yönlendirme',
  'Otel Tabela Sistemleri',
  'Fabrika & OSB Uzmanı',
  'İstanbul 39 İlçeye',
  'Kendi Atölyemiz',
  'Sertifikalı Montaj',
  'Periyodik Bakım Dahil',
];

const SNIPPETS = [
  {
    header: 'Services',
    values: [
      'Cephe Tabela', 'Kutu Harf', 'LED Işıklı Tabela', 'Totem Tabela',
      'Paslanmaz Harf', 'Araç Giydirme', 'Dijital Baskı', 'Yönlendirme Sistemleri',
    ],
  },
  {
    header: 'Brands',
    values: [
      'AVM & Alışveriş Merkezi', 'Plaza & İş Merkezi', 'Hastane & Sağlık',
      'Otel & Turizm', 'Fabrika & Sanayi', 'Okul & Kampüs',
      'Restoran & Kafe', 'Banka & Finans',
    ],
  },
  {
    header: 'Neighborhoods',
    values: [
      'Kâğıthane', 'Şişli', 'Beşiktaş', 'Kadıköy',
      'Beylikdüzü', 'Esenyurt', 'Başakşehir', 'Ümraniye',
    ],
  },
];

function esc(s) {
  if (!s) return '';
  const str = String(s);
  return str.includes(',') || str.includes('"') || str.includes('\n')
    ? `"${str.replace(/"/g, '""')}"`
    : str;
}

// === SITELINKS ===
// Format: Action, Campaign, Sitelink text, Description line 1, Description line 2, Final URL
const sitelinkRows = ['Action,Campaign,Sitelink text,Description line 1,Description line 2,Final URL'];
for (const camp of CAMPAIGNS) {
  for (const sl of SITELINKS) {
    sitelinkRows.push(['Add', camp, sl.title, sl.desc1, sl.desc2, sl.url].map(esc).join(','));
  }
}
writeFileSync(join(DATA_DIR, 'google-ads-sitelinks.csv'), sitelinkRows.join('\n'));

// === CALLOUTS ===
// Format: Action, Campaign, Callout text
const calloutRows = ['Action,Campaign,Callout text'];
for (const camp of CAMPAIGNS) {
  for (const c of CALLOUTS) {
    calloutRows.push(['Add', camp, c].map(esc).join(','));
  }
}
writeFileSync(join(DATA_DIR, 'google-ads-callouts.csv'), calloutRows.join('\n'));

// === STRUCTURED SNIPPETS ===
// Format: Action, Campaign, Header, Values
const snippetRows = ['Action,Campaign,Header,Values'];
for (const camp of CAMPAIGNS) {
  for (const sn of SNIPPETS) {
    snippetRows.push(['Add', camp, sn.header, sn.values.join(';')].map(esc).join(','));
  }
}
writeFileSync(join(DATA_DIR, 'google-ads-snippets.csv'), snippetRows.join('\n'));

console.log('[AdsExt] 3 CSV üretildi:');
console.log(`  Sitelinks: ${sitelinkRows.length - 1} satır (${CAMPAIGNS.length} kampanya × ${SITELINKS.length} sitelink)`);
console.log(`  Callouts: ${calloutRows.length - 1} satır (${CAMPAIGNS.length} × ${CALLOUTS.length})`);
console.log(`  Snippets: ${snippetRows.length - 1} satır (${CAMPAIGNS.length} × ${SNIPPETS.length} header × values)`);
console.log('');
console.log('Import:');
console.log('  1. Google Ads Editor aç');
console.log('  2. Account → File → Import → Multiple files');
console.log('  3. 3 CSV\'yi seç → Preview → Post');
