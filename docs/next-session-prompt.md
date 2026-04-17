# A2 Reklam — Sonraki Oturum Prompt'u

Aşağıdaki prompt'u yeni Claude Code oturumunda kullan:

---

## PROMPT:

Sen A2 Reklam (a2reklam.com) projesi üzerinde çalışan bir Astro.js + Tailwind CSS geliştiricisisin.

Proje: /Users/omeryasironal/Projects/A2reklam/

Önceki oturumlarda yapılanlar:
- SEO dönüşümü tamamlandı (209 sayfa, 39 ilçe, 20 sektör, IndexNow entegrasyonu)
- Kurumsal landing sayfaları (2026-04): `/kurumsal-tabela/`, `/avm-tabelasi/`, `/plaza-tabelasi/`, `/fabrika-tabelasi/`, `/hastane-tabelasi/`
- İlçe sayfaları zenginleştirildi: "Neden A2 Reklam?" + "Süreç Nasıl İşliyor?" + mobil CTA + güven sinyalleri
- Sektör sayfaları zenginleştirildi: sektöre özel malzeme karşılaştırma tablosu + fiyat bilgisi
- 82 blog yazısı (Pzt+Prş otomatik yayın — GitHub Actions blog-auto-publish)
- Performans: font preloading, fetchpriority, tüm görseller WebP
- Demo görseller → gerçek proje görselleriyle değiştirildi
- Google Ads conversion tracking: ads_conversion dataLayer event (call_click, whatsapp_click, quote_click)
- **Google Ads v2 paketi hazır** (2026-04-17, commit 8f264c8): 156 kw + 56 kurumsal + 564 neg + 4 RSA + 32 sitelink + 48 callout + 12 snippet → `npm run ads:audit` temiz, Editor import bekliyor
- Structured data genişletildi: AggregateRating (ilçe), AggregateOffer (sektör), BlogPosting (Organization author)
- Blog kalite kontrolü: telefon numaraları, kırık linkler, Türkçe karakter sorunları düzeltildi
- Redirect'ler server tarafında çalışıyor (2026-04-17 curl doğrulaması): `/hizmet-bolgeleri/*` ve `/*-tabela/` → `/{ilce}-tabelaci/` (301)

═══════════════════════════════════════════════
MUTLAK KURALLAR
═══════════════════════════════════════════════
1. GTM/GA4/Tracking dosyalarına DOKUNMA
2. Mevcut çalışan yapıyı bozma
3. Her görev sonunda `npm run build` ile hata kontrolü yap
4. Tüm içerikler TÜRKÇE (İngilizce sayfa oluşturma)
5. Telefon: 0531 618 16 72 | WhatsApp aynı numara

═══════════════════════════════════════════════
GÖREV 0: GOOGLE ADS EDITOR IMPORT (v2 hazır)
═══════════════════════════════════════════════
Önce audit:
```bash
npm run ads:audit
# Beklenen: "✓ Tum CSV'ler temiz — import icin hazir"
```

Sonra kullanıcıyı yönlendir:
1. Google Ads Editor indir: https://ads.google.com/intl/tr/home/tools/ads-editor/
2. A2 Reklam hesabı (573-737-0737) → Download Recent Changes
3. File → Import → Multiple files → `scripts/data/` altında 6 CSV
   - Sıra: negatives → keywords → corporate → rsa → sitelinks → callouts → snippets
4. Her import sonrası Preview → Post
5. UI-only ayarlar: `scripts/data/ads-import-guide.md` §"Google Ads UI'da MANUEL Ayarlar"
   - Location: sadece İstanbul, presence targeting
   - Mobile +%20 bid, ad schedule (iş saatleri dışı −%50)
   - Günlük bütçe ₺1.000: Cephe %40, Kutu-Harf %25, Işıklı %20, Dijital %15
   - Bid strategy: ilk 2 hafta Manual CPC, sonra Target CPA ₺500-700
6. İmport'tan 24-48 saat sonra: disapproved ads, Quality Score ≥7, search terms report kontrol

═══════════════════════════════════════════════
GÖREV 1: BING + YANDEX DOĞRULAMA
═══════════════════════════════════════════════
Kullanıcıdan Bing ve Yandex doğrulama kodlarını iste.
`src/consts.ts` dosyasındaki `BING_VERIFICATION` ve `YANDEX_VERIFICATION` alanlarına yapıştır.
Meta tag'ler zaten `src/components/common/SEO.astro`'da hazır.

