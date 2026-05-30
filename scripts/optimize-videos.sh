#!/usr/bin/env bash
# ============================================================
# A2 Reklam — saha videosu re-encode (bandwidth roadmap)
# ------------------------------------------------------------
# H.264 + CRF + fps cap (30) + faststart. Pazarlama klipleri için
# kaliteyi koruyan, KÂR YOKSA orijinali bozmayan, idempotent batch.
#
# Tespit: 6 klipten 4'ü 120fps (web için gereksiz, bitrate'i şişiriyor).
# fps=30'a indirmek + makul CRF, toplam boyutu belirgin düşürür.
# Ses stream-copy edilir (kaynak ~63k AAC zaten yeterli; yukarı transcode
# byte şişirir, kalite kazandırmaz).
#
# Kullanım:
#   bash scripts/optimize-videos.sh            # CRF 26 (varsayılan, kalite-korur)
#   CRF=24 bash scripts/optimize-videos.sh     # daha yüksek kalite / daha büyük
#   CRF=28 bash scripts/optimize-videos.sh     # daha agresif / daha küçük
#
# Orijinaller .originals/ altına yedeklenir (gitignored) ve sonraki
# çalıştırmalarda HEP yedekten encode edilir → kalite üst üste düşmez.
# Geri alma:  cp public/assets/videos/.originals/*.mp4 public/assets/videos/
#        veya: git checkout -- public/assets/videos/
#
# Portatif: macOS (BSD) + Linux (GNU) — boyut okuması fsize() ile her ikisinde.
# ============================================================
set -euo pipefail

CRF="${CRF:-26}"
FPS_CAP="${FPS_CAP:-30}"
PRESET="${PRESET:-slow}"
LOW_ROI_RETRY_CRF=28          # orijinale göre çok az küçülen klip için 2. deneme

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VID_DIR="$SCRIPT_DIR/../public/assets/videos"
ORIG_DIR="$VID_DIR/.originals"

command -v ffmpeg  >/dev/null || { echo "HATA: ffmpeg bulunamadı (brew install ffmpeg)"; exit 1; }
command -v ffprobe >/dev/null || { echo "HATA: ffprobe bulunamadı"; exit 1; }

mkdir -p "$ORIG_DIR"

# Önceki çalıştırmadan kalan yarım temp dosyalarını süpür (SIGKILL/power-loss/disk-full).
rm -f "$VID_DIR"/.*.tmp.mp4 2>/dev/null || true
trap 'rm -f "$VID_DIR"/.*.tmp.mp4 2>/dev/null || true' INT TERM EXIT

fsize() { stat -f%z "$1" 2>/dev/null || stat -c%s "$1"; }   # BSD || GNU

human() { # bayt -> insan-okunur
  awk -v b="$1" 'BEGIN{ split("B KB MB GB", u); i=1; while (b>=1024 && i<4){ b/=1024; i++ } printf "%.2f %s", b, u[i] }'
}

# encode_src + vf global'lerini kullanır (döngü içinde set edilir)
encode_to() { # $1=crf  $2=output
  ffmpeg -y -loglevel error -i "$encode_src" \
    -map "0:v:0" -map "0:a:0?" \
    -c:v libx264 -crf "$1" -preset "$PRESET" -profile:v high -pix_fmt yuv420p \
    -vf "$vf" -c:a copy -movflags +faststart "$2"
}

echo "CRF=$CRF  FPS_CAP=$FPS_CAP  PRESET=$PRESET  (audio: copy)"
echo ""
printf "%-26s %11s %11s %9s %10s\n" "DOSYA" "ÖNCE" "SONRA" "KAZANÇ" "FPS"
printf '%.0s-' {1..72}; echo

total_before=0
total_after=0

