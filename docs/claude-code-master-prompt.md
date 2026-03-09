Sana 4 doküman veriyorum. Bunları oku ve aşağıdaki talimatları sırayla uygula.

Dokümanlar:
1. `a2reklam-asama-1-2-3-plan.md` — Yapılacak kod değişiklikleri (Aşama 1)
2. `Building a Local HTML Review Interface for Claude Code.md` — Review sistemi araştırması
3. `a2reklam.com için Kapsamlı SEO Strateji Raporu.md` — SEO strateji bağlamı
4. `SEO and AIO Code-Level Upgrades for a2reklam.com.md` — Teknik SEO referansı

Proje: /Users/omeryasironal/Projects/A2reklam/

MUTLAK KURALLAR:
- GTM tag'ı (GTM-MXT449F9), Tracking.astro, TrackingEvents.astro dosyalarına DOKUNMA
- consts.ts'deki GTM/GA4 sabitlerini DEĞİŞTİRME
- Her görev sonunda `npm run build` ile hata olmadığını doğrula
- Mevcut çalışan özellikleri bozma (schema'lar, Service schema, meta taglar, WhatsApp widget)

---

## AŞAMA A: Kod Değişiklikleri

`a2reklam-asama-1-2-3-plan.md` dokümanındaki "Aşama 1" başlığı altındaki Claude Code prompt'unu oku ve oradaki GÖREV 1 (Hizmetler sidebar düzeltmesi) ve GÖREV 2 (Layout.astro Google Fonts CDN kaldırma) adımlarını aynen uygula.

Her görevden sonra build çalıştır, hata varsa düzelt.

---

## AŞAMA B: Review Sistemi Kur

Tüm kod değişiklikleri bittikten sonra, `Building a Local HTML Review Interface for Claude Code.md` dokümanını referans alarak bir review sistemi kur. Aşağıdaki adımları sırayla yap:

### B1: Review klasörü ve feedback server oluştur

```bash
mkdir -p .review
```

`.review/review-server.js` oluştur:

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const REVIEW_DIR = path.join(__dirname);
const FEEDBACK_FILE = path.join(REVIEW_DIR, 'feedback.json');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }
  
  if (req.method === 'POST' && req.url === '/feedback') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const feedback = JSON.parse(body);
        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'saved', file: FEEDBACK_FILE }));
        console.log('\n✅ Feedback kaydedildi: ' + FEEDBACK_FILE);
        console.log('Claude Code\'a dönüp şunu yaz: "feedback.json\'u oku ve uygula"');
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Geçersiz JSON' }));
      }
    });
    return;
  }
  
  res.writeHead(404);
  res.end('Not found');
});

const PORT = 3847;
server.listen(PORT, () => {
  console.log(`\n🔍 Review feedback server: http://localhost:${PORT}`);
  console.log('Review sayfasından feedback gönderildiğinde otomatik kaydedilecek.\n');
});
```

### B2: Dev server'ı başlat ve screenshot al

```bash
# Dev server'ı arka planda başlat
npx astro dev &
sleep 5
```

Aşağıdaki sayfaların screenshot'larını al (Playwright veya curl ile). Eğer Playwright yüklü değilse `npx playwright install chromium` çalıştır:

Screenshot alınacak sayfalar:
1. `http://localhost:4321/` (anasayfa - desktop 1280x800)
2. `http://localhost:4321/hizmetler/paslanmaz-harfler/` (hizmet sayfası - desktop 1280x800)
3. `http://localhost:4321/hizmetler/paslanmaz-harfler/` (hizmet sayfası - mobil 375x812)
4. `http://localhost:4321/tabela-rehberi/cephe-tabelasi-nedir/` (rehber sayfası - desktop 1280x800)

Screenshot'ları `.review/screenshots/` klasörüne kaydet.

Eğer Playwright kurulumu sorun çıkarırsa, screenshot adımını atla ve review sayfasına sadece URL linkleri koy.

### B3: Review özet dosyası oluştur

`.review/summary.json` oluştur. Bu dosya yapılan tüm değişiklikleri listeler:

```json
{
  "timestamp": "<şu anki ISO tarih>",
  "project": "a2reklam",
  "totalChanges": 2,
  "buildStatus": "success",
  "changes": [
    {
      "id": "sidebar-fix",
      "title": "Hizmetler Sidebar Düzeltmesi",
      "description": "Sidebar'a Diğer Hizmetler bloğu eklendi, grid 300px'e sabitlendi, mobil CTA eklendi",
      "files": ["src/pages/hizmetler/[...slug].astro"],
      "category": "UI",
      "previewUrls": [
        "http://localhost:4321/hizmetler/paslanmaz-harfler/",
        "http://localhost:4321/hizmetler/cephe-tabela/"
      ]
    },
    {
      "id": "font-cleanup",
      "title": "Google Fonts CDN Kaldırma",
      "description": "Layout.astro'dan Google Fonts CDN link'leri kaldırıldı. Self-hosted WOFF2 fontlar zaten aktif.",
      "files": ["src/layouts/Layout.astro"],
      "category": "Performance",
      "previewUrls": [
        "http://localhost:4321/"
      ]
    }
  ],
  "screenshots": []
}
```