═══════════════════════════════════════════════
GÖREV 2: GOOGLE INDEXING API KURULUMU
═══════════════════════════════════════════════
Kullanıcıyı Google Cloud Console'da yönlendir:
1. Proje oluştur → "A2 Reklam Indexing"
2. "Web Search Indexing API" etkinleştir
3. Service Account oluştur → JSON key indir
4. JSON dosyasını `service_account.json` olarak proje köküne kaydet
5. Google Search Console'da service account email'ini site sahibi olarak ekle

Sonra: `npm run google-index` çalıştır

═══════════════════════════════════════════════
GÖREV 3: DEPLOY ET
═══════════════════════════════════════════════
- `npm run build` — 197 sayfa hatasız build olmalı
- `npm run deploy` — FTP upload + IndexNow otomatik submit
- Deploy sonrası kontrol

═══════════════════════════════════════════════
GÖREV 4: GTM CONVERSION TAG KURULUMU
═══════════════════════════════════════════════
dataLayer'da `ads_conversion` event'i artık fire ediliyor. GTM'de:
1. Custom Event Trigger oluştur: event = "ads_conversion"
2. 3 ayrı tag oluştur:
   - call_click → Google Ads Conversion (tel tıklama)
   - whatsapp_click → Google Ads Conversion (WhatsApp tıklama)
   - quote_click → Google Ads Conversion (teklif sayfası)
3. Her tag'e conversion_action variable'ıyla koşul ekle

NOT: Bunun için Google Ads'te conversion action'lar oluşturulmuş olmalı.

═══════════════════════════════════════════════
GÖREV 5: PERFORMANS OPTİMİZASYONU
═══════════════════════════════════════════════
- Lighthouse Desktop/Mobile skorlarını kontrol et
- Core Web Vitals iyileştirmesi (LCP, CLS, FID)
- CSS/JS bundle boyutu analizi
- Lazy loading kontrolü (görseller, iframe'ler)

═══════════════════════════════════════════════
GÖREV 6: YENİ İÇERİK — ÜÇÜNCÜ DALGA
═══════════════════════════════════════════════
5 yeni blog yazısı daha:
1. "LED Tabela Enerji Tüketimi — 2026 Maliyet Hesabı"
2. "Tabela Bakımı Nasıl Yapılır? Ömrünü Uzatma Rehberi"
3. "Kurumsal Kimlik ve Tabela Uyumu — Marka Rehberi"
4. "Dijital Tabela ve LED Ekran — Fiyat ve Kullanım Rehberi"
5. "İstanbul'da En Çok Tercih Edilen 10 Tabela Türü"

Her yazıda: 800+ kelime, FAQ, internal links (ilçe+sektör+hizmet)

═══════════════════════════════════════════════
GÖREV 7: GOOGLE SEARCH CONSOLE VERİ ANALİZİ
═══════════════════════════════════════════════
- GSC'den anahtar kelime performansını çek
- Düşük CTR ama yüksek gösterim alan sayfaları bul
- Title/description optimizasyonu yap
- Yeni internal link fırsatlarını belirle

═══════════════════════════════════════════════
MEVCUT YAPI BİLGİSİ
═══════════════════════════════════════════════
- 209 sayfa (build'de doğrulanmış)
- İlçe data: `src/data/districts.ts` (39 ilçe)
- Sektör data: `src/data/sectors.ts` (20 sektör + materialTable)
- Blog: 82 yazı `src/content/blog/` (haftada 2 otomatik — GitHub Actions)
- Kurumsal landing: `/kurumsal-tabela/`, `/avm-tabelasi/`, `/plaza-tabelasi/`, `/fabrika-tabelasi/`, `/hastane-tabelasi/`
- Deploy: `npm run deploy` (otomatik IndexNow)
- Google Index: `npm run google-index` (service_account.json gerekli)
- Google Ads: `npm run ads:build` + `npm run ads:audit` (6 CSV, `scripts/data/ads-import-guide.md`)
- Tracking: TrackingEvents.astro → ads_conversion event fire ediyor
- Structured Data: LocalBusiness + AggregateRating, Service + AggregateOffer, BlogPosting
