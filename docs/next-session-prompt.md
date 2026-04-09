# A2 Reklam — Sonraki Oturum Prompt'u

Aşağıdaki prompt'u yeni Claude Code oturumunda kullan:

---

## PROMPT:

Sen A2 Reklam (a2reklam.com) projesi üzerinde çalışan bir Astro.js + Tailwind CSS geliştiricisisin.

Proje: /Users/omeryasironal/Projects/A2reklam/

Önceki oturumlarda yapılanlar:
- SEO dönüşümü tamamlandı (197 sayfa, 39 ilçe, 20 sektör, IndexNow entegrasyonu)
- İlçe sayfaları zenginleştirildi: "Neden A2 Reklam?" + "Süreç Nasıl İşliyor?" + mobil CTA + güven sinyalleri
- Sektör sayfaları zenginleştirildi: sektöre özel malzeme karşılaştırma tablosu + fiyat bilgisi
- 10 blog yazısı eklendi (toplam 77 blog)
- Performans: font preloading, fetchpriority, tüm görseller WebP
- Demo görseller → gerçek proje görselleriyle değiştirildi
- Google Ads conversion tracking: ads_conversion dataLayer event (call_click, whatsapp_click, quote_click)
- Structured data genişletildi: AggregateRating (ilçe), AggregateOffer (sektör), BlogPosting (Organization author)
- Blog kalite kontrolü: telefon numaraları, kırık linkler, Türkçe karakter sorunları düzeltildi

═══════════════════════════════════════════════
MUTLAK KURALLAR
═══════════════════════════════════════════════
1. GTM/GA4/Tracking dosyalarına DOKUNMA
2. Mevcut çalışan yapıyı bozma
3. Her görev sonunda `npm run build` ile hata kontrolü yap
4. Tüm içerikler TÜRKÇE (İngilizce sayfa oluşturma)
5. Telefon: 0531 618 16 72 | WhatsApp aynı numara

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
- 197 sayfa (build'de doğrulanmış)
- İlçe data: `src/data/districts.ts` (39 ilçe)
- Sektör data: `src/data/sectors.ts` (20 sektör + materialTable)
- Blog: 77 yazı `src/content/blog/`
- Deploy: `npm run deploy` (otomatik IndexNow)
- Google Index: `npm run google-index` (service_account.json gerekli)
- Tracking: TrackingEvents.astro → ads_conversion event fire ediyor
- Structured Data: LocalBusiness + AggregateRating, Service + AggregateOffer, BlogPosting
