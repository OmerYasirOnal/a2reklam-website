# Bandwidth Recovery Roadmap

> **Olay**: 2026-05-28 — a2reklam.com 509 Bandwidth Limit Exceeded. cPanel kotası 15 GB/ay, ay daha bitmeden %101.
> **Kök neden**: Hero video `<video autoplay>` kotanın %89'unu yedi (13.4 GB / 15 GB).
> **Karar**: Cloudflare Free Plan (CDN front) + cPanel hosting. cPanel iptal etmiyoruz.
> **Yöntem**: Aşağıdaki session'lar SIRALI. Her birini ayrı chat'te aç → "Roadmap'teki Session N'ye başlamak istiyorum" de.

---

## Mevcut Durum Özeti

### AwStats Mayıs 2026 bulguları
- **6 MP4 video** = 13.4 GB (toplam kotanın %89'u)
  - `cephe-tabela-01.mp4` (hero) — **8.20 GB** | 4,893 range request
  - `babas-gastropub-02.mp4` — 1.34 GB
  - `babas-gastropub-03.mp4` — 1.08 GB
  - `babas-gastropub-01.mp4` — 1.07 GB
  - `cephe-tabela-02.mp4` — 912 MB
  - `kutu-harf-01.mp4` — 808 MB
- Robot trafiği: ~480 MB (YandexBot 124 MB, Googlebot 79 MB, bingbot 52 MB, AdsBot 49 MB, DotBot 47 MB, SemrushBot 10 MB, AhrefsBot 4 MB)
- Google IP'leri (AdsBot/Googlebot, raw hosts'tan): ~730 MB — Google Ads landing page denetimi
- Font dosyaları: ~244 MB (3 woff2) — Cloudflare cache ile sıfırlanır
- Resim/galeri bandwidth: AwStats Downloads'ta gözükmüyor → düşük
- Referrer spam (taboola, ecer, kaik.ai): düşük hacim, ihmal

### Yapılanlar ✓
- ✅ Hotlink Protection cPanel'de aktif edildi (uzantı listesi eksik — Session 2'de tamamlanacak)
- ✅ AwStats deep-dive screenshotları: `awstats-01-summary.png` … `awstats-07-downloads.png` repo kökünde
- ✅ Memory kaydedildi: `memory/project_bandwidth_kotasi.md`
- ✅ **Session 1 commit'lendi** (`0eda894`): Hero.astro click-to-play + VideoProjectsSection + videolar/[id].astro preload="none"
- ✅ **Session 1.5** (worktree `bandwidth-video-opt`): 6 saha videosu H.264 re-encode (`scripts/optimize-videos.sh`, CRF 26 + fps30 + faststart + **audio copy** + düşük-ROI CRF28 retry). **27.0 MB → 15.3 MB (−%43)**. 4 klip 120fps→30fps. Bağımsız 3-boyutlu adversarial review'dan (24 agent) geçti; teyitli script + roadmap düzeltmeleri uygulandı. Decode/audio/faststart doğrulandı. Orijinaller `.originals/` (gitignored). *June 1'e kadar deploy edilmez.*
- ✅ **Session 0.5**: Google Ads kampanyaları pause'a alındı
- ✅ **Session 0.5**: DNS yedeği cPanel Zone Editor'dan screenshot'landı

### Sırada (June 1'e kadar)
- [ ] Session 3.1 + 3.2: Cloudflare hesabı + a2reklam.com ekle + DNS scan (nameserver switch YOK)

