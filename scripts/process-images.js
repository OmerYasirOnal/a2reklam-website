import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const SOURCE_DIR_NAME = 'RESİMLER SİTE ( YENİ )'; // We will search for this fuzzy if needed
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'assets', 'img');
const MANIFEST_PATH = path.join(process.cwd(), 'public', 'images-manifest.json');
const SIZES = [480, 960, 1600];

// Slugify helper
function slugify(text) {
    return text
        .toString()
        .normalize('NFD') // Split accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

// Find source directory
function findSourceDir() {
    const root = process.cwd();
    const dirs = fs.readdirSync(root).filter(f => fs.statSync(path.join(root, f)).isDirectory());
    // Try exact match first
    if (dirs.includes(SOURCE_DIR_NAME)) return path.join(root, SOURCE_DIR_NAME);
    // Try partial match
    const match = dirs.find(d => d.includes('RES') && d.includes('YEN'));
    return match ? path.join(root, match) : null;
}

async function processImages() {
    const sourcePath = findSourceDir();
    if (!sourcePath) {
        console.error('Source directory not found!');
        process.exit(1);
    }

    console.log(`Found source directory at: ${sourcePath}`);

    // Ensure output dir exists
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const manifest = [];
    const categories = fs.readdirSync(sourcePath).filter(f => fs.statSync(path.join(sourcePath, f)).isDirectory());

    for (const category of categories) {
        const categorySlug = slugify(category);
        const categoryPath = path.join(sourcePath, category);
        const categoryOutputDir = path.join(OUTPUT_DIR, categorySlug);

        if (!fs.existsSync(categoryOutputDir)) fs.mkdirSync(categoryOutputDir, { recursive: true });

        const files = fs.readdirSync(categoryPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
        console.log(`Processing ${category} (${files.length} images)...`);

        let index = 1;
        for (const file of files) {
            const ext = path.extname(file);
            const fileId = `${categorySlug}-${String(index).padStart(3, '0')}`;
            const baseName = `a2reklam-${fileId}`;
            const inputPath = path.join(categoryPath, file);

            const imageEntry = {
                id: fileId,
                category: categorySlug,
                category_tr: category, // Keep original folder name as rough TR label
                category_en: formatCategoryEn(categorySlug), // Helper to guess EN
                paths: {},
                alt_tr: `A2 Reklam ${category} - Örnek ${index}`,
                alt_en: `A2 Advertising ${formatCategoryEn(categorySlug)} - Example ${index}`
            };

            for (const size of SIZES) {
                // WebP
                const webpFilename = `${baseName}-${size}.webp`;
                await sharp(inputPath)
                    .resize(size)
                    .webp({ quality: 80 })
                    .toFile(path.join(categoryOutputDir, webpFilename));

                imageEntry.paths[size] = `/assets/img/${categorySlug}/${webpFilename}`;

                // AVIF (Optional, skipping for speed in first pass, or enable if needed)
                // await sharp(inputPath).resize(size).avif({ quality: 65 }).toFile(...)
            }

            // Generate full size (1600 or original limit) as 'original' fallback? 
            // For now, the 1600 is the largest.

            manifest.push(imageEntry);
            index++;
        }
    }

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`Manifest written to ${MANIFEST_PATH}`);
}

function formatCategoryEn(slug) {
    const map = {
        'cephe-tabela': 'Facade Signage',
        'totem': 'Totem Pylon',
        'kutu-harf': 'Channel Letters',
        'arac-giydirme': 'Vehicle Wrapping',
        'isikli-tabela': 'Illuminated Signs',
        'yonlendirme': 'Wayfinding',
        'banko-uygulamalari': 'Counter Branding',
        'fener-tabela': 'Blade Signs',
        'ozel-imalatlar': 'Custom Manufacturing',
        'cati-tabelasi': 'Roof Signage'
        // Add more mappings as needed
    };
    return map[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

processImages().catch(err => console.error(err));
