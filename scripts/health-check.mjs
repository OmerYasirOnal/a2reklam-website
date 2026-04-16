#!/usr/bin/env node
/**
 * Günlük Site Sağlık Kontrolü
 *
 * Kritik URL'lerin 200 döndüğünü, önemli redirect'lerin çalıştığını,
 * sitemap'in güncel olduğunu kontrol eder. Hata bulursa exit 1 verir
 * (GitHub Actions otomatik Issue açar).
 */

const CRITICAL_URLS = [
  { url: 'https://a2reklam.com/', expected: 200, name: 'Ana sayfa' },
  { url: 'https://a2reklam.com/hizmetler/', expected: 200, name: 'Hizmetler' },
  { url: 'https://a2reklam.com/istanbul-tabelaci/', expected: 200, name: 'Istanbul hub' },
  { url: 'https://a2reklam.com/sektorel/', expected: 200, name: 'Sektörel hub' },
  { url: 'https://a2reklam.com/blog/', expected: 200, name: 'Blog index' },
  { url: 'https://a2reklam.com/iletisim/', expected: 200, name: 'İletişim' },
  { url: 'https://a2reklam.com/hizmetler/isikli-tabela/', expected: 200, name: 'Işıklı tabela' },
  { url: 'https://a2reklam.com/hizmetler/paslanmaz-harfler/', expected: 200, name: 'Paslanmaz harf' },
  { url: 'https://a2reklam.com/kadikoy-tabelaci/', expected: 200, name: 'Kadıköy' },
  { url: 'https://a2reklam.com/besiktas-tabelaci/', expected: 200, name: 'Beşiktaş' },
  { url: 'https://a2reklam.com/sitemap-index.xml', expected: 200, name: 'Sitemap index' },
  { url: 'https://a2reklam.com/sitemap-0.xml', expected: 200, name: 'Sitemap-0' },
  { url: 'https://a2reklam.com/robots.txt', expected: 200, name: 'robots.txt' },
  { url: 'https://a2reklam.com/ai.txt', expected: 200, name: 'ai.txt' },
  { url: 'https://a2reklam.com/llms.txt', expected: 200, name: 'llms.txt' },
  // Redirect kontrolleri
  { url: 'https://a2reklam.com/hizmet-bolgeleri/', expected: 301, name: 'hizmet-bolgeleri redirect' },
  { url: 'https://a2reklam.com/en/', expected: 301, name: '/en/ redirect' },
  { url: 'https://a2reklam.com/kadikoy-tabela-tabelaci/', expected: 301, name: 'tabela-tabelaci redirect' },
];

async function checkUrl({ url, expected, name }) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(15000),
    });
    const ok = response.status === expected;
    return {
      name,
      url,
      status: response.status,
      expected,
      ok,
      error: null,
    };
  } catch (e) {
    return {
      name,
      url,
      status: 0,
      expected,
      ok: false,
      error: e.message,
    };
  }
}

async function main() {
  console.log(`\n=== A2 Reklam Sağlık Kontrolü ===`);
  console.log(`Tarih: ${new Date().toISOString()}`);
  console.log(`URL sayısı: ${CRITICAL_URLS.length}\n`);

  const results = await Promise.all(CRITICAL_URLS.map(checkUrl));

  const failed = results.filter(r => !r.ok);
  const succeeded = results.filter(r => r.ok);

  console.log(`\n--- Başarılı (${succeeded.length}) ---`);
  succeeded.forEach(r => {
    console.log(`  ✓ ${r.name}: ${r.status}`);
  });

  if (failed.length > 0) {
    console.log(`\n--- BAŞARISIZ (${failed.length}) ---`);
    failed.forEach(r => {
      console.log(`  ✗ ${r.name}: Beklenen ${r.expected}, alınan ${r.status}${r.error ? ` (${r.error})` : ''}`);
      console.log(`    URL: ${r.url}`);
    });
    console.log(`\n${failed.length} kritik sorun bulundu!`);
    process.exit(1);
  }

  console.log(`\nTüm URL'ler sağlıklı ✓\n`);
  process.exit(0);
}

main().catch(e => {
  console.error(`[FATAL] ${e.message}`);
  process.exit(1);
});
