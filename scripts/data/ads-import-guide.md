# A2 Reklam — Google Ads Import Rehberi (v2 — İter#22, 2026-04-17)

4 kampanya, 6 CSV dosyası, tek import akışı. Google Ads Editor üzerinden sırayla yükle.

## 🔧 Ön Hazırlık

1. **Google Ads Editor indir**: https://ads.google.com/intl/tr/home/tools/ads-editor/
2. Editor'ı aç → `A2 Reklam` hesabını seç → **Download Recent Changes** (tüm güncel yapıyı indir)
3. Terminalde çalıştır:
   ```bash
   npm run ads:build     # 6 CSV'yi yeniden üret
   npm run ads:audit     # hataları/duplikelere karşı kontrol
   ```
   Audit `✓ Tum CSV'ler temiz` derse import'a hazır.

## 📋 Import Sırası (önemli!)

Her import'tan sonra Editor'de **Preview** çıkar, sorun yoksa **Post** (canlıya gönder) tıkla.

### Adım 1 — NEGATİF LİSTE (ÖNCE bu!)
**Dosya:** `scripts/data/google-ads-negatives-import.csv` (564 satır)

Niye önce: Boş yere para yakmayı anında durdurur. Yeni keyword'ler geldiğinde zaten negatifleri uyguluyor olur.

İçerik:
- **41 şehir** (İstanbul dışı Türkiye illeri + yurt dışı)
- **22 rakip marka** (armut, eraytabela, cebireklam, 3mreklam, dogauneon, protabela, brdreklam, evok, neuneon, artastabela, eymenreklam)
- **14 iş arayan** (is ilani, eleman, usta, stajyer, kalfa, çırak)
- **14 eğitim/akademik** (tabela tasarla, ödev, öğrenci, tez)
- **7 e-ticaret** (hepsiburada, trendyol, sahibinden, n11, amazon)
- **17 fiyat/satıcı** (bedava, ucuz, toptan, tedarikçi)
- **7 DIY** (nasıl yapılır, kendim, evde)
- **13 alakasız** (trafik tabelası, mezar taşı, sosyal medya, reklam filmi)

### Adım 2 — CORE KEYWORDS
**Dosya:** `scripts/data/google-ads-keywords-import.csv` (156 satır)

- **7 Champion (Exact):** `pleksi harf kutu`, `isikli tabela ornekleri`, `arac kaplama esenyurt`, `kuyumcu tabela`, `tabela imalatcilari`, `tabelaci istanbul`, `elektrikli tabela` — bunlar proven yüksek CTR, öncelikli bid yap
- **41 Core (Phrase):** 4 kampanyanın çekirdek hizmet kelimeleri
- **108 Long-tail:** 18 top ilçe × 6 hizmet (Esenyurt, Beylikdüzü, Kadıköy, Çekmeköy + merkezi kurumsal ilçeler)

### Adım 3 — KURUMSAL KEYWORDS
**Dosya:** `scripts/data/google-ads-corporate-keywords.csv` (57 satır)

3 kampanyaya (Işıklı-LED, Kutu-Harf, Dijital-Baskı) AVM/plaza/kurumsal/fabrika/hastane/otel kombineleri ekler. Cephe-Totem zaten Core'da karşılıyor.

### Adım 4 — RSA REKLAMLAR
**Dosya:** `scripts/data/google-ads-rsa-import.csv` (4 satır, 1 satır = 1 reklam)

Her kampanya için 15 başlık + 4 açıklama + 2 path. Pin stratejisi:
- Position 1 pin → kampanyanın ana başlığı (örn. "Kurumsal Tabela İstanbul")
- Position 2 pin → sosyal kanıt ("2.500+ Proje 5.0/90")
- Diğer 13 başlık unpinned → Google optimize eder

### Adım 5 — SİTELINKS (per-campaign özel)
**Dosya:** `scripts/data/google-ads-sitelinks.csv` (32 satır = 4 × 8)

