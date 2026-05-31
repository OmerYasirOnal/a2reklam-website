# A2 Reklam — SEO / AIO "En Üst Seviye" Optimizasyon — Tasarım & Yol Haritası

**Tarih:** 2026-05-30 · **Dal:** `seo-aio-ust-seviye`
**Hedef (eşit ağırlıkta):** (1) organik trafik/sıralama · (2) AI görünürlük (AEO/AIO) · (3) dönüşüm · (4) teknik CWV.
**Kaynak:** 6 boyutlu, 22-ajanlı adversarial denetim (1.8M token) → 11 doğrulanmış yüksek/kritik + 29 orta/düşük bulgu.

> ⚠️ **Düzeltme notu:** İlk hızlı taramam birkaç şeyi yanlış varsaydı (robots eksik sandım, @id graph gerekiyor sandım — ikisi de zaten vardı). Derin denetim düzeltti. Bu spec **doğrulanmış gerçeği** yansıtır.

## Yönetici Özeti
Site SEO/AIO altyapısı zaten **ileri seviye** — temel eksik yok. "En üst seviye" artık temel kurmak değil, ileri boşlukları kapatmak. Dört eşit hedefteki en büyük kaldıraçlar:
1. **Teknik/şema doğruluğu:** (✅ düzeltildi) `localBusiness.ts` Cumartesi açık ilan ediyordu — Pzt-Cuma-only kuralına aykırı.
2. **Dönüşüm:** WhatsApp qualification paneli mobilde gizli (`hidden md:block`) — en güçlü lead aracı ziyaretçi çoğunluğundan saklı; lead formu hem e-posta hem telefon zorunlu tutarak funnel'ı daraltıyor.
3. **İçerik kalitesi:** ~52 "spun" blog yazısı Helpful-Content riski; hizmet pillar'larının "İlgili Bloglar" bloğu konu-dışı (Sapanca/Yalova) en yeni yazıları çekiyor.
4. **AIO:** answer-box, veri-senkronlu llms-full, fiyatı cümleye gömme gibi alıntılanabilirlik hamleleri henüz yok.

## Korunacak Güçlü Yanlar (DOKUNMA — zaten en üst seviye)
- **Graf @id JSON-LD:** `src/utils/localBusiness.ts` `#organization` (LocalBusiness+ProfessionalService+Organization triple-type, geo, foundingDate 2005, `makesOffer`→15 `#service`), `SiteSchemas.astro` `#website` (publisher @id + speakable), `serviceSchema.ts` `#service`+`#webpage`. **@id graph zaten var.**
- **AggregateRating sorumlu:** koşullu (gerçek veri varsa), `consts.ts` tek kaynak (5.0/90 gerçek GBP), `reviews.ts`'te 7 isimli yorum. **Ceza riski YOK — güç.**
- **HowTo şeması 16 hizmet sayfasında zaten aktif.**
- **CWV temeli güçlü:** self-host variable woff2 (CDN yok) + font-display:swap, click-to-play hero LCP + fetchpriority, **0 `client:` directive** (tarayıcıya 0 byte JS), glightbox sadece galeride.
- **robots.txt dinamik route** (`src/pages/robots.txt.ts`): tüm AI crawler'lar wildcard Allow altında açık + `/api//en//ar//hizmet-bolgeleri/` Disallow + 2 sitemap + Bing/Yandex verification.
- Sitemap tip-bazlı priority; katmanlı çakışmasız CTA (mobil≠desktop); Priority-1/2 ilçeler gerçekten farklılaştırılmış; gerçek isimli vaka analizleri (E-E-A-T); iyi contact form UX.

## ⚠️ Ölü Kod Notu
`src/components/seo/LocalBusinessSchema.astro` + `ServiceSchema.astro` **hiçbir sayfa tarafından import edilmiyor** (ölü). Canlı şema `src/utils/*.ts`. Bunları düzenleme; opsiyonel temizlik.

## UI / UX Tasarım İlkeleri (kullanıcı şartı)
Yeni görsel bileşenler: **sade/göz yormayan** (mevcut palet + Inter/Montserrat, dark/light, bol negatif alan), **performanslı** (0/min client JS — Astro statik; CLS yok; ek font/lib yok), **güzel/erişilebilir** (WCAG AA, net hiyerarşi, `mb-10` standardı, mobil-öncelikli). `frontend-design` skill ile.

## Bu Turda TAMAMLANANLAR
- ✅ `localBusiness.ts` — Cumartesi 09:00-14:00 bloğu silindi (KRİTİK, memory kuralı). Build doğrulandı: Saturday=0, Mon-Fri=1, geo+aggregateRating sağlam.
- ✅ `public/robots.txt` kaldırıldı (generated route'u gölgeliyor + Disallow'ları düşürüyordu).
- ✅ `public/llms.txt` Türkçe kapsamlı yeniden yazım + `public/llms-full.txt` (route yok, çakışma yok; veri-senkronlu generator AIO opsiyonu olarak sonraya).

---