### June 1'de yapılacak
- [ ] Site otomatik 200 dönmeye başlar (kota yenilenir)
- [ ] `npm run deploy` (Session 1 kodu canlıya gider)
- [ ] Session 3.3: Cloudflare nameserver switch (registrar'da)
- [ ] Google Ads kampanyaları resume

---

## Session 0 — Site'i geri ayağa kaldır ✅ (Option B seçildi: June 1 bekleniyor)

⚠️ Cloudflare DNS kurulumu **509'u çözmez**. Origin (cPanel) hâlâ 509 döndürürken Cloudflare proxy'lemeye çalışır, yine 509 görür.

### Option B — June 1'i bekle ✅ SEÇİLDİ
- Kota her ayın 1'inde otomatik yenilenir
- 2026-05-28 itibariyle 4 gün down
- Bekleme süresinde hazırlık (Session 0.5):
  - [x] **Google Ads pause** — site down iken reklam göstermek $ yakma
  - [x] **Session 1 kodu lokal hazır + commit'lendi** (0eda894)
  - [ ] **Cloudflare hesabı aç** (Session 3.1 + 3.2, nameserver switch YOK)
  - [x] **DNS yedeği screenshot** — cPanel Zone Editor

### June 1 sıralaması
1. Site otomatik 200 (~00:00 TR)
2. `curl -I https://a2reklam.com/` → 200 doğrula
3. `npm run deploy` → Session 1 kodu canlıya
4. Cloudflare nameserver switch (3.3 + sonrası)
5. Google Ads resume

---

## Session 1 — Hero video autoplay kaldır ✅ TAMAMLANDI (commit 0eda894)

Roadmap'ten farkı: `<video>` tag'i tamamen DOM'dan çıkarıldı. Poster `<img>` + click-to-play butonu. Video sadece tıklamada JS ile create ediliyor (`preload="none"`'dan daha agresif).

Değişen dosyalar:
- [src/components/landing/Hero.astro](src/components/landing/Hero.astro) — click-to-play pattern
- [src/components/landing/VideoProjectsSection.astro](src/components/landing/VideoProjectsSection.astro:83) — `preload="none"`
- [src/pages/videolar/[id].astro](src/pages/videolar/[id].astro:63) — `preload="none"`

---

## Session 2 — Hotlink Protection uzantı listesi tamamla (5 dk, bağımsız)

cPanel → **Security → Hotlink Protection** → "Korunmuş Uzantılar":
```
jpg,jpeg,gif,png,bmp,webp,avif,svg,mp4,mov,webm,m4v,pdf
```

> **Hotlink ↔ CDN etkileşimi (Session 3.5 Rule 2 ile):** Cloudflare canlıyken esas anti-hotlink/bandwidth kontrolü CDN cache'tir (HIT origin'e ulaşmaz → origin Referer kontrolü devre dışı kalır); cPanel Hotlink Protection cache'li asset'ler için büyük ölçüde gereksizleşir. cPanel hotlink'i `.mp4`'te tutacaksan: izinli referrer'a `a2reklam.com` + `www` ekle **ve boş referer'a izin ver** (yoksa gizlilik tarayıcıları/bazı istemciler 403 alır). Aynı-origin tıkla-oynat `<video>` tam Referer gönderir (site `strict-origin-when-cross-origin`) → normal vaka geçer; boş-referer azınlık. Doğrula: `curl -I -H 'Referer;' https://a2reklam.com/assets/videos/cephe-tabela-01.mp4` → 200/206 beklenir. (403 default'ta edge-cache'lenmez.)

---

## Session 3 — Cloudflare Free Plan kurulumu (1-2 saat) 🎯 ŞİMDİKİ İŞ (3.1 + 3.2)

> **Önkoşul**: Session 0 + Session 1 complete ✅
> **Etki**: Bandwidth %70-90 düşer
> **Risk**: Yanlış yapılırsa site 1-24h erişilemez (rollback: nameserver geri al)

### 3.1 — Cloudflare hesabı 🎯
1. https://dash.cloudflare.com/sign-up
2. Email + güçlü şifre + 2FA
3. "Add a Site" → `a2reklam.com` → **Free** → Continue

