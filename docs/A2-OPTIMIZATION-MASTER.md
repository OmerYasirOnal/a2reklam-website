# A2 Reklam — Optimizasyon Master Dosyası

**Son güncelleme:** 2026-04-17
**Toplam iterasyon:** 21 (iter#1-21)
**Tüm değişiklikler:** `main` branch'te, GitHub'da yedekli.

---

## 🎯 Bu Session'da Yapılanlar (Özet)

### 🌐 SİTE İYİLEŞTİRME (hepsi canlıda — a2reklam.com)

| Alan | Önce | Sonra |
|------|------|-------|
| Toplam sayfa | 202 | **209** |
| SEO sorunlu sayfa | 138 (%68) | **42 (%21)** |
| DESC_SHORT | 104 | 12 (−88%) |
| TITLE_SHORT | 22 | 0 |
| Kurumsal landing | 1 | **5** (kurumsal + avm + plaza + fabrika + hastane) |
| Blog topic queue | 55 | **78** (9.8 ay buffer) |

### 🏗 YENİ KURUMSAL LANDING SAYFALAR (canlıda, HTTP 200)

1. **`/kurumsal-tabela/`** — Hub sayfa (AVM, plaza, fabrika, hastane, otel, okul, banka)
2. **`/avm-tabelasi/`** — 50+ AVM referans (Cevahir, Zorlu, Kanyon, İstinye, Mall of İstanbul…)
3. **`/plaza-tabelasi/`** — 50+ plaza (Metrocity, Sabancı Center, Istanbloom, Maya Akar…)
4. **`/fabrika-tabelasi/`** — Tuzla/Dudullu/İkitelli OSB, ATEX+TSE sertifikalı
5. **`/hastane-tabelasi/`** — 30+ hastane (Acıbadem, Memorial, Florence…), ISO 7001 + Braille

**Her sayfada:** 6 hizmet kartı + 6-7 FAQ + Schema.org (FAQPage + BreadcrumbList + LocalBusiness) + internal linking.

### 📝 SEO METADATA ENRICH (209 sayfa)

- **39 ilçe sayfası** → `"X Tabelacı | Kurumsal Tabela İmalatı & Montaj | A2 Reklam"` + AVM/plaza odaklı 144 karakter description
- **20 sektör sayfası** → benzer format
- **80 blog + rehber** → "A2 Reklam: 2.500+ proje, ⭐5.0/90 yorum" kurumsal suffix
- **16 hizmet sayfası** → 165 karakter akıllı truncation

### 🤖 OTOMASYON (GitHub Actions, aktif)

Pasif çalışan 8 workflow:
1. **Blog Auto-Publish** — Pzt + Prş 09:00 (Gemini 2.5 Flash ile blog üretir, queue'dan çeker)
2. **Google Indexing API** — Günlük 03:00 (20 URL Google'a bildirir)
3. **Build Astro Site** — Her push'ta
4. **cPanel Auto-Deploy** — src/ değişince otomatik
5. **Health Check** — Saatlik
6. **Lighthouse Monitor** — Günlük
7. **Competitor Analysis** — Haftalık
8. **Content Gap** — Haftalık

### 🔧 TEKNIK DÜZELTMELER

- **`.htaccess` catch-all fix** — `/X-tabela/` → `/X-tabelaci/` redirect artık kurumsal landing'leri etkilemiyor (exception listesi)
- **Sitemap filter** — `/yorum-birakin/` noindex landing sitemap'ten excluded
- **Schema coverage** — 209/209 sayfa (%100)
- **IndexNow** — Her deploy'da 194+ URL Bing/Yandex otomatik submit

---

## 📋 HAZIR PAKETLER (elle uygulanacak — yapmadık)

### 1. Google Ads Paketi v2 (`scripts/data/`) — İter#22, 2026-04-17, commit 8f264c8

**v1 → v2 değişim:** Keywords 639→156 (%76 daraltma, Iter#10 CTR verisiyle). Negatives 100→564 (rakip+şehir+iş arayan+DIY filter). Sitelinks per-campaign. Snippets "Brands"→"Types"+"Service catalog" header fix. RSA UI-manuel → CSV import.

| Dosya | İçerik |
|-------|--------|
| `google-ads-keywords-import.csv` | 156 keyword (7 Champion Exact + 41 Core Phrase + 108 Long-tail: 18 top ilçe × 6 hizmet) |
| `google-ads-corporate-keywords.csv` | 56 kurumsal (3 kampanyaya AVM/plaza/hastane/otel/fabrika kombineleri) |
| `google-ads-negatives-import.csv` | 564 negatif (141 × 4 kampanya: rakip+şehir+iş+DIY+e-ticaret) |
| `google-ads-rsa-import.csv` | 4 RSA (15 başlık + 4 açıklama + 2 path, pin 1+2) — yeni |
| `google-ads-sitelinks.csv` | 32 sitelink (4 kampanya × 8, her kampanya kendi landing'ine özel) |
| `google-ads-callouts.csv` | 48 callout (4 × 12 — Google 4-6 gösterir) |
| `google-ads-snippets.csv` | 12 snippet (4 × 3 header: Service catalog, Types, Neighborhoods) |
| `ads-copy-kit.md` | Arşiv/referans — copy spec detayı |
| `ads-import-guide.md` | Editor import sırası + UI-only ayar rehberi — yeni |

**Komutlar (otomatize üretim):**
- `npm run ads:build` → 4 generator çalıştırır, 6 CSV üretir (872 satır)
- `npm run ads:audit` → duplicate + char limit + kampanya tutarlılık validatörü

**Nasıl uygulanır:**
1. `npm run ads:audit` — "Tum CSV'ler temiz" çıkarsa OK
2. Google Ads Editor indir: https://ads.google.com/intl/tr/home/tools/ads-editor/
3. A2 Reklam hesabını sync et → Download Recent Changes
4. File → Import → Multiple files → 6 CSV seç (sıra: negatives → keywords → corporate → rsa → sitelinks → callouts → snippets)
5. Her import sonrası Preview → Post
6. UI-only ayarlar: `ads-import-guide.md` §"Google Ads UI'da MANUEL Ayarlar" (location İstanbul presence, mobile +%20, ad schedule, budget ₺1.000 %40/%25/%20/%15)

### 2. Google Business Profile (Maps) Paketi

**Dosya:** `scripts/data/gbp-optimization-kit.md`

İçerik:
- **7 günlük uygulama planı** (gün bazında checklist)
- **Primary + 8 secondary kategori** listesi
- **745 karakter açıklama** (hazır yapıştır)
- **15 hizmet** fiyat + açıklama
- **20 haftalık Google Posts taslağı** (Pzt proje + Prş ipucu)
- **20 Q&A** proaktif soru-cevap
- **Yorum toplama stratejisi** (QR kod, WhatsApp template, e-posta template)
- **Hedef:** 90 yorum → 150 (6 ay)

**Nasıl uygulanır:** `business.google.com` → her bölüm için dosyadaki metni yapıştır.

### 3. Keyword Research Raporu

**Dosya:** `scripts/data/keyword-research.md` (615 satır, 21 iterasyon log)

İçerik:
- Rakip SERP analizi (Armut, Eray, brd)
- Auction Insights tahmini
- Arama terimleri raporu (hangi kelimelerde %10-200 CTR)
- Her iterasyonun detaylı logu

---

## 🗂 ÖNEMLİ DOSYALAR (referans için)

### Kodbase
- `src/data/districts.ts` — 39 ilçe (slug, name, title, metaDescription, content, FAQ, coordinates)
- `src/data/sectors.ts` — 20 sektör
- `src/pages/kurumsal-tabela.astro` — Kurumsal hub
- `src/pages/avm-tabelasi.astro` — AVM landing
- `src/pages/plaza-tabelasi.astro` — Plaza landing
- `src/pages/fabrika-tabelasi.astro` — Fabrika landing
- `src/pages/hastane-tabelasi.astro` — Hastane landing

### Scriptler (otomasyon + analiz)
- `scripts/generate-keyword-csv.mjs` — Long-tail keyword CSV üretir
- `scripts/generate-corporate-keywords-csv.mjs` — Kurumsal keyword CSV
- `scripts/generate-ads-extensions-csv.mjs` — Sitelink/callout/snippet CSV
- `scripts/audit-seo.mjs` — Tüm sayfaları tarar, SEO raporu üretir
- `scripts/enrich-seo-metadata.mjs` — Title+desc zenginleştirici
- `scripts/enrich-blog-descriptions.mjs` — Blog desc enricher
- `scripts/deploy.sh` — Production deploy (FTP + extract + cache + IndexNow)

### Deploy
- `.env.deploy` — FTP credentials (gitignored, local)
- `public/.htaccess` — cPanel redirects + cache rules
- `/api/deploy-extract.php` (server-side) — zip extract endpoint

### GitHub Actions
- `.github/workflows/blog-auto-publish.yml` — Haftada 2 blog
- `.github/workflows/google-indexing.yml` — Günlük URL submit
- `.github/workflows/cpanel-deploy.yml` — Auto deploy
- `.github/workflows/health-check.yml` — Saatlik uptime
- `.github/workflows/lighthouse-monitor.yml` — Performans
- `.github/workflows/competitor-analysis.yml` — Rakip takip
- `.github/workflows/content-gap.yml` — İçerik boşluğu analizi

---

## ⚠ DEPLOY NOTU (Bugün yaşanan problem + çözüm)

**Sorun:** `npm run deploy` ile 96MB zip (HTML + 92MB assets) yüklenince server-side PHP extract script timeout oldu → tüm HTML dosyaları 0 byte kaldı → site beyaz ekran.

**Çözüm (bundan sonra):** `.env.deploy` ve `scripts/deploy.sh` kullanıyorsan:
- Ya deploy script'ini timeout'u 600sn yap
- Ya da `dist/assets/` ve `dist/_astro/` değişmediyse sadece HTML sync et (4MB, saniyeler içinde biter)

**Acil kurtarma (yaşandığında):**
```bash
cd /Users/omeryasironal/Projects/A2reklam
npm run build
# Python FTP direct sync
python3 -c "
import ftplib, os
from pathlib import Path
ftp = ftplib.FTP('89.252.183.211', timeout=60)
ftp.login('deploy@a2reklam.com', 'hexbi5-wykgop-Jiwsow')
for fp in Path('dist').rglob('*'):
    if fp.is_file() and not str(fp.relative_to('dist')).startswith('assets/'):
        rel = str(fp.relative_to('dist'))
        # ensure parent dirs
        parts = rel.split('/')
        for i in range(1, len(parts)):
            try: ftp.mkd('/'.join(parts[:i]))
            except: pass
        with open(fp, 'rb') as f:
            ftp.storbinary(f'STOR {rel}', f)
ftp.quit()
"
# Cache purge
curl -s 'https://a2reklam.com/api/cache-purge.php?secret=a2deploy_s3cr3t_2026'
curl -s 'https://a2reklam.com/api/force-refresh.php?secret=a2deploy_s3cr3t_2026'
```

---

## 🔑 HESAPLAR & ERİŞİM

| Platform | Hesap / ID |
|----------|------------|
| Google Ads | 573-737-0737 (A2 Reklam) — onalomer44@gmail.com |
| Google Analytics | G-TC9GJP3GLT |
| Google Tag Manager | GTM-MXT449F9 |
| Google Ads Conversion | AW-17854412453 |
| Google Business Profile | `ChIJv25PC1S3yhQRGYquK72if0c` |
| cPanel | mt-scuba.guzelhosting.com:2083 — areklamc |
| FTP | 89.252.183.211 — deploy@a2reklam.com |
| GitHub | OmerYasirOnal/a2reklam-website |
| Bing Webmaster | Verification token in `src/consts.ts` |
| Yandex Webmaster | Verification token in `src/consts.ts` |

---

## 🚀 BEKLİYOR (Kullanıcı yapacak, dokümanla hazır)

**Öncelik sırası:**

### 🥇 İlk Hafta (hemen etki)
1. **Google Ads Editor import** (v2 hazır — 2 dakika + UI ayarları)
   - `npm run ads:audit` — temiz olmalı
   - Editor'ı indir, A2 Reklam hesabını sync et (Download Recent Changes)
   - File → Import → 6 CSV (sıra: negatives → keywords → corporate → rsa → sitelinks → callouts → snippets)
   - Preview → Post
   - UI-only ayarlar: `scripts/data/ads-import-guide.md`
   - **Sonuç**: 156+56 keyword + 564 negatif + 4 RSA + 32 sitelink + 48 callout + 12 snippet anında aktif
2. **GBP kategoriler + açıklama** (5 dakika)
   - business.google.com aç
   - Primary: Tabela Mağazası + 8 secondary (`gbp-optimization-kit.md`)
   - 745 kar açıklamayı yapıştır
3. **GBP ilk Google Post** (5 dakika)
   - Hafta 1 Pazartesi post'u (`gbp-optimization-kit.md` sayfa 2)

### 🥈 İlk Ay (pasif gelir)
4. **15 GBP hizmet ekle** (30 dakika)
5. **20 Q&A bir haftaya yay** (5/gün × 4 gün)
6. **QR kod yorum kartı bas** (100 adet matbaa)
7. **Son 20 müşteriye WhatsApp yorum isteği** (template hazır)

### 🥉 Sürekli (otomatik çalışıyor)
- ✅ Blog yayını (haftada 2 otomatik)
- ✅ IndexNow submit (her deploy'da)
- ✅ Google Indexing API (günlük)

---

## 📞 İLETİŞİM / SUPPORT

Bu dokümanda her şey var. Yeni oturum açarken bu dosyayı Claude'a göster, hızlıca bağlam kurar.

**Güvenilir yedek**: Her değişiklik GitHub'da (OmerYasirOnal/a2reklam-website).

İyi çalışmalar! 🎯