## Quick Wins (doğrulanmış, impact/effort)
| # | İş | I/E | Durum |
|---|----|-----|-------|
| 1 | Cumartesi açılış bloğunu sil | 4/1 | ✅ DONE (`localBusiness.ts`, commit 45c27cc) |
| 2 | WhatsApp panelini mobilde erişilebilir yap | 4/2 | ⏸ BEKLİYOR — mobilde BackToTop (`bottom-36`) + MobileCTA bar ile çakışma; yeniden konumlandırma + **görsel (Playwright) doğrulama** gerek |
| 3 | Hizmet pillar "İlgili Bloglar"ı konu-eşleşmeli yap | 4/2 | ✅ DONE (`hizmetler/[...slug].astro`, commit 6178b2f) |
| 4 | Lead formunda e-postayı opsiyonel yap | 3/1 | 🚫 BLOKE — sunucu tarafı `api/contact.php` doğrulaması gerek (repo'da yok) |
| 5 | Rating'i görünür yıldız + 90 yorum + link yap | 3/2 | ✅ DONE (`[district].astro`, commit 1932d44) |
| 6 | Türkçe latin-ext font subset preload | 3/1 | ✅ DONE (`SEO.astro`, Vite ?url ile hash-bağımsız, commit 4cb1c7f) |
| 7 | Hizmet Türü select'e boş placeholder | 2/1 | ⚪ ATLANDI — select'te placeholder yok ama `Diğer` fallback var + ilk hizmet otomatik seçili; düşük öncelik, gerekirse sonra |

## AIO/AEO Menüsü (kullanıcı 4'ünü onayladı — ⭐)
| İş | I/E | Durum |
|----|-----|-------|
| ⭐ **AnswerBox** (sektör/hizmet/ilçe: tek-cümle tanım + Kısa Bilgiler) | 4/3 | Onaylı |
| ⭐ **Veri-senkronlu llms.txt + llms-full.txt generator** (`scripts/`, deploy'da) | 4/3 | Onaylı (interim statik var) |
| ⭐ Malzeme/fiyat tablolarını **alıntılanabilir cümleyle** sar (`priceSummary`) | 4/2 | Onaylı |
| ⭐ `tabela-rehberi`'ye **HowTo + speakable** şema | 3/3 | Onaylı |
| Görünür "Son güncelleme" + page-level dateModified | 2/2 | Düşük öncelik |
| İlçe/sektör Service node @id graph + OfferCatalog | 2/3 | Düşük (zaten valid) |

## Phased Roadmap (quick win + AIO dışı orta öncelik)
**Dalga A — Dönüşüm & altyapı:** Cloudflare CDN front (cPanel kalır; 509/bandwidth) · off-hours "Açık/Kapalı" rozeti + Call→WhatsApp emphasis swap (yeni kart DEĞİL) · quote link'lere hizmet/ilçe context prefill · contact form hata yoluna WhatsApp fallback.
**Dalga B — Teknik SEO + şema:** `.htaccess` Brotli/immutable doğrula · sitemap `lastmod` gerçek updatedDate · video-sitemap.xml geçerlilik · ai.txt temizliği · thank-you noindex doğrula · OG image boyut/type/alt · Person author (E-E-A-T) · BlogPosting publisher→@id ref · logo ImageObject width/height.
**Dalga C — İçerik kalitesi & iç link:** ~52 spun blog konsolide/orijinalleştir (Helpful-Content) · İBB tabela yönetmeliği pillar'ı · 39 ilçe metaDescription de-dupe + priority-3 intro farklılaştır · 38-link ilçe bandını contextual yap · yüksek-niyet keyword boşlukları (tabela tamiri/LED arıza, pleksi, tente, vitrin folyo) · blog↔rehber cannibalization · galeri görsel SEO.
**Dalga D — Performans:** görseller→`astro:assets <Picture>` AVIF/srcset + boyutsuz `<img>` width/height · `global.css` scope.

## Riskler
- **Helpful-Content/scaled-content:** ~52 near-dup blog. Konsolide etmeden DAHA FAZLA üretme; 301'lerken iç link+sitemap güncelle.
- AggregateRating gerçek veri — bozma; yeni rating'de asla uydurma sayı.
- Cloudflare nameserver geçişi propagation riski (Haziran 1 sonrası; DNS/SSL Full-strict).
- E-postayı opsiyonel yapmadan `api/contact.php`'nin eksik email kabul ettiğini doğrula.
- Off-hours rozeti **client-side** olmalı (statik HTML + edge cache).
- AVIF migration markdown `<img>`'leri rehype olmadan kapsamaz — ucuz win'i ağır migration'dan ayır.

## Açık Kullanıcı/Sunucu Görevi
- cPanel `.htaccess`'te AI-bot engeli OLMADIĞINI doğrula (repo'da .htaccess yok).
- Şema değişiklikleri sonrası Google Rich Results Test.

## References
- Denetim: workflow `wf_62a8d82e-24e` (task `wssrh682j`), sonuç `/private/tmp/.../wssrh682j.output`
- Canlı şema: `src/utils/localBusiness.ts`, `serviceSchema.ts`, `SiteSchemas.astro`, `SEO.astro`
- Generated route'lar: `src/pages/{robots.txt,video-sitemap.xml}.ts`
