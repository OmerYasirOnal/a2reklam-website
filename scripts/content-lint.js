#!/usr/bin/env node
/**
 * Content Lint Script
 * Validates content collections for:
 * - Duplicate IDs across all collections
 * - Missing required frontmatter fields
 * - Ensures content integrity before build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src/content');

const COLLECTIONS = [
  'services',
  'services_en',
  'districts',
  'districts_en',
  'blog',
  'blog_en',
];

/**
 * Extract ID from content file
 * Astro generates IDs as: collection/filename (without extension)
 * This matches Astro's actual ID generation behavior
 */
function getContentId(filePath, collection) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);
  
  // If explicit ID in frontmatter, use it (prefixed with collection)
  if (data.id) {
    return `${collection}/${data.id}`;
  }
  
  // Otherwise, Astro uses: collection/filename
  const filename = path.basename(filePath, '.md');
  return `${collection}/${filename}`;
}

/**
 * Check for duplicate IDs across all collections
 */
function checkDuplicateIds() {
  console.log('🔍 Checking for duplicate content IDs...\n');
  
  const idMap = new Map(); // id -> [{ collection, file }]
  let hasErrors = false;
  
  for (const collection of COLLECTIONS) {
    const collectionPath = path.join(CONTENT_DIR, collection);
    
    if (!fs.existsSync(collectionPath)) {
      console.log(`⚠️  Collection '${collection}' not found, skipping...`);
      continue;
    }
    
    const files = glob.sync('**/*.md', { cwd: collectionPath });
    
    for (const file of files) {
      const filePath = path.join(collectionPath, file);
      const id = getContentId(filePath, collection);
      
      if (!idMap.has(id)) {
        idMap.set(id, []);
      }
      
      idMap.get(id).push({ collection, file });
    }
  }
  
  // Find duplicates
  const duplicates = [];
  for (const [id, locations] of idMap.entries()) {
    if (locations.length > 1) {
      duplicates.push({ id, locations });
    }
  }
  
  if (duplicates.length > 0) {
    hasErrors = true;
    console.error(`❌ Found ${duplicates.length} duplicate ID(s):\n`);
    
    for (const { id, locations } of duplicates) {
      console.error(`   ID: "${id}"`);
      for (const { collection, file } of locations) {
        console.error(`      - ${collection}/${file}`);
      }
      console.error('');
    }
    
    console.error('💡 Fix: Add unique "id" field to frontmatter in each file.');
    console.error('   Example: id: "service-cephe-tabela" (TR), id: "service-en-cephe-tabela" (EN)\n');
  } else {
    console.log('✅ No duplicate IDs found.\n');
  }
  
  return !hasErrors;
}

/**
 * Check for missing required fields
 */
function checkRequiredFields() {
  console.log('🔍 Checking required frontmatter fields...\n');
  
  const requiredFields = {
    services: ['title', 'description'],
    services_en: ['title', 'description'],
    districts: ['title', 'description', 'districtName'],
    districts_en: ['title', 'description', 'districtName'],
    blog: ['title', 'description', 'pubDate'],
    blog_en: ['title', 'description', 'pubDate'],
  };
  
  let hasErrors = false;
  
  for (const collection of COLLECTIONS) {
    const collectionPath = path.join(CONTENT_DIR, collection);
    
    if (!fs.existsSync(collectionPath)) {
      continue;
    }
    
    const files = glob.sync('**/*.md', { cwd: collectionPath });
    const required = requiredFields[collection] || [];
    
    for (const file of files) {
      const filePath = path.join(collectionPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      
      const missing = required.filter(field => !data[field]);
      
      if (missing.length > 0) {
        hasErrors = true;
        console.error(`❌ ${collection}/${file}`);
        console.error(`   Missing: ${missing.join(', ')}\n`);
      }
    }
  }
  
  if (!hasErrors) {
    console.log('✅ All required fields present.\n');
  }
  
  return !hasErrors;
}

/**
 * Main lint function
 */
async function lintContent() {
  console.log('📋 Content Lint: Validating content collections...\n');
  
  const duplicateCheck = checkDuplicateIds();
  const fieldsCheck = checkRequiredFields();
  
  if (duplicateCheck && fieldsCheck) {
    console.log('✅ PASSED: Content validation successful.\n');
    process.exit(0);
  } else {
    console.error('❌ FAILED: Content validation errors found.\n');
    process.exit(1);
  }
}

// Run lint
lintContent().catch(err => {
  console.error('❌ Lint script error:', err);
  process.exit(1);
});
