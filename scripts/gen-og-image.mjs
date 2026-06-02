// 1200×630 varsayılan OG görseli üretir (social/AI kart önizlemesi).
// Kozmik koyu zemin + altın aksan + logo + marka metni. Çıktı: public/brand/og-default.jpg
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const W = 1200, H = 630;
const GOLD = '#C9A227';

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#15193a"/>
      <stop offset="48%" stop-color="#11132a"/>
      <stop offset="100%" stop-color="#0b0c18"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="22%" r="55%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="20%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>
  <rect x="0" y="0" width="${W}" height="8" fill="${GOLD}"/>

  <!-- Metin bloğu (sağ taraf; logo solda composite edilecek) -->
  <text x="470" y="250" font-family="Helvetica, Arial, sans-serif" font-size="96" font-weight="700" fill="#ffffff" letter-spacing="2">A2 REKLAM</text>
  <rect x="472" y="282" width="120" height="6" rx="3" fill="${GOLD}"/>
  <text x="470" y="350" font-family="Helvetica, Arial, sans-serif" font-size="44" font-weight="600" fill="#f3f4f6">Kurumsal Tabela İmalatı &amp; Montaj</text>
  <text x="470" y="406" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="400" fill="#cbd5e1">İstanbul · Cephe · Işıklı · Kutu Harf · Totem</text>
  <text x="470" y="500" font-family="Helvetica, Arial, sans-serif" font-size="36" font-weight="700" fill="${GOLD}">a2reklam.com</text>
</svg>`;

const logoBuf = await sharp(resolve(root, 'public/brand/a2reklam-logo.png'))
  .resize(300, 300, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logoBuf, top: 165, left: 110 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(resolve(root, 'public/brand/og-default.jpg'));

console.log('OG görseli üretildi: public/brand/og-default.jpg (1200×630)');
