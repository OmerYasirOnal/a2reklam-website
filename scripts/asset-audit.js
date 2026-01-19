#!/usr/bin/env node
/**
 * Asset Audit Script
 * Scans built HTML files for asset references and verifies they exist.
 * Fails CI if any local assets are missing (404).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// Asset patterns to check
const ASSET_PATTERNS = [
  /<img[^>]+src=["']([^"']+)["']/gi,
  /<source[^>]+srcset=["']([^"']+)["']/gi,
  /<link[^>]+href=["']([^"']+\.(?:css|ico|png|webp|jpg|jpeg|svg))["']/gi,
];

/**
 * Parse srcset format: "url 1x, url 2x"
 */
function parseSrcset(srcset) {
  return srcset
    .split(',')
    .map(s => s.trim().split(/\s+/)[0])
    .filter(Boolean);
}

/**
 * Check if URL is external or data URI
 */
function isExternal(url) {
  return url.startsWith('http://') ||
         url.startsWith('https://') ||
         url.startsWith('//') ||
         url.startsWith('data:') ||
         url.startsWith('blob:');
}

/**
 * Normalize path for comparison
 */
function normalizePath(url) {
  // Remove query params and hash
  const cleanUrl = url.split('?')[0].split('#')[0];
  // Remove leading slash for file system checks
  return cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl;
}

/**
 * Remove script tags from HTML to avoid false positives from JS code
 */
function removeScriptTags(html) {
  return html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '');
}

/**
 * Extract all asset URLs from HTML content
 */
function extractAssets(html) {
  // Remove script tags to avoid matching template literals in JS code
  const cleanHtml = removeScriptTags(html);
  
  const assets = new Set();
  
  for (const pattern of ASSET_PATTERNS) {
    let match;
    while ((match = pattern.exec(cleanHtml)) !== null) {
      const rawUrl = match[1];
      
      // Handle srcset
      if (rawUrl.includes(',') || rawUrl.includes(' ')) {
        const urls = parseSrcset(rawUrl);
        urls.forEach(u => assets.add(u));
      } else {
        assets.add(rawUrl);
      }
    }
  }
  
  return Array.from(assets);
}

/**
 * Main audit function
 */
async function auditAssets() {
  console.log('🔍 Asset Audit: Scanning built site...\n');
  
  if (!fs.existsSync(DIST)) {
    console.error('❌ Error: dist/ folder not found. Run npm run build first.');
    process.exit(1);
  }
  
  // Find all HTML files
  const htmlFiles = await glob('**/*.html', { cwd: DIST });
  
  if (htmlFiles.length === 0) {
    console.error('❌ No HTML files found in dist/');
    process.exit(1);
  }
  
  console.log(`Found ${htmlFiles.length} HTML files to scan.\n`);
  
  const allAssets = new Set();
  const missingAssets = new Set();
  
  // Scan each HTML file
  for (const htmlFile of htmlFiles) {
    const htmlPath = path.join(DIST, htmlFile);
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const assets = extractAssets(html);
    
    for (const asset of assets) {
      if (isExternal(asset)) continue;
      
      allAssets.add(asset);
      
      const normalizedPath = normalizePath(asset);
      const assetPath = path.join(DIST, normalizedPath);
      
      if (!fs.existsSync(assetPath)) {
        missingAssets.add(asset);
      }
    }
  }
  
  console.log(`Total local assets referenced: ${allAssets.size}`);
  
  if (missingAssets.size > 0) {
    console.error(`\n❌ FAILED: ${missingAssets.size} missing asset(s):\n`);
    for (const missing of Array.from(missingAssets).sort()) {
      console.error(`   - ${missing}`);
    }
    console.error('\n💡 Fix: Ensure all referenced assets exist in public/ or are generated correctly.\n');
    process.exit(1);
  }
  
  console.log('✅ PASSED: All referenced assets exist.\n');
  process.exit(0);
}

// Run audit
auditAssets().catch(err => {
  console.error('❌ Audit script error:', err);
  process.exit(1);
});
