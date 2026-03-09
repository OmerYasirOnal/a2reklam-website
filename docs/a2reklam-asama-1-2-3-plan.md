# A2 Reklam — Aşama 1: Sidebar Düzeltmesi + Font Temizliği

Bu prompt'u Claude Code'a at.

---

```
Bu projede 2 hızlı düzeltme yapılacak. Sırayla ilerle.

MUTLAK KURALLAR:
- Tracking.astro, TrackingEvents.astro ve GTM ile ilgili hiçbir koda dokunma
- Mevcut çalışan özellikleri bozma (schema'lar, meta taglar, WhatsApp widget, Service schema vb.)
- Her değişiklikten sonra build hatası olmadığını kontrol et

Proje: /Users/omeryasironal/Projects/A2reklam/

=====================================
GÖREV 1: Hizmetler sidebar'ını düzelt
=====================================

Dosya: src/pages/hizmetler/[...slug].astro

SORUN: Sidebar'da tek bir büyük sticky CTA bloğu var. Hizmet sayfaları çok uzun olduğu için sidebar'ın büyük kısmı boş beyaz alan. Tabela rehberi sayfasında zaten bu düzeltmeyi yaptık — aynı mantık burada da uygulanacak.

YAPILACAK DEĞİŞİKLİKLER:

Adım 1: Mevcut sidebar'ı (<!-- Sidebar --> yorum satırıyla başlayan <aside> bloğu) şu şekilde güncelle — CTA bloğunu koru ama altına "Diğer Hizmetler" ve "İlgili Rehberler" blokları ekle:

Mevcut aside bloğunun TAMAMINI şu kodla değiştir:

    <!-- Sidebar -->
    <aside class="hidden lg:block">
      <div class="sticky top-24 space-y-6">
        <!-- CTA Widget -->
        <div class="bg-accent-light p-6 rounded-xl border border-white/5 shadow-2xl text-center">
          <h3 class="font-heading font-bold text-lg mb-3 text-white uppercase tracking-tight">Hemen Teklif <span class="text-primary">Alın</span></h3>
          <p class="text-gray-400 mb-5 text-sm leading-relaxed">
            {entry.data.title} için profesyonel destek ve fiyat teklifi alın.
          </p>
          <a href="/teklif-al/" data-track="quote" data-lang="tr" class="block w-full text-center bg-primary text-secondary font-black py-3 rounded-lg hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20 uppercase tracking-widest text-sm mb-3">
            Teklif İste
          </a>
          <a href={whatsappLink} data-track="whatsapp" data-lang="tr" class="flex items-center justify-center gap-2 w-full text-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition-all border border-green-500/50 text-sm">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.414 0 6.556-5.332 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.591 5.405 0 9.801-4.398 9.801-9.805 0-5.403-4.395-9.804-9.801-9.804-5.408 0-9.805 4.398-9.805 9.804 0 2.229.615 4.317 1.784 6.149l-1.109 4.041 4.139-1.08zm9.977-6.862c-.32-.16-1.89-.932-2.185-1.041-.297-.108-.512-.16-.726.16-.215.32-.834 1.042-1.023 1.256-.188.214-.377.241-.697.08-.32-.16-1.35-.497-2.57-1.587-.948-.847-1.59-1.893-1.777-2.214-.188-.321-.02-.494.14-.654.144-.143.32-.375.48-.563.16-.188.214-.321.32-.536.108-.214.054-.401-.027-.562-.08-.16-.726-1.751-.995-2.394-.26-.629-.53-.543-.726-.553-.188-.01-.403-.012-.617-.012s-.564.08-.859.401c-.296.321-1.128 1.102-1.128 2.688 0 1.587 1.155 3.118 1.316 3.332.16.214 2.274 3.472 5.508 4.871.77.333 1.37.532 1.839.681.773.245 1.477.211 2.032.128.618-.093 1.891-.773 2.158-1.517.268-.745.268-1.383.189-1.516-.08-.135-.297-.215-.617-.375z"/></svg>
            WhatsApp
          </a>
        </div>

        <!-- Diğer Hizmetler Widget -->
        <div class="glass-card p-5">
          <h3 class="font-heading font-bold text-base text-heading mb-3">Diğer Hizmetler</h3>
          <div class="space-y-2">
            {topDistricts.length > 0 && [
              { label: 'Işıklı Tabela', href: '/hizmetler/isikli-isiksiz-tabelalar/' },
              { label: 'Paslanmaz Harf', href: '/hizmetler/paslanmaz-harfler/' },
              { label: 'Totem Tabela', href: '/hizmetler/totem/' },
              { label: 'Cephe Tabela', href: '/hizmetler/cephe-tabela/' },
              { label: 'Araç Giydirme', href: '/hizmetler/arac-giydirme/' },
              { label: 'Yönlendirme', href: '/hizmetler/yonlendirme/' },
            ].filter(s => !s.href.includes(entry.slug)).slice(0, 5).map(service => (
              <a href={service.href} class="flex items-center justify-between text-sm text-gray-300 hover:text-primary transition-colors py-1">
                <span>{service.label}</span>
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>

Adım 2: Ana içerik alanının (<div class="lg:col-span-2">) EN SONUNA (son </div>'den ÖNCE), "Hemen Teklif ve Keşif" bloğundan SONRA, mobilde de görünecek şekilde "İlgili Blog Yazıları" bloğunun ALTINA bir mobil CTA bloğu ekle:

Mevcut "Hemen Teklif ve Keşif" bloğunun altına (zaten mevcut — dokunma) ve onun altındaki kapanış </div>'den ÖNCE, şu bloğu ekle (eğer yoksa):

      <!-- Mobil CTA (lg'de gizli çünkü sidebar'da var) -->
      <div class="my-10 bg-accent-light p-8 rounded-xl border border-white/5 shadow-inner not-prose lg:hidden">
        <h3 class="font-heading font-bold text-2xl mb-4 text-white flex items-center gap-2">
          <span class="w-1 h-8 bg-primary block rounded-full"></span>
          Hemen Teklif Alın
        </h3>
        <p class="text-gray-300 text-sm mb-6">
          {entry.data.title} işleriniz için profesyonel destek ve fiyat teklifi almak için bize ulaşın.
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="/teklif-al/" data-track="quote" data-lang="tr" class="bg-primary text-secondary font-bold py-3 px-6 rounded-lg hover:bg-white transition-all">
            Teklif Al
          </a>
          <a href={whatsappLink} data-track="whatsapp" data-lang="tr" class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-all">
            WhatsApp
          </a>
        </div>
      </div>

NOT: Eğer bu mobil CTA zaten mevcutsa (mevcut "Hemen Teklif ve Keşif" bloğu bunu karşılıyor olabilir) EKLEME. Mevcut durumu kontrol et.

Adım 3: Grid yapısını güncelle — mevcut grid lg:grid-cols-3 yerine tabela rehberi gibi sidebar genişliğini daralt:

Mevcut: <div class="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">

Değiştir: <div class="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-12">

Bu, sidebar'ı 300px'e sabitler ve ana içeriğe daha fazla alan verir.

=====================================
GÖREV 2: Layout.astro'dan Google Fonts CDN link'lerini kaldır
=====================================

Dosya: src/layouts/Layout.astro

Self-hosted WOFF2 fontlar zaten çalışıyor (src/styles/fonts.css + @fontsource-variable). Layout.astro'daki Google Fonts CDN link'leri artık gereksiz çift yüklemeye neden oluyor.

Şu 3 satırı SİL:

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">

Bu 3 satırı SİL, başka hiçbir şeye DOKUNMA. Layout.astro'daki Tracking, SEO, Header, Footer, MobileCTA, WhatsApp, BackToTopButton, TrackingEvents — hepsi olduğu gibi kalmalı.

NOT: Cairo fontu (Arabic fallback) artık yüklenmeyecek. Bu kabul edilebilir çünkü Arapça sayfalar zaten kaldırıldı.

=====================================
DOĞRULAMA
=====================================

1. npm run build çalıştır, hata olmadığını doğrula
2. Dev server başlat
3. Bir hizmet sayfasını aç:
   - Desktop: Sidebar'da CTA + Diğer Hizmetler (2 blok), sticky, viewport'a sığıyor mu?
   - Mobil: Sidebar gizli mi? Ana içerikte CTA blokları görünüyor mu?
4. Anasayfayı aç, Network sekmesinde fonts.googleapis.com isteği OLMAMALI
5. Fontlar (Inter body, Montserrat heading) düzgün render ediliyor mu?
6. Türkçe karakterler (ğ, ş, ı, İ) doğru mu?
```

