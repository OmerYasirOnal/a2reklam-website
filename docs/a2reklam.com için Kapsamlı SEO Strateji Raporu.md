# a2reklam.com için kapsamlı SEO strateji raporu

Bu doküman SEO strateji bağlamı olarak referans amaçlıdır. Yapılacak kod değişiklikleri claude-code-master-prompt.md dosyasındadır.

## Özet

a2reklam.com'un sorunu içerik eksikliği değil, içerik fazlalığı ve kalitesizliğidir. Üç dilde yüzlerce ince sayfa, Google'a "bu site düşük kaliteli" mesajı veriyor. ~300+ URL'den ~60-80 kaliteli Türkçe sayfaya düşmek hedefleniyor.

## Tamamlanan teknik SEO işleri

- ✅ /ar/ sayfalar kaldırıldı, 301 yönlendirmeleri kuruldu
- ✅ İnce /en/ sayfalar budandı
- ✅ robots.txt dinamik olarak oluşturuluyor (src/pages/robots.txt.ts)
- ✅ Sitemap serialize callback eklendi (lastmod, priority)
- ✅ LocalBusiness JSON-LD tüm sayfalarda
- ✅ BreadcrumbList schema tüm alt sayfalarda
- ✅ FAQPage schema hizmet ve ilçe sayfalarında
- ✅ Service schema (@id referans paterni) 14 hizmete eklendi
- ✅ LocalBusiness → makesOffer bağlantısı kuruldu
- ✅ VideoObject schema video sayfalarında
- ✅ BlogPosting schema blog/rehber sayfalarında
- ✅ og:locale, content-language, sitemap link meta tagları eklendi
- ✅ preconnect/dns-prefetch optimizasyonu yapıldı
- ✅ Self-hosted WOFF2 fontlar (@fontsource-variable/inter, montserrat)
- ✅ Hero görselleri loading="eager" + fetchpriority="high" + width/height
- ✅ Galeri görselleri loading="lazy" + decoding="async"
- ✅ BackToTopButton basitleştirildi (sabit 400px threshold)
- ✅ Tabela Rehberi sidebar düzeltildi (CTA + Kategoriler sticky, İlgili/Son Rehberler makale altına)
- ✅ Reviews Section güncellendi (87 yorum, profil fotoğrafı, tek buton)
- ✅ Video başlık/açıklamaları SEO güçlendirilmiş

## Sıradaki öncelikli işler

1. Hizmetler sidebar düzeltmesi (Diğer Hizmetler bloğu eklenmeli)
2. Google Fonts CDN link'lerinin Layout.astro'dan kaldırılması
3. Hizmet sayfaları içerik derinleştirme (1.000+ kelime, fiyat tabloları, gerçek proje verileri)
4. GBP optimizasyonu + yorum toplama sistemi
5. NAP tutarlılığı + 30 dizinde citation

## Anahtar SEO prensipleri

- Hizmet sayfaları minimum 1.000 kelime, AIO için 40-60 kelimelik cevap kapsülleri
- İlçe sayfaları minimum 800-1.500 kelime özgün içerik
- Internal linking: 3 tıklama kuralı
- Görsel: WebP/AVIF, tanımlayıcı dosya adları, Türkçe alt text
- E-E-A-T: Gerçek proje fotoğrafları, stok fotoğraf kullanma
