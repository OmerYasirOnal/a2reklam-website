# A2 Reklam — SEO / AIO "En Üst Seviye" Optimizasyon Yol Haritası

**Tarih:** 2026-05-30
**Dal:** `seo-aio-ust-seviye`
**Hedef (eşit ağırlıkta):** (1) organik trafik/sıralama, (2) AI görünürlük (AEO/AIO), (3) dönüşüm, (4) teknik CWV.

Kaynak: 6 boyutlu çok-ajanlı denetim (technical-seo, structured-data, aeo-aio, performance-cwv, content-links, conversion-ux) → 14 doğrulanmış yüksek/kritik bulgu, 23 orta/düşük bulgu.

## Mevcut Durum
SEO temelleri olgun (202 sayfa, zengin şema, IndexNow, Consent Mode v2, llms.txt/ai.txt). "En üst seviye" için 3 kritik açık:
1. `robots.txt` fiziksel olarak yoktu → AI-tarayıcı izni + sitemap referansı eksikti.
2. İlçe sayfaları şablon-ağırlıklı → doorway/thin-content riski.
3. Şema düğümleri `@id` ile bağlı değil → AI entity anlamlandırması zayıf.

## Korunacak Güçlü Yanlar (dokunma)
Zengin şema seti, IndexNow otomasyonu, Consent Mode v2, llms.txt/ai.txt temeli, temiz URL yapısı (trailingSlash + file format), dengeli CTA mimarisi (header + sticky mobil + sidebar — **fazla in-content CTA kartı EKLENMEYECEK**, memory kuralı).

## Hızlı Kazanımlar
- [x] `robots.txt` + 18 AI-tarayıcı izni + sitemap referansı (etki 5 / efor 1) — `public/robots.txt`
- [ ] `openingHoursSpecification` → Pzt-Cuma 09:00-18:00, hafta sonu kapalı (3/1) — `src/components/seo/`
- [ ] Blog yazarı → `Person` entity + yazar bio kutusu (E-E-A-T) (3/2)

## Seçilen AIO İnisiyatifleri (4'ü de onaylandı)
- [x] **robots.txt AI-izinleri** (5/1) — TAMAM
- [ ] **Alıntılanabilir cevap kutuları + tanım blokları** (5/3) — sektör/hizmet sayfalarına TL;DR özet, tanım blokları, soru-cevap. Yeni bileşen: `AnswerBox.astro` benzeri.
- [ ] **Şema `@id` knowledge graph** (4/3) — Organization/LocalBusiness/WebSite düğümlerini `@id` ile bağla, sayfalar arası tutarlı referans.
- [x] **`llms-full.txt` + genişletilmiş `llms.txt`** (4/2) — TAMAM (`public/llms.txt`, `public/llms-full.txt`)
- [ ] **HowTo + QAPage şema** (3/3) — 20 rehbere HowTo, SSS'lere QAPage.

## Yol Haritası (Dalga)

### Dalga 1 — AI görünürlük & tarama temelleri
- [x] AI-tarayıcı erişimini aç (robots.txt) — TAMAM. Kalan: `.htaccess`/sunucu tarafı AI-bot engeli olmadığını doğrula.
- [ ] Şema `@id` graph kur (4/3).

### Dalga 2 — İçerik derinliği & thin-content giderme
- [ ] İlçe sayfalarını farklılaştır: yerel referans projeler, ilçeye özel SSS, mahalle listesi, yerel landmark (5/4) — `src/data/districts.ts`.
- [ ] Alıntılanabilir cevap kutuları + tanım blokları (4/3).
- [ ] İçerik boşluğu blog kümeleri: tabela fiyat rehberi, tabela izni/ruhsat süreci, bakım/onarım, malzeme karşılaştırma (4/4); hizmet pillar sayfalarına bağla.

### Dalga 3 — Dönüşüm & güven
- [ ] Gerçek müşteri yorumları + Review şeması (4/3) — **KRİTİK RİSK:** mevcut AggregateRating gerçek yoruma dayanmıyorsa ya kaldır ya gerçek veriyle besle (Google yapılandırılmış veri cezası).
- [ ] Mobilde "şu an açık/kapalı" rozeti (Pzt-Cuma 09-18) (3/2).
- [ ] Proje referansları / vaka çalışmaları (4/4).

### Dalga 4 — Performans / CWV
- [ ] Görselleri `astro:assets` `<Image>`'e taşı, AVIF/WebP + responsive srcset + lazy (4/3).
- [ ] Cloudflare CDN front (cPanel iptal etmeden — memory kuralı) (4/3).
- [ ] Font subset (latin-ext: ş/ğ/ı), preload, font-display swap doğrula (2/2).

## Riskler
- İlçe sayfaları farklılaştırılmazsa doorway/thin-content cezası.
- AggregateRating gerçek yoruma dayanmıyorsa Google cezası (kaldır veya gerçek veriyle besle).
- AI-tarayıcılar `.htaccess`/sunucu seviyesinde engelliyse robots.txt tek başına yetmez — sunucu doğrulaması gerekli.
- Cloudflare eklenirken cPanel kaldırılmamalı (sadece front).

## Bu Turda Yapılanlar
- `public/robots.txt` oluşturuldu (18 AI-bot Allow + sitemap referansı).
- `public/llms.txt` kapsamlı yeniden yazıldı (hizmetler + bölgeler + sektörler + bilgi kaynakları + işletme bilgileri).
- `public/llms-full.txt` oluşturuldu (detaylı, alıntılanabilir döküm + doğrudan-cevap SSS).
