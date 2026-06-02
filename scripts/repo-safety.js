import { execSync } from 'node:child_process';

const output = execSync('git ls-files', { encoding: 'utf8' });
const files = output.split('\n').filter(Boolean);

// NOT (2026-06-02): Cloudflare Pages git-connect mimarisine geçildi. CF CI repo'dan
// build aldığı için galeri görselleri (public/assets/img/**) ve gerçek manifest
// (public/images-manifest.json) artık KASITLI olarak git'te tutuluyor — bunlar
// A2 Reklam'ın kendi public marketing fotoları, gizli değil. Eski cPanel/FTP
// akışındaki "img'i git'e koyma" kuralı bu yüzden kaldırıldı. AI-üretimi görseller
// (generated/) ve build/bağımlılık çıktıları hâlâ bloklu.
const blocked = files.filter((file) => {
  if (/^RES/i.test(file)) return true;
  if (file.startsWith('node_modules/')) return true;
  if (file.startsWith('dist/')) return true;
  if (file.startsWith('public/assets/generated/')) return true;
  if (file.startsWith('public/assets/img/generated/')) return true;
  return false;
});

if (blocked.length > 0) {
  console.error('Repository safety check failed. Remove tracked private assets:');
  blocked.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

console.log('Repository safety check passed.');