### 3.2 — DNS scan + doğrula 🎯
1. Cloudflare otomatik DNS scan yapar — **bu bir TASLAKTIR, sık sık kayıt kaçırır.** cPanel Zone Editor yedeğiyle (Session 0.5 screenshot'ları) satır satır karşılaştır.
2. **Proxy durumu — e-posta KRİTİK** (yanlışı maili çökertir):

   | Kayıt | Proxy | Neden |
   |-------|-------|-------|
   | A `a2reklam.com → 89.252.183.211` | 🟠 Proxied | Web trafiği, CDN/cache |
   | A/CNAME `www` | 🟠 Proxied | Web trafiği |
   | `MX` (10 mt-spamexperts / 20 ni-spamexperts / 30 pmg / 40 pmg2 `.guzel.net.tr`) | ⚪ DNS only | Harici GuzelHosting SpamExperts/PMG gateway'leri — zaten proxy'lenemez |
   | A `mail.a2reklam.com → 104.247.160.78` | ⚪ DNS only | Harici SpamExperts relay (ms7.guzel.net.tr) — **.211 DEĞİL**; turuncu olursa mail bağlanamaz |
   | TXT `SPF` | ⚪ DNS only | **Tek** `v=spf1` (2 tane = PermError). Düzeltme ↓ adım 3 |
   | TXT `DKIM` (`default._domainkey`) | ⚪ DNS only | Tam string, kırpma yok |
   | TXT `DMARC` (`_dmarc`) | ⚪ DNS only | — |
   | `autodiscover` / `autoconfig` | ⚪ DNS only | Mail istemci otomatik kurulumu |
   | `cpanel` / `webmail` / `ftp` | ⚪ DNS only | Servis portları / FTP proxy'lenmez |

   > ✅ **MX apex'e işaret ETMİYOR** (harici guzel.net.tr gateway'lerine gidiyor) → apex'i 🟠 Proxied yapmak **gelen e-posta için güvenli** (Cloudflare `_dc-mx` apex-proxy tuzağı burada geçersiz). Doğrula: `dig +short a2reklam.com MX` · `dig +short mail.a2reklam.com A` (→ 104.247.160.78, .211 değil).