Screenshots dizisini, eğer screenshot aldıysan dosya yollarıyla doldur.

### B4: Review HTML sayfası oluştur

`.review/index.html` oluştur. Bu sayfa:
- Yapılan değişikliklerin listesini gösterir
- Her değişiklik için Onayla / Değişiklik İste butonları vardır
- Değişiklik istenen görevlere yorum yazılabilir
- Screenshot'lar varsa gösterir, yoksa canlı preview linkleri verir
- "Tüm Feedback'i Gönder" butonu ile review-server'a POST yapar
- Türkçe arayüz

HTML sayfası şu özelliklere sahip olmalı:

```
Tasarım:
- Koyu tema (bg: #0B0F14, kart: #1A1F2E, accent: #C9A227 — projeyle uyumlu)
- Üstte başlık: "A2 Reklam — Code Review"
- Altında build durumu badge'i (yeşil ✅ veya kırmızı ❌)
- Her değişiklik bir kart olarak gösterilir

Her kart içeriği:
- Başlık + kategori badge (UI / Performance / SEO)
- Açıklama
- Değiştirilen dosyalar listesi
- Preview linki (tıklanabilir, yeni sekmede açılır)
- Screenshot varsa base64 olarak gömülü veya dosya yolu ile <img>
- İki buton: "✅ Onayla" (yeşil) ve "✏️ Değişiklik İste" (turuncu)
- Değişiklik İste seçildiğinde textarea açılır
- Öncelik seçimi: Kritik / Önemli / Düşük (radio butonlar)

Alt kısımda:
- Genel yorum textarea'sı
- "📤 Tüm Feedback'i Gönder" butonu (büyük, primary renk)
- Gönderildiğinde feedback-server'a POST yapar (http://localhost:3847/feedback)
- Başarılı olursa "✅ Feedback kaydedildi!" mesajı gösterir

Teknik:
- Vanilla JS, framework yok
- summary.json'u sayfaya inline olarak göm (fetch yerine — file:// uyumluluğu için)
- Feedback JSON formatı:
{
  "timestamp": "ISO tarih",
  "overallDecision": "approved" | "request_changes",
  "overallComment": "...",
  "changes": [
    {
      "id": "sidebar-fix",
      "decision": "approved" | "request_changes",
      "comment": "...",
      "priority": "critical" | "important" | "low"
    }
  ]
}
```

### B5: Feedback server'ı başlat ve review sayfasını aç

```bash
node .review/review-server.js &
open .review/index.html
```

Eğer macOS değilse `xdg-open` veya `start` kullan.

### B6: Kullanıcıya bilgi ver

Tüm işlemler bittikten sonra şu mesajı yaz:

---
✅ Tüm değişiklikler tamamlandı ve review sistemi hazır.

**Review sayfası açıldı.** Şu adımları izle:

1. 🔍 Review sayfasında her değişikliği incele
2. Preview linklerine tıklayarak canlı sonuçları gör (dev server çalışıyor: http://localhost:4321)
3. Her değişiklik için "Onayla" veya "Değişiklik İste" seç
4. Değişiklik istiyorsan yorumunu yaz ve öncelik belirle
5. "Tüm Feedback'i Gönder" butonuna bas
6. Bana dön ve şunu yaz: `.review/feedback.json dosyasını oku ve feedback'e göre düzeltmeleri yap`

**Çalışan servisler:**
- Dev server: http://localhost:4321
- Feedback server: http://localhost:3847
---

---

## AŞAMA C: Feedback Döngüsü (kullanıcı feedback verdikten sonra)

Eğer kullanıcı `.review/feedback.json dosyasını oku` derse:

1. `.review/feedback.json` dosyasını oku
2. `overallDecision === "approved"` ise → "Harika! Tüm değişiklikler onaylandı." de ve bitir
3. `overallDecision === "request_changes"` ise → Her `request_changes` olan değişikliği sırayla düzelt
4. Düzeltmelerden sonra tekrar build yap
5. `.review/summary.json`'u güncelle (yeni değişikliklerle)
6. `.review/index.html`'i yeniden oluştur (güncellenmiş summary ile)
7. Kullanıcıya tekrar review yapmasını söyle
