import fs from 'fs';
import path from 'path';

const PRIMARY_MANIFEST = path.join(process.cwd(), 'public', 'images-manifest.json');
const DEMO_MANIFEST = path.join(process.cwd(), 'public', 'images-manifest.demo.json');

export function loadImagesManifest(): any[] {
  const candidates = [PRIMARY_MANIFEST, DEMO_MANIFEST];

  for (const manifestPath of candidates) {
    if (!fs.existsSync(manifestPath)) continue;
    try {
      const raw = fs.readFileSync(manifestPath, 'utf8');
      return JSON.parse(raw);
    } catch (error) {
      console.error(`Failed to read image manifest at ${manifestPath}`, error);
    }
  }

  console.warn('No image manifest found. Using empty image list.');
  return [];
}
