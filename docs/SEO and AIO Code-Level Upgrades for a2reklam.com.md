# SEO and AIO code-level upgrades for a2reklam.com

Bu doküman teknik SEO referansı olarak kullanılır. Yapılacak kod değişiklikleri claude-code-master-prompt.md dosyasındadır.

## Tamamlanan implementasyonlar

- ✅ Service schema (@id referans paterni, 14 hizmet)
- ✅ Dinamik robots.txt (src/pages/robots.txt.ts)
- ✅ Sitemap serialize callback (lastmod, priority)
- ✅ Self-hosted WOFF2 fontlar (Inter + Montserrat variable, latin + latin-ext)
- ✅ Hero görsel optimizasyonu (loading="eager", fetchpriority="high", width/height)
- ✅ Galeri lazy loading güvencesi
- ✅ Alt text SEO iyileştirmesi
- ✅ preconnect/dns-prefetch optimizasyonu
- ✅ og:locale, content-language meta tagları

## Bekleyen implementasyonlar

### 1. Google Fonts CDN kaldırma (Layout.astro)
Layout.astro'daki 3 satırlık Google Fonts link'leri kaldırılmalı — self-hosted fontlar zaten aktif.

### 2. Hizmetler sidebar düzeltmesi
Mevcut tek blok sidebar'a "Diğer Hizmetler" widget'ı eklenmeli, grid daraltılmalı.

### 3. İçerik formatlaması (AIO optimizasyonu)
- Her SSS cevabı 40-60 kelimelik doğrudan yanıtla başlamalı
- HTML tabloları fiyat/karşılaştırma için
- Numaralı listeler üretim süreçleri için
- Türkçe konuşma dilinde hedef sorgular: "...nedir?", "...ne kadar?", "...nasıl yapılır?"

### 4. React island hydration stratejisi
| Pozisyon | Direktif | JS Etkisi |
|----------|----------|-----------|
| Non-interactive | Direktif yok | Sıfır JS |
| Above-fold critical | client:load | Anında hydration |
| Important, bekleyebilir | client:idle | Idle'da hydration |
| Below-fold | client:visible | Scroll'da hydration |

### 5. Content collection geliştirmeleri (gelecek)
- services schema'ya serviceType, category, tags, priceRange eklenmeli
- districts schema'ya nearbyDistricts, services referansları eklenmeli
- Programmatic RelatedServices ve NearbyDistricts bileşenleri

## Atlanması gereken schema türleri
- ❌ Sitelinks searchbox — Google Kasım 2024'te kaldırdı
- ❌ Speakable — sadece ABD İngilizce haber içeriği için
- ❌ Geo meta tags — Google yıllardır yok sayıyor
- ❌ HowTo — Eylül 2023'te kaldırıldı