3. **SPF düzelt — KRİTİK (apex proxy'lenince `a` mekanizması kırılır):** Canlı kayıt `v=spf1 ip4:89.252.183.210 ip4:111.11.111.11 a mx include:relay.guzelhosting.com ~all`.
   - `a` mekanizmasını **SİL**: apex A proxy'lenince `a` → Cloudflare anycast IP'sine çözülür (tüm CF IP havuzunu yetkiler + gerçek gönderen `.210`'u düşürür).
   - Gönderen host **`.210`** (mt-scuba) — web A **`.211`** ≠ mail; explicit `ip4:89.252.183.210` kalsın.
   - Stale `ip4:111.11.111.11` placeholder'ını **SİL**. `mx` + `include:relay.guzelhosting.com` kalsın.
   - **Son hâl:** `v=spf1 ip4:89.252.183.210 mx include:relay.guzelhosting.com ~all`
   - Doğrula (go-live sonrası): info@a2reklam.com → Gmail → "Show original" → SPF=pass + geçen IP `.210` (CF anycast değil).

   Sonra diğer eksik kayıtları elle ekle, stale/duplicate kaydı sil.
4. **Rollback hazırlığı (ŞİMDİ):** GuzelHosting'in mevcut nameserver'larını not al; registrar login'ini hazırla; switch günü DNSSEC'i registrar'da kapatmayı planla (açık kalırsa switch'te domain+mail erişilemez olur).
5. ⛔ "Continue to activation" / nameserver değişimine **DOKUNMA** → zone "Pending" kalır, canlıya sıfır etki, config dormant bekler.

### 3.3 — Nameserver değişikliği ⏸️ JUNE 1 SONRASI
1. Cloudflare 2 nameserver gösterir
2. Registrar'da (GuzelHosting domain panel veya başka):
   - Mevcut nameserver'ları **not al** (rollback)
   - Cloudflare nameserver'larıyla değiştir
3. "Done, Check Nameservers"
4. Propagation: 5dk - 24h

### 3.4 — İlk ayarlar (June 1 sonrası)
- **SSL/TLS → Overview**: "Full (strict)" (origin cert doğrulandı: Let's Encrypt, CN=a2reklam.com + SAN www, Tem 2026'ya geçerli — pre-flight: `echo | openssl s_client -connect 89.252.183.211:443 -servername a2reklam.com 2>/dev/null | openssl x509 -noout -subject -dates`. "Flexible" YASAK → redirect loop; cert geçersizse strict'te Error 526 → tüm site down)
- **SSL/TLS → Edge Certificates → Always Use HTTPS**: ON
- **SSL/TLS → Edge Certificates → Automatic HTTPS Rewrites**: ON
- ~~**Speed → Auto Minify**~~ ❌ **ARTIK YOK** — Cloudflare bunu Ağu 2024'te kaldırdı. Astro build'i zaten CSS/JS minify ediyor → kapsanıyor. Arama.
- **Speed → Optimization → Content → Brotli**: ON (on-the-wire sıkıştırma)
- **Caching → Configuration → Browser Cache TTL**: **"Respect Existing Headers"** (.htaccess + Cache Rules zaten yönetiyor — sabit "1 month" verme)
- **Caching → Tiered Cache**: ON → **"Smart Tiered Cache Topology"** (Free, ücretsiz; MISS'leri tek üst-tier POP'a toplar → cPanel pull'larını düşürür)
- (opsiyonel) **Caching → Configuration → Always Online**: ON — **DİKKAT:** yalnız origin TAMAMEN erişilemezken (CF 520-527) arşivden servis eder; origin **509/503/500 gibi HTTP kodu dönünce TETİKLENMEZ** (CF origin'i "online" sayar) → 2026-05-28'deki 509'da işe yaramazdı. Gerçek 509 koruması: 3.5'teki uzun edge TTL (yüksek HIT → origin'e istek gitmez) + serve-stale.

### 3.5 — Cache Rules (June 1 sonrası) — `Caching → Cache Rules`

> Not: `.mp4` + statik uzantılar Cloudflare'de **varsayılan cache'lenir** (uzantıya göre) — "Cache Everything" gerekmez. Kurallar sadece edge TTL'i uzatıp HIT oranını maksimize etmek için.

**Rule 1 — Statik asset (uzun edge):**
- Koşul: `(starts_with(http.request.uri.path, "/_astro/")) or (starts_with(http.request.uri.path, "/assets/"))`
- Aksiyon: Eligible for cache · Edge TTL: *Ignore cache-control, use TTL* → `/_astro/` **1 yıl** (hash'li, immutable), `/assets/` **1 hafta** (hash'siz → bayat-pencereyi sınırla) · Browser TTL: Respect origin
- **Status Code TTL override:** 200-206 = uzun TTL · 300-399 = 20 dk · 4xx/5xx = **no-store** (kısmi deploy'da geçici 404/5xx aylarca pinlenmesin)

**Rule 2 — Video (ürün MP4):**
- Koşul: `starts_with(http.request.uri.path, "/assets/videos/")` (tüm videolar burada; global `.mp4` clause gereksiz). **Not:** CF Cache Rules **last-match-wins** — bu kuralı Rule 1'in ALTINA koy ki video edge TTL'i kazansın.
- Aksiyon: Eligible for cache · Edge TTL **1 ay** · Browser TTL: Respect origin
- (Apache `.mp4`'leri statik servis ettiği için Content-Length + Accept-Ranges var → 206 seeking + Safari oynatma OK. Videoyu PHP'den geçirme.)

**Rule 3 — HTML:** **Öneri: kural KOYMA** → DYNAMIC kalsın, deploy'lar anında yansır. (HTML metni küçük; asıl kazanç resim+video, onlar zaten cache'leniyor. İleride HTML byte'ı sorun olursa: Eligible + Edge TTL ≤2h + deploy'da purge.)

**Rule 4 — API:** `starts_with(http.request.uri.path, "/api/")` → **Bypass cache** (PHPMailer/form/rate-limit hep origin'e gitsin)

> ⚠️ **purge-on-deploy — Rule 1 ile AYNI değişiklikte gelmeli (zorunlu önkoşul):** Uzun edge TTL + hash'siz `/assets/` = bayat dosya riski. `scripts/deploy.sh` şu an cPanel/LiteSpeed purge ediyor; CF'e geçince deploy'a **Cloudflare `purge_cache`** adımı eklenecek (prefix veya purge-everything; `/assets/*` + HTML; `/_astro/` hash-immutable → atlanabilir). Bu adım canlı olmadan Rule 1'in uzun TTL'i deploy'ları bozar.

### 3.6 — Doğrulama
- `dig a2reklam.com NS` → Cloudflare NS
- `curl -I https://a2reklam.com/` → `cf-ray:` + `server: cloudflare`
- İkinci curl → `cf-cache-status: HIT`

### Rollback
Registrar'a gir → nameserver'ları eski haline çevir → 5dk-1h içinde geri döner.

---

## Session 4 — Cloudflare doğrulama + tune (24-48h sonra, June 1 sonrası)

- Analytics & Logs → Traffic
- Cache hit ratio %80+ hedefi
- cPanel bandwidth günlük 200 MB altı hedefi

---

## Session 5 — Bot filtering (opsiyonel)

Cloudflare → Security → WAF → Custom Rules:
```
(http.user_agent contains "AhrefsBot") or
(http.user_agent contains "SemrushBot") or
(http.user_agent contains "MJ12bot") or
(http.user_agent contains "DotBot") or
(http.user_agent contains "CCBot") or
(http.user_agent contains "Velen") or
(http.user_agent contains "Bytespider")
→ Action: Block
```

⚠️ Googlebot, Bingbot, YandexBot **bloklanmaz** (SEO).

---

## Session 6 — Video stratejisi (1-2 ay sonra karar)

**Güncelleme (araştırma + Session 1.5):** H.264 re-encode **YAPILDI** (27→15.3 MB, −%43). Geriye kalan kodek/poster işleri artık **ikincil** — autoplay kalktı + CDN geliyor, sorunun aslı zaten çözüldü.

| Adım | Durum | Karar |
|------|-------|-------|
| H.264 re-compress + fps30 + audio copy | ✅ Yapıldı (Session 1.5) | 120fps düzeltildi, ses copy (yukarı-transcode önlendi), düşük-ROI klip CRF28 retry → ~%43 |
| AV1/VP9 WebM multi-source | ⏸️ Ertelendi | Klip başına sadece ~400 KB ek kazanç; ikinci kodek + `<source>` fallback bakımı buna değmez. CDN metriği "video hâlâ pahalı" derse yap |
| WebP poster dönüşümü | ⏸️ Ertelendi | Posterler 34-72 KB (gürültü); CDN zaten cache'liyor |
| HEVC/H.265 | ❌ Yapma | Chrome/Edge'de yazılım decode yok → web'de güvenilmez |
| Cloudflare Stream / R2'ye taşı | 🔭 Sadece gerekirse | Video sitenin byte'ının çoğunu yerse + ToS sınırına yaklaşırsan (şu an 6 ufak klip = sorun değil) |

> Önceki seçenekler (referans): YouTube embed (ücretsiz, SEO+), Cloudflare Stream ($5/ay), Bunny ($0.005/GB), Local+CF cache (ücretsiz, %90-95). **Local + Cloudflare cache + H.264 re-encode** mevcut çözüm; 1-2 ay CDN/origin verisi topla, gerekirse yukarı çık.

---

## Quick Reference

### URL'ler
- cPanel: https://mt-scuba.guzelhosting.com:2083 — `areklamc`
- Site: https://a2reklam.com
- IndexNow key: https://a2reklam.com/b2046b967c6a4b2c3bf5f215a3cb6c8d.txt

### Komutlar
```bash
curl -I https://a2reklam.com/
curl -I https://a2reklam.com/ | grep -i "cf-ray\|cf-cache"
dig a2reklam.com NS
npm run deploy
```

### Memory
- `memory/project_bandwidth_kotasi.md` — kalıcı not (Cloudflare iptal etme, FTP=0)
- `memory/MEMORY.md` — proje index

---

## Progress Tracker

- [x] Session 0 — Option B (June 1 bekleniyor)
  - [x] Google Ads pause
  - [x] Session 1 kodu commit'lendi (0eda894)
  - [ ] Cloudflare hesabı + DNS scan (nameserver switch'siz) ← 🎯 ŞİMDİ
  - [x] DNS yedeği screenshot
- [x] Session 1 — Hero click-to-play + preload fixes
- [x] Session 1.5 — Video H.264 re-encode (27→15.3 MB −%43, worktree `bandwidth-video-opt`, deploy June 1)
- [ ] Session 2 — Hotlink uzantı listesi
- [ ] Session 3 — Cloudflare Free kurulumu (3.1/3.2 şimdi, 3.3+ June 1 sonrası)
- [ ] Session 4 — Cloudflare doğrulama
- [ ] Session 5 — Bot filtering (opsiyonel)
- [x] Session 6 — Video stratejisi: H.264 yapıldı, AV1/poster ertelendi (CDN verisiyle tekrar bak)

---

*Last updated: 2026-05-30 (araştırma + video re-encode + bağımsız 3-boyutlu review; worktree `bandwidth-video-opt`)*
*Next: "Roadmap'teki Session 3.1 + 3.2'ye başlamak istiyorum" diyerek yeni chat aç.*
