#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# A2 Reklam — One-command deployment
# Usage: npm run deploy
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$PROJECT_DIR/.env.deploy"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${GREEN}[DEPLOY]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ---- Load config ----
if [ ! -f "$ENV_FILE" ]; then
  err ".env.deploy bulunamadı! Önce oluştur:\n  cp .env.deploy.example .env.deploy"
fi
source "$ENV_FILE"

[ -z "${FTP_HOST:-}" ] && err "FTP_HOST tanımlı değil"
[ -z "${FTP_USER:-}" ] && err "FTP_USER tanımlı değil"
[ -z "${FTP_PASS:-}" ] && err "FTP_PASS tanımlı değil"
[ -z "${DEPLOY_SECRET:-}" ] && err "DEPLOY_SECRET tanımlı değil"

# ---- Step 1: Build ----
log "Building site..."
cd "$PROJECT_DIR"
npm run build
BUILD_PAGES=$(find dist -name "*.html" | wc -l | tr -d ' ')
log "Build complete — ${BUILD_PAGES} pages"

# ---- Step 2: Create zip ----
log "Creating dist.zip..."
cd "$PROJECT_DIR/dist"
rm -f "$PROJECT_DIR/dist.zip"
zip -r -q "$PROJECT_DIR/dist.zip" .
ZIP_SIZE=$(du -h "$PROJECT_DIR/dist.zip" | cut -f1)
log "Zip created — ${ZIP_SIZE}"

# ---- Step 3: Upload via FTP ----
log "Uploading to ${FTP_HOST}..."
curl -s -T "$PROJECT_DIR/dist.zip" \
  "ftp://${FTP_HOST}${FTP_PATH}/dist.zip" \
  --user "${FTP_USER}:${FTP_PASS}" \
  --ssl-reqd --ftp-create-dirs \
  || curl -s -T "$PROJECT_DIR/dist.zip" \
    "ftp://${FTP_HOST}${FTP_PATH}/dist.zip" \
    --user "${FTP_USER}:${FTP_PASS}" \
    --ftp-create-dirs
log "Upload complete"

# ---- Step 4: Extract on server ----
log "Extracting on server..."
EXTRACT_URL="https://a2reklam.com/api/deploy-extract.php?secret=${DEPLOY_SECRET}"
RESULT=$(curl -s -m 60 "$EXTRACT_URL")

if echo "$RESULT" | grep -q '"ok":true'; then
  log "Server extraction successful"
  echo -e "${CYAN}$RESULT${NC}"
else
  err "Server extraction failed:\n$RESULT"
fi

# ---- Step 5: Purge LiteSpeed cache ----
log "Purging server cache..."
PURGE_URL="https://a2reklam.com/api/cache-purge.php?secret=${DEPLOY_SECRET}"
PURGE_RESULT=$(curl -s -m 30 "$PURGE_URL" 2>/dev/null || echo '{"ok":false}')
if echo "$PURGE_RESULT" | grep -q '"ok":true'; then
  log "Cache purge signal sent"
fi

# Force-refresh: touch HTML files + .htaccess modification
REFRESH_URL="https://a2reklam.com/api/force-refresh.php?secret=${DEPLOY_SECRET}"
REFRESH_RESULT=$(curl -s -m 60 "$REFRESH_URL" 2>/dev/null || echo '{"ok":false}')
if echo "$REFRESH_RESULT" | grep -q '"ok":true'; then
  log "Force refresh completed"
  echo -e "${CYAN}$REFRESH_RESULT${NC}"
else
  warn "Force refresh failed (non-critical)"
fi

# Cleanup stale .html files that conflict with directory/index.html
CLEANUP_URL="https://a2reklam.com/api/cleanup-stale.php?secret=${DEPLOY_SECRET}"
CLEANUP_RESULT=$(curl -s -m 30 "$CLEANUP_URL" 2>/dev/null || echo '{"ok":false}')
if echo "$CLEANUP_RESULT" | grep -q '"ok":true'; then
  log "Stale file cleanup done"
  echo -e "${CYAN}$CLEANUP_RESULT${NC}"
fi

# ---- Step 6: Cleanup local zip ----
rm -f "$PROJECT_DIR/dist.zip"
log "Local zip cleaned up"

# ---- Step 7: IndexNow submission (Bing + Yandex) ----
log "Submitting URLs to IndexNow (Bing/Yandex)..."
INDEXNOW_RESULT=$(node "$SCRIPT_DIR/submit-indexnow.mjs" 2>&1) || true
echo -e "${CYAN}$INDEXNOW_RESULT${NC}"

# ---- Done ----
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}  Deploy tamamlandı!${NC}"
echo -e "${GREEN}  https://a2reklam.com${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