---
---

# A2 Reklam — Aşama 2: Hizmet Sayfaları İçerik Derinleştirme

## Bu şablonu SEN doldur, sonra Claude Code'a ver

Her hizmet sayfası için aşağıdaki bilgileri doldurman gerekiyor. Bu bilgiler OLMADAN AI Overviews'da görünmek imkansız — çünkü Google "information gain" (bilgi kazanımı) arıyor, yani rakiplerde olmayan gerçek veri.

### Şablon — Her Hizmet İçin Doldur

**Hizmet adı:** [örn: Kutu Harf / Paslanmaz Harf]

**1. Kısa tanım (40-60 kelime, "nedir?" sorusuna cevap):**
[Bu tabela türü nedir, ne işe yarar, kim için ideal — tek paragrafta, tanıtım dili OLMADAN]

**2. Fiyat aralıkları (gerçek rakamlar):**
- Malzeme A: ₺XX – ₺XX (cm başına / adet başına / m² başına)
- Malzeme B: ₺XX – ₺XX
- [Fiyatı etkileyen faktörler: boyut, aydınlatma, montaj yüksekliği vb.]

**3. Üretim süresi:**
- Standart projeler: X-Y iş günü
- Acil projeler: X iş günü (ek ücret var/yok)
- Büyük projeler (100+ harf): X-Y hafta

