#!/usr/bin/env node
/**
 * Otomatik Blog Üretim Scripti (Google Gemini API)
 *
 * scripts/data/blog-topic-queue.json'dan kullanılmamış bir konu seçer,
 * Gemini 1.5 Flash ile Türkçe blog yazısı üretir,
 * src/content/blog/{slug}.md olarak kaydeder.
 *
 * Env:
 *   GEMINI_API_KEY — Google AI Studio'dan alınan API key (zorunlu)
 *
 * Kullanım:
 *   node scripts/generate-blog.mjs                # 1 yazı üret
 *   node scripts/generate-blog.mjs --dry-run     # Sadece konuyu göster
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const QUEUE_FILE = join(__dirname, 'data', 'blog-topic-queue.json');
const BLOG_DIR = join(PROJECT_DIR, 'src', 'content', 'blog');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Birden fazla model dene (eskiden yeniye) — bazıları deprecate olabilir
const MODEL_CANDIDATES = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-001',
  'gemini-1.5-flash-latest',
];
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const DRY_RUN = process.argv.includes('--dry-run');

const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const NC = '\x1b[0m';

function log(msg) { console.log(`${GREEN}[BlogGen]${NC} ${msg}`); }
function warn(msg) { console.log(`${YELLOW}[WARN]${NC} ${msg}`); }
function err(msg) { console.error(`${RED}[ERROR]${NC} ${msg}`); }

function pickNextTopic(queue) {
  const available = queue.topics.filter(t => !queue.used.includes(t.slug));
  if (available.length === 0) {
    warn('Tüm konular kullanılmış, used havuzu sıfırlanıyor.');
    queue.used = [];
    return queue.topics[0];
  }
  // Rastgele bir konu seç — pattern'i biraz kır
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

function buildPrompt(topic) {
  return `Sen İstanbul merkezli A2 Reklam tabela firması için SEO blog yazarı olan profesyonel bir içerik üreticisin. Firma 2005'ten beri faaliyet gösteriyor, İstanbul'un 39 ilçesinde hizmet veriyor.

Aşağıdaki konu için profesyonel, özgün, 1200-1800 kelimelik Türkçe bir blog yazısı üret:

KONU: ${topic.title}
AÇIKLAMA: ${topic.description}
HİZMET: ${topic.service}
İLÇE/BÖLGE: ${topic.district}

FORMAT KURALLARI:
1. SADECE markdown yaz, başka hiçbir açıklama yapma.
2. Yazı aşağıdaki YAPIDA olmalı (başlıklar Türkçe):

## TL;DR
- (4 madde, her biri 1-2 cümle, en kritik noktalar)

## ${topic.service} Nedir ve Neden Önemlidir?
(2-3 paragraf, konuya giriş)

## ${topic.district ? topic.district + " Bölgesi için Özel Değerlendirme" : "Bölgesel Değerlendirme"}
(2-3 paragraf, yerel veya bölgesel özellikler)

### Kontrol Listesi
- (5 madde, somut ve uygulanabilir)

## Tasarım ve Görünürlük Kriterleri
(2-3 paragraf, teknik detaylar)

## Malzeme Seçimi ve Dayanıklılık
(2-3 paragraf, malzeme alternatifleri)

## Montaj ve Uygulama Süreci
(2-3 paragraf, süreç adımları)

## Bakım ve Uzun Ömürlü Kullanım
(2-3 paragraf, periyodik bakım)

## Maliyet ve Bütçe Planlaması
(2-3 paragraf, fiyatı etkileyen faktörler)

## Sonuç ve Öneriler
(1-2 paragraf, özet ve CTA — "A2 Reklam ile iletişime geçin" gibi)

KURALLAR:
- TÜM yazı Türkçe olsun, doğal ve akıcı olsun.
- Asla "Ben bir yapay zekayım" veya benzer ifadeler kullanma.
- Profesyonel ve bilgilendirici ton kullan.
- Yerel SEO için "İstanbul" ve "${topic.district}" kelimelerini doğal geçiş yerlerinde kullan.
- İç linkler için YAZMA, sadece düz metin.
- Tekrarsız, özgün içerik üret.
- Başlık kullanımı: sadece ## (h2) ve ### (h3), başka header level kullanma.
- Bold için **metin** kullan, italic kullanma.

SADECE markdown içeriğini döndür. İlk satır "## TL;DR" olmalı. YAML frontmatter YAZMA — onu ben ekleyeceğim.`;
}

async function callGeminiModel(model, prompt) {
  const url = `${API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        topP: 0.95,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`${response.status}: ${errText}`);
  }

  const data = await response.json();
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    throw new Error(`Geçersiz yanıt: ${JSON.stringify(data)}`);
  }
  return data.candidates[0].content.parts[0].text.trim();
}

async function callGemini(prompt) {
  // Model fallback — ilki çalışmazsa sırayla dene
  let lastError;
  for (const model of MODEL_CANDIDATES) {
    try {
      log(`Model denenyor: ${model}`);
      const result = await callGeminiModel(model, prompt);
      log(`✓ Model çalıştı: ${model}`);
      return result;
    } catch (e) {
      warn(`  Başarısız (${model}): ${e.message.substring(0, 80)}`);
      lastError = e;
    }
  }
  throw new Error(`Tüm modeller başarısız oldu. Son hata: ${lastError?.message}`);
}

function generateFAQ(topic) {
  // Her blog için 5 genel SSS üret (FAQ schema için)
  const faq = [
    {
      question: `${topic.service} için ideal boyut nasıl belirlenir?`,
      answer: `Keşif sırasında cephe ölçüsü, görünürlük mesafesi ve marka kimliği birlikte değerlendirilir. ${topic.district} bölgesinin yerel yönetim kriterleri de dikkate alınır.`,
    },
    {
      question: `${topic.title.split(':')[0]} projesi ortalama kaç gün sürer?`,
      answer: `Keşif, tasarım, üretim ve montaj süreçlerine bağlı olarak 7-20 gün aralığı tipiktir. Acil projelerde hızlandırılmış teslim seçeneği sunulabilir.`,
    },
    {
      question: `${topic.district} için belediye izni gerekli mi?`,
      answer: `İstanbul'un birçok ilçesinde dış cephe tabelası için ilan-reklam vergisi ve belediye izni gerekir. Süreç ilçeye göre değişir, A2 Reklam ekibi yönlendirme yapar.`,
    },
    {
      question: `Hangi malzeme ${topic.service} için daha uygundur?`,
      answer: `Dış ortamda paslanmaz çelik, kompozit panel ve UV dayanımlı kaplamalar öne çıkar. Seçim bütçe, estetik hedef ve kullanım ortamına göre yapılır.`,
    },
    {
      question: `Bakım ve garanti kapsamı nedir?`,
      answer: `Malzeme ve işçilik hataları genellikle garanti kapsamındadır. Periyodik bakım önerileri tasarım aşamasında paylaşılır; LED ve elektrik ekipmanları için ayrı garanti koşulları uygulanır.`,
    },
  ];
  return faq;
}

function buildFrontmatter(topic, faq) {
  const today = new Date().toISOString().split('T')[0];
  const yaml = [
    '---',
    `title: "${topic.title.replace(/"/g, '\\"')}"`,
    `description: "${topic.description.replace(/"/g, '\\"')}"`,
    `pubDate: "${today}"`,
    `updatedDate: "${today}"`,
    `tags: [${topic.tags.map(t => `"${t}"`).join(', ')}]`,
    `heroImage: "${topic.heroImage}"`,
    `author: "A2 Reklam Ekibi"`,
    'faq:',
    ...faq.flatMap(q => [
      `  - question: "${q.question.replace(/"/g, '\\"')}"`,
      `    answer: "${q.answer.replace(/"/g, '\\"')}"`,
    ]),
    '---',
    '',
  ];
  return yaml.join('\n');
}

function cleanMarkdown(md) {
  // Gemini bazen ```markdown code fence ekleyebilir
  md = md.replace(/^```(?:markdown)?\s*\n/, '').replace(/\n```\s*$/, '');
  // Fazla boşlukları temizle
  md = md.replace(/\n{3,}/g, '\n\n');
  // H1 varsa H2'ye indir (frontmatter title zaten var)
  md = md.replace(/^# (.+)$/gm, '## $1');
  return md.trim();
}

async function main() {
  log('Blog üretim süreci başlatılıyor...');

  if (!GEMINI_API_KEY) {
    err('GEMINI_API_KEY environment variable tanımlı değil!');
    err('Google AI Studio: https://aistudio.google.com/app/apikey');
    process.exit(1);
  }

  if (!existsSync(QUEUE_FILE)) {
    err(`Konu havuzu bulunamadı: ${QUEUE_FILE}`);
    process.exit(1);
  }

  const queue = JSON.parse(readFileSync(QUEUE_FILE, 'utf-8'));
  const topic = pickNextTopic(queue);

  log(`Seçilen konu: ${CYAN}${topic.title}${NC}`);
  log(`Slug: ${topic.slug}`);

  const outputPath = join(BLOG_DIR, `${topic.slug}.md`);
  if (existsSync(outputPath)) {
    warn(`Zaten var, atlanıyor: ${outputPath}`);
    // Yine de used'a ekle
    queue.used.push(topic.slug);
    writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
    return;
  }

  if (DRY_RUN) {
    log(`[DRY RUN] Konu: ${topic.title}`);
    log(`[DRY RUN] Çıktı: ${outputPath}`);
    return;
  }

  const prompt = buildPrompt(topic);
  log('Gemini API çağrılıyor (bu ~20-40 saniye sürebilir)...');

  let markdown;
  try {
    markdown = await callGemini(prompt);
  } catch (e) {
    err(`Gemini hatası: ${e.message}`);
    process.exit(1);
  }

  log(`Yanıt alındı: ${markdown.length} karakter`);

  const faq = generateFAQ(topic);
  const frontmatter = buildFrontmatter(topic, faq);
  const cleanedMd = cleanMarkdown(markdown);
  const fullContent = frontmatter + cleanedMd + '\n';

  writeFileSync(outputPath, fullContent);
  log(`✓ Yazıldı: ${CYAN}${outputPath}${NC}`);

  // Konu havuzunu güncelle
  queue.used.push(topic.slug);
  queue.lastGenerated = new Date().toISOString();
  writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));

  log(`Toplam kullanılan: ${queue.used.length}/${queue.topics.length}`);
  log('Blog başarıyla üretildi ve kaydedildi.');
}

main().catch(e => {
  err(e.message);
  process.exit(1);
});
