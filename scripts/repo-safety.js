import { execSync } from 'node:child_process';

const output = execSync('git ls-files', { encoding: 'utf8' });
const files = output.split('\n').filter(Boolean);

const blocked = files.filter((file) => {
  if (/^RES/i.test(file)) return true;
  if (file.startsWith('node_modules/')) return true;
  if (file.startsWith('dist/')) return true;
  if (file === 'public/images-manifest.json') return true;
  if (file.startsWith('public/assets/img/') && !file.startsWith('public/assets/img/demo/')) return true;
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
