#!/usr/bin/env node
/**
 * Corporate Keywords + Negatives CSV (v2 — 2026-04-17 iter#22)
 *
 * v1: 104 systematic corporate × service = sis bulutu
 * v2: Proven / yuksek-niyet kombinasyonlar + akilli negatif genisletme
 *
 * Ciktilar:
 *   scripts/data/google-ads-corporate-keywords.csv
 *   scripts/data/google-ads-negatives-import.csv
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');

// ============================================================
// KURUMSAL KEYWORDS — 3 kampanyaya yayilir (Cephe-Totem zaten cekirdekte tutuyor)
// ============================================================

// Kisitli kurumsal token seti — fazla genisletme dusuk CTR getirir
const CORPORATE_TOKENS = ['avm', 'plaza', 'kurumsal', 'fabrika', 'hastane', 'otel'];

// Kampanya bazli yuksek-niyetli hizmet
const CAMPAIGN_SERVICES = {
  'Isikli-Tabela-LED': {
    group: 'Isikli-Tabela-Genel',
    services: ['isikli tabela', 'led tabela', 'led kutu harf'],
  },
  'Kutu-Harf-Tabela': {
    group: 'kutu-harf-genel',
    services: ['kutu harf', 'paslanmaz harf'],
  },
  'Dijital-Baski-Arac-Giydirme': {
    group: 'Dijital-Baski-genel',
    services: ['filo giydirme', 'arac kaplama'],
  },
};

// Extra proven kurumsal altin kelimeler (Cephe-Totem'e yonlendir)
const PROVEN_CORPORATE = [
  { kw: 'avm tabela imalati',          campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'plaza tabela imalati',        campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'hastane yonlendirme sistemi', campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'otel tabela sistemi',         campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'fabrika cephe tabela',        campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'kurumsal kimlik tabela',      campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'zincir magaza tabela',        campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  { kw: 'osb tabela imalati',          campaign: 'Cephe-Totem-Genel', group: 'cephe-totem-genel' },
  // Kampanya-ozel
  { kw: 'kurumsal led tabela',   campaign: 'Isikli-Tabela-LED',           group: 'Isikli-Tabela-Genel' },
  { kw: 'ip65 led tabela',       campaign: 'Isikli-Tabela-LED',           group: 'Isikli-Tabela-Genel' },
  { kw: 'otel led cephe',        campaign: 'Isikli-Tabela-LED',           group: 'Isikli-Tabela-Genel' },
  { kw: 'kurumsal pleksi harf',  campaign: 'Kutu-Harf-Tabela',            group: 'kutu-harf-genel' },
  { kw: 'plaza paslanmaz harf',  campaign: 'Kutu-Harf-Tabela',            group: 'kutu-harf-genel' },
  { kw: 'kurumsal filo giydirme',campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
  { kw: 'minibus reklam kaplama',campaign: 'Dijital-Baski-Arac-Giydirme', group: 'Dijital-Baski-genel' },
];

// ============================================================
// NEGATIVE LIST — 4 kampanyada da aktif (hesap seviyesinde uygulanabilir)
// ============================================================
const NEGATIVES = [
  // ---- 1) COGRAFYA: Istanbul disi 80 il (kampanyalar Istanbul'a targetli olmali
  //         ama coop sorgular cikabiliyor: "ankara tabela" vs)
  'ankara', 'izmir', 'bursa', 'antalya', 'konya', 'adana', 'gaziantep',
  'mersin', 'kayseri', 'eskisehir', 'samsun', 'trabzon', 'diyarbakir',
  'sanliurfa', 'malatya', 'erzurum', 'kocaeli', 'sakarya', 'manisa',
  'hatay', 'balikesir', 'denizli', 'van', 'tekirdag', 'aydin', 'mugla',
  'afyon', 'isparta', 'corum', 'tokat', 'ordu', 'giresun', 'rize',
  'kirikkale', 'batman', 'kahramanmaras',
  // Yurt disi
  'almanya', 'londra', 'dubai', 'azerbaycan', 'kktc',

  // ---- 2) RAKIP MARKA NEGATIFI (Iter#3 Auction Insights)
  'armut', 'armut com', 'armut teklif',
  'eraytabela', 'eray tabela',
  'cebireklam', 'cebi reklam',
  '3mreklam', '3m reklam',
  'protabela', 'pro tabela',
  'dogauneon', 'doga uneon',
  'brdreklam', 'brd reklam', 'brdreklamtabela',
  'evok reklam',
  'neuneon', 'neu neon',
  'artastabela', 'artas tabela',
  'eymenreklam', 'eymen reklam',

  // ---- 3) DIY / KENDIM YAPARIM (B2C dusuk niyet)
  'nasil yapilir', 'nasil yapabilirim', 'evde yapim', 'kendim yapim',
  'el yapimi', 'ev tipi', 'tabela yapimi evde',

  // ---- 4) IS ARAYANLAR (zero intent)
  'is ilanlari', 'is ilani', 'tabelaci is', 'tabela is', 'tabela ustasi ariyor',
  'usta ariyor', 'eleman ariyor', 'personel ariyor', 'isci', 'isci ariyor',
  'kalfa', 'cirak', 'staj', 'stajyer',

  // ---- 5) EGITIM / AKADEMIK
  'tabela tasarimi ders', 'tabela dersi', 'egitim', 'egitimi', 'kurs',
  'sablon', 'template', 'vektorel', 'hazir tasarim',
  'online tasarim', 'tabela tasarla', 'tabela tasarim programi',
  'odev', 'tez', 'proje odev', 'ogrenci', 'universite',

  // ---- 6) E-TICARET / PAZARYERI (perakende satici, B2B degil)
  'hepsiburada', 'trendyol', 'n11', 'amazon', 'sahibinden',
  'pazarama', 'gittigidiyor',

  // ---- 7) FIYAT ARAYICISI / SATICI KIMLIGI
  'bedava', 'ucretsiz tabela', 'ucuz', 'cok ucuz', 'en ucuz',
  'ikinci el', '2 el', 'eski tabela', 'sifir tabela',
  'toptan', 'toptan satis', 'tedarikci', 'bayi', 'distribütör',
  'malzeme satis', 'malzemesi nereden', 'nereden alabilirim',

  // ---- 8) ALAKASIZ / YANLIS ANLAMI
  'dijital pano', 'reklam ajansi', 'sosyal medya', 'instagram reklam',
  'reklam filmi', 'tv reklam', 'radyo reklam',
  'yol tabelasi', 'trafik tabelasi', 'trafik isareti', 'uyari tabelasi',
  'adres tabelasi', 'ev adresi',
  'mezar tasi', 'nikah sekeri',
];

// ============================================================
// CSV YAZIM
// ============================================================
function esc(s) {
  const str = String(s ?? '');
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

// === Keywords CSV ===
const kwHeader = 'Action,Campaign,Ad group,Keyword,Match type,Status,Notes';
const kwRows = [kwHeader];

// Systematic kurumsal × hizmet (phrase match)
for (const token of CORPORATE_TOKENS) {
  for (const [campaign, cfg] of Object.entries(CAMPAIGN_SERVICES)) {
    for (const svc of cfg.services) {
      kwRows.push([
        'Add', campaign, cfg.group,
        `"${token} ${svc}"`, 'Phrase', 'Enabled',
        `corporate+${svc}`,
      ].map(esc).join(','));
    }
  }
}

// Proven corporate (manual kalite)
for (const k of PROVEN_CORPORATE) {
  kwRows.push([
    'Add', k.campaign, k.group, `"${k.kw}"`, 'Phrase', 'Enabled',
    'Iter#22 proven kurumsal',
  ].map(esc).join(','));
}

writeFileSync(join(DATA_DIR, 'google-ads-corporate-keywords.csv'), kwRows.join('\n'));

// === Negatives CSV ===
const negHeader = 'Action,Campaign,Negative keyword,Match type';
const negRows = [negHeader];
const ALL_CAMPAIGNS = [
  'Cephe-Totem-Genel',
  'Isikli-Tabela-LED',
  'Kutu-Harf-Tabela',
  'Dijital-Baski-Arac-Giydirme',
];
for (const camp of ALL_CAMPAIGNS) {
  for (const n of NEGATIVES) {
    negRows.push(['Add', camp, n, 'Phrase'].map(esc).join(','));
  }
}
writeFileSync(join(DATA_DIR, 'google-ads-negatives-import.csv'), negRows.join('\n'));

// Ozet
const systematicCount = CORPORATE_TOKENS.length * Object.values(CAMPAIGN_SERVICES).reduce((s, c) => s + c.services.length, 0);
console.log('[CorpKW v2] Corporate keywords CSV:');
console.log(`  Systematic (phrase): ${systematicCount} (${CORPORATE_TOKENS.length} token × ${Object.values(CAMPAIGN_SERVICES).reduce((s, c) => s + c.services.length, 0)} hizmet)`);
console.log(`  Proven: ${PROVEN_CORPORATE.length}`);
console.log(`  Toplam: ${kwRows.length - 1} satir`);
console.log('');
console.log('[Negatives v2] Genisletilmis negatif liste:');
console.log(`  Kelime sayisi: ${NEGATIVES.length} × ${ALL_CAMPAIGNS.length} kampanya = ${negRows.length - 1} satir`);
console.log(`  Kategori: sehir(41) + rakip(22) + diy(7) + is(14) + egitim(14) + ticari(7) + fiyat(17) + alakasiz(13)`);
console.log('');
console.log('Import (once negatifleri yukle, sonra kurumsal keywords):');
console.log('  1. google-ads-negatives-import.csv');
console.log('  2. google-ads-corporate-keywords.csv');