**4. Malzeme detayları (teknik):**
- Hangi paslanmaz kalınlığı? (0.8mm, 1mm, 1.2mm?)
- LED tipi? (SMD 2835, 5050? iç aydınlatma mı, arka aydınlatma mı?)
- Pleksi kalınlığı? (3mm, 5mm, 8mm?)
- Boya/kaplama: Elektrostatik? Anodize? Krom?

**5. Gerçek proje örnekleri (en az 2):**
- Proje 1: [Müşteri adı/sektör], [ilçe], [ne yapıldı], [kaç harf/boyut], [süre]
- Proje 2: [Müşteri adı/sektör], [ilçe], [ne yapıldı], [boyut], [süre]

**6. İlçeye özel bilgiler:**
- Hangi ilçelerde en çok talep görüyorsunuz?
- Belediye izin süreçleri farklılık gösteriyor mu?

**7. Bakım bilgileri:**
- Temizlik sıklığı önerisi
- LED ömrü
- Garanti kapsamı (tam olarak ne dahil, ne hariç)

**8. SSS (5 soru-cevap, her cevap 40-60 kelime):**
- [Soru 1]: [Cevap — doğrudan, somut verilerle]
- [Soru 2]: [Cevap]
- ...

### Öncelik Sırası — İlk 5 Hizmet

Bu 5 hizmetin içeriğini önce doldur (en yüksek arama hacmi):
1. paslanmaz-harfler (kutu harf)
2. isikli-isiksiz-tabelalar
3. cephe-tabela
4. totem
5. arac-giydirme

### Doldurunca ne olacak?

Doldurduğun verileri bana geri gönder, ben sana:
1. Her hizmet için 1.000-1.500 kelimelik SEO-optimize markdown içeriği yazacağım
2. AIO-uyumlu 40-60 kelimelik "cevap kapsülleri" formatında
3. HTML fiyat karşılaştırma tabloları dahil
4. Türkçe konuşma dilinde, "...nedir?", "...ne kadar?", "...nasıl yapılır?" sorgularına optimize
5. Claude Code'a atılacak hazır prompt şeklinde

---
---

# A2 Reklam — Aşama 3: GBP + NAP Rehberi

## Bu işler kod değil, senin yapman gereken off-page işler

### GBP (Google Business Profile) Acil Adımlar

**Birincil Kategori:** "Sign Shop" (Tabela Mağazası) — doğrula
**Ek Kategoriler:** "Neon Sign Shop", "Advertising Agency", "Screen Printer" ekle

**Haftalık rutinler:**
- Haftada 5+ fotoğraf yükle (atölye, montaj, teslim edilen projeler)
- Haftada 1 Google Posts paylaşımı (tamamlanan proje, kampanya, sektör bilgisi)
- Her yeni yoruma 24 saat içinde 140+ kelimelik detaylı yanıt

**Yorum toplama sistemi:**
- Her teslim edilen projenin ardından müşteriye WhatsApp/SMS ile yorum linki gönder
- Google'ın resmi review link'i: https://search.google.com/local/writereview?placeid=PLACE_ID_BURAYA
- Hedef: Ayda minimum 4 yeni yorum
- Mevcut: 87 yorum, 5.0 — mükemmel kalite ama rakipler 150-200+ aralığında

### NAP Tutarlılığı — 30 Dizin

İşletme bilgileri birebir aynı formatta olmalı:
- İsim: A2 Reklam Tabela & Mimari Yönlendirme
- Adres: Şirintepe, Açelya Sokağı Ugur Apt No:4/a, 34415 Kağıthane/İstanbul
- Telefon: 0531 618 16 72

**Öncelikli dizinler (ilk hafta):**
1. Armut.com — "İstanbul tabela" aramalarında organik olarak üst sırada
2. Sahibinden.com
3. Sarı Sayfalar (sfrr.com)
4. Foursquare — birçok harita uygulamasını besleyen veri kaynağı
5. Apple Maps Connect
6. Bing Places
7. Yandex Haritalar

**İkincil dizinler (ikinci hafta):**
8-15. Tuugo, Cylex, İTO dizini, İSO dizini, n11 işletme, Letgo işletme, Enuygun işletme, TrustPilot

**Sosyal medya profilleri (üçüncü hafta):**
16-20. Facebook, Instagram, LinkedIn, YouTube, X/Twitter
21-30. Sektörel dizinler, yerel iş rehberleri