shopt -s nullglob
for src in "$VID_DIR"/*.mp4; do
  name="$(basename "$src")"
  backup="$ORIG_DIR/$name"

  # İlk çalıştırmada pristine dosyayı yedekle; HER ZAMAN yedekten encode et.
  [ -f "$backup" ] || cp "$src" "$backup"
  encode_src="$backup"

  # Yedek geçerli mi? (0-byte / yarım kopya / bozuk → abort etme, atla)
  if [ ! -s "$backup" ] || ! ffprobe -v error -select_streams v:0 \
       -show_entries stream=codec_name -of csv=p=0 "$backup" >/dev/null 2>&1; then
    echo "UYARI: bozuk/eksik yedek atlandı: $name"
    continue
  fi

  # Kaynak fps → tamsayı. N/A / boş / 0/0 hepsi 0'a düşer; asla abort etmez
  # (a[2]+0>0 sayısal karşılaştırma → BSD awk'ın "A">0 string-quirk'ünü önler).
  rfr="$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$encode_src")"
  rate="$(awk -F/ -v r="$rfr" 'BEGIN{ n=split(r,a,"/"); v=(n>=2 && a[2]+0>0)?a[1]/a[2]:a[1]+0; printf "%d", (v>0?v+0.5:0) }')" || rate=0

  vf="scale=trunc(iw/2)*2:trunc(ih/2)*2"   # yuv420p için çift boyut garantisi
  fps_note="${rate}fps"
  if [ "$rate" -gt $((FPS_CAP + 1)) ]; then
    vf="fps=$FPS_CAP,$vf"
    fps_note="${rate}→${FPS_CAP}"
  fi

  # Encode (per-file hata tüm batch'i öldürmez → atla, devam et).
  tmp="$VID_DIR/.$name.tmp.mp4"
  if ! encode_to "$CRF" "$tmp"; then
    echo "HATA: encode başarısız, atlandı: $name"
    rm -f "$tmp"
    continue
  fi

  before=$(fsize "$backup")     # pristine orijinal (gösterim + toplam için)
  live=$(fsize "$src")          # mevcut canlı dosya (tut/değiştir kararı için)
  after=$(fsize "$tmp")

  # Düşük-ROI retry: orijinale göre %15'ten az küçüldüyse daha yüksek CRF dene.
  if [ "$after" -ge $((before * 85 / 100)) ] && [ "$CRF" -lt "$LOW_ROI_RETRY_CRF" ]; then
    tmp2="$VID_DIR/.$name.retry.tmp.mp4"
    if encode_to "$LOW_ROI_RETRY_CRF" "$tmp2"; then
      a2=$(fsize "$tmp2")
      if [ "$a2" -lt "$after" ]; then mv -f "$tmp2" "$tmp"; after=$a2; fps_note="${fps_note}*"; else rm -f "$tmp2"; fi
    else
      rm -f "$tmp2"
    fi
  fi

  total_before=$((total_before + before))

  # Yeni encode mevcut canlıdan küçükse değiştir; değilse koru (idempotent).
  if [ "$after" -lt "$live" ]; then
    mv -f "$tmp" "$src"
    total_after=$((total_after + after))
    pct=$(awk -v a="$after" -v b="$before" 'BEGIN{ printf "-%.0f%%", (b>0 ? (1 - a/b) * 100 : 0) }')
  else
    rm -f "$tmp"                 # kazanç yok → orijinali koru
    total_after=$((total_after + live))
    after=$live
    pct=$(awk -v a="$live" -v b="$before" 'BEGIN{ printf "-%.0f%%", (b>0 ? (1 - a/b) * 100 : 0) }')
  fi
  printf "%-26s %11s %11s %9s %10s\n" "$name" "$(human "$before")" "$(human "$after")" "$pct" "$fps_note"
done

if [ "$total_before" -eq 0 ]; then
  echo "Uyarı: işlenecek .mp4 bulunamadı (VID_DIR=$VID_DIR)"
  exit 0
fi

printf '%.0s-' {1..72}; echo
tot_pct=$(awk -v a="$total_after" -v b="$total_before" 'BEGIN{ printf "-%.0f%%", (b>0 ? (1 - a/b) * 100 : 0) }')
printf "%-26s %11s %11s %9s\n" "TOPLAM" "$(human "$total_before")" "$(human "$total_after")" "$tot_pct"
echo ""
echo "* = düşük-ROI klip CRF $LOW_ROI_RETRY_CRF ile yeniden denendi (KAZANÇ orijinale göredir)"
echo "Orijinal yedekler: $ORIG_DIR (gitignored)"
echo "Geri al: cp \"$ORIG_DIR\"/*.mp4 \"$VID_DIR\"/   (veya git checkout -- public/assets/videos/)"