Her kampanyanın kendi landing URL'lerine bağlı. Örnek:
- Işıklı-LED → `/hizmetler/isikli-tabela/` + `/hizmetler/paslanmaz-harfler/`
- Kutu-Harf → `/hizmetler/paslanmaz-harfler/` + `/hizmetler/cephe-tabela/`
- Cephe-Totem → `/kurumsal-tabela/` + `/avm-tabelasi/` + `/plaza-tabelasi/` + `/fabrika-tabelasi/`

### Adım 6 — CALLOUTS
**Dosya:** `scripts/data/google-ads-callouts.csv` (48 satır = 4 × 12)

12 callout (Google 4-6 gösterir). Hiyerarşi:
1. Güven/otorite (2005'ten beri, 2.500+ proje, 5.0/90 Google, Kendi atölye)
2. Differentiator (Aracısız, Ücretsiz keşif, Aynı gün teklif)
3. Kalite (2 yıl garanti, IP65, CNC lazer)
4. Hedef (AVM & Plaza, İstanbul 39 ilçe)

### Adım 7 — STRUCTURED SNIPPETS
**Dosya:** `scripts/data/google-ads-snippets.csv` (12 satır = 4 × 3 header)

3 header:
- `Service catalog` → hizmet listesi
- `Types` → sektör türleri (AVM, Plaza, Hastane, Otel, Fabrika, Okul, Restoran, Banka)
- `Neighborhoods` → ilçe listesi

**Not:** Önceki versiyonda yanlış "Brands" header kullanılmıştı — Google bunu gerçek markalar (Samsung, Apple) için bekler. v2'de düzeltildi.

## 🎯 Google Ads Editor'de Import Adımları

1. **File → Import → Multiple files** (veya tek tek)
2. Yukarıdaki 6 dosyayı seç
3. **Preview** sekmesinde Editor farkları gösterir:
   - Yeşil satır → yeni eklenecek
   - Sarı satır → değiştirilecek
   - Kırmızı satır → silinecek (dikkat!)
4. Sorun yoksa **Post** butonuna bas

## ⚙️ Google Ads UI'da MANUEL Ayarlar (Editor'de import edilemez)

Bunlar UI'dan yapılır:

### Hedef Konum (Location targeting)
- **Sadece İstanbul** seç (il bazında)
- Advanced → **People in or regularly in your targeted locations** (presence targeting) — "Interest" değil
- Excluded: **Hiçbir şey** (negatif listedeki şehirler zaten sorguları filtreliyor)

### Zaman Planlaması (Ad schedule)
Mesai saatleri dışı telefon kapalı — o saatlerde bid'i düşür:
- Pzt-Cuma 09:00-18:00 → **+%0** (normal)
- Cumartesi 09:00-14:00 → **+%0**
- Cmt 14:00 sonrası, Pazar → **-%50** (düşük bid)
- Gece 22:00-08:00 → **-%50**

### Cihaz Bid Ayarı
- Mobile → **+%20** (telefon araması ana dönüşüm)
- Tablet → **-%30** (düşük dönüşüm)
- Desktop → **+%0**

### Bid Stratejisi
- **Champions (Exact) için:** Maximize conversions (bütçe sınırı altında)
- **Core + Long-tail için:** Target CPA (hedef dönüşüm başı maliyet: ₺500-₺700 başlangıç)
- İlk 2 hafta verisi olmadığı için **Manual CPC** olarak başla, sonra otomatize et

### Günlük Bütçe
Mevcut: ₺1.000/gün (memory'den). Kampanya dağılımı:
- Cephe-Totem-Genel → %40 (₺400) — kurumsal landing var, en yüksek değer
- Kutu-Harf-Tabela → %25 (₺250) — champion %100 CTR var
- Isikli-Tabela-LED → %20 (₺200)
- Dijital-Baski-Arac-Giydirme → %15 (₺150)

### Conversion Tracking
Site'de zaten var (`TrackingEvents.astro` → `ads_conversion` dataLayer):
- `call_click` (tel tıklama)
- `whatsapp_click` (WA tıklama)
- `quote_click` (teklif formu)

GTM → Google Ads conversion action oluştur:
1. GTM → Tags → + Google Ads Conversion Tracking
2. Trigger: `ads_conversion` dataLayer event
3. Google Ads → Tools → Conversions → **Import from GTM**

## 📊 İmport Sonrası Kontroller

İmport'tan 24-48 saat sonra:

1. **Disapproved ads** var mı? Google policy violations kontrolü
2. **Quality Score** → ortalama 7+ hedef, 5 altındakileri kaldır
3. **Search terms report** → 7 gün sonra yeni negatif adayları çıkar
4. **Auction insights** → rakiplerle çakışma değişikliği

## 🔄 Yenileme Akışı

Kelime listesini güncellediğinde:
```bash
# 1. Script'leri düzenle (örn scripts/generate-keyword-csv.mjs)
# 2. Yeniden üret
npm run ads:build

# 3. Audit çalıştır — hata varsa import yapma
npm run ads:audit

# 4. Google Ads Editor → Import Multiple Files
```

## 📁 Dosya Özeti

| Dosya | Satır | Ne | Öncelik |
|-------|-------|-----|---------|
| `google-ads-negatives-import.csv` | 564 | 141 negatif × 4 kampanya | ⭐ ÖNCE |
| `google-ads-keywords-import.csv` | 156 | Champion + Core + Long-tail | ⭐⭐⭐ |
| `google-ads-corporate-keywords.csv` | 57 | Kurumsal kombineler | ⭐⭐ |
| `google-ads-rsa-import.csv` | 4 | 4 RSA reklam | ⭐⭐⭐ |
| `google-ads-sitelinks.csv` | 32 | Per-campaign sitelinks | ⭐⭐ |
| `google-ads-callouts.csv` | 48 | 12 callout × 4 kampanya | ⭐ |
| `google-ads-snippets.csv` | 12 | 3 header × 4 kampanya | ⭐ |

## 🎛 v1 vs v2 Karşılaştırma

| Asset | v1 | v2 | Değişim |
|-------|----|----|--------|
| Keywords | 639 | 156 | %76 daralma (noise kaldırıldı) |
| Corporate | 128 | 57 | Duplicate temizlendi |
| Negatives | 100 | 564 | %464 genişleme (rakip + şehir + iş) |
| Sitelinks | 32 (tümü aynı) | 32 (per-campaign) | Relevance boost |
| Callouts | 80 | 48 | 20→12 daraltma |
| Snippets | "Brands" (yanlış) | "Types" + "Service catalog" | Header fix |
| RSA | Manuel (UI) | CSV (Editor import) | 4 reklam otomatik |

## 🚨 Olası Hatalar

- **"Keyword already exists"** → Editor önceki versiyonu silmez; önce v1 keyword'leri "Remove" ile temizle, sonra v2 "Add" yap. Ya da "Merge" ile ilgili değişiklikleri değiştir.
- **"Disapproved: Trademark"** → Rakip markalarını reklam metninde kullanma (biz sadece negatif olarak kullanıyoruz, sorun olmamalı).
- **"Final URL doesn't match domain"** → Site canlı ve crawlable olmalı. `curl -I https://a2reklam.com/kurumsal-tabela/` ile 200 dönüyor mu kontrol et.

---

**İleride yapılabilecek iyileştirmeler** (şimdilik dışarıda):
- Ad group'ları daraltmak (Kutu-Harf → pleksi/paslanmaz/led-kutu-harf alt grupları)
- Remarketing liste kurulumu
- Performance Max kampanyası (ayrı bütçe ile)
- Dinamik Search Ads (DSA) — sitedeki 208 sayfayı Google otomatik eşler
