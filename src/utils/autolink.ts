// Gövde-içi (contextual) iç linkleme — en güçlü internal link sinyali (review rank 9).
// İlçe/sektör intro metinlerindeki hizmet terimlerini ilgili /hizmetler/ sayfasına bağlar.
// Güvenli: tüm eklemeler ORİJİNAL metinde hesaplanır, sonra tek seferde escape'lenip HTML kurulur
// (eklenen <a> tag'inin içine asla re-match olmaz). Her terim sayfa başına EN FAZLA 1 kez (linked Set
// ile dedup), toplam cap. Türkçe büyük/küçük harf için açık karakter sınıfı (/i flag I/ı sorununu önler).

interface Term { re: RegExp; href: string }

// Sıra önemli değil — href bazlı dedup var (aynı href'e giden ilk eşleşme linklenir).
const TERMS: Term[] = [
  { re: /[Kk]utu [Hh]arf(?:ler)?/, href: '/hizmetler/paslanmaz-harfler/' },
  { re: /[Pp]aslanmaz [Hh]arf(?:ler)?/, href: '/hizmetler/paslanmaz-harfler/' },
  { re: /[Iıİi]şıklı [Tt]abela/, href: '/hizmetler/isikli-tabela/' },
  { re: /[Tt]otem [Tt]abela|[Tt]otem/, href: '/hizmetler/totem/' },
  { re: /[Cc]ephe [Tt]abela/, href: '/hizmetler/cephe-tabela/' },
  { re: /[Cc]ephe [Gg]iydirme/, href: '/hizmetler/cephe-tabela/' },
  { re: /[Aa]raç [Gg]iydirme/, href: '/hizmetler/arac-giydirme/' },
  { re: /[Yy]önlendirme/, href: '/hizmetler/yonlendirme/' },
];

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * @param text  Ham paragraf metni (HTML değil)
 * @param linked  Sayfa boyunca linklenmiş href'ler (paragraflar arası dedup için paylaşılır)
 * @param maxTotal  Sayfa başına toplam link üst sınırı
 * @returns  Escape'lenmiş + autolinklenmiş HTML
 */
export function autolinkServices(text: string, linked: Set<string>, maxTotal = 4): string {
  const inserts: { start: number; end: number; href: string }[] = [];
  for (const t of TERMS) {
    if (linked.has(t.href)) continue;
    if (linked.size + inserts.length >= maxTotal) break;
    const m = t.re.exec(text);
    if (!m || m.index === undefined) continue;
    const start = m.index;
    const end = m.index + m[0].length;
    // Çakışan eklemeyi atla (örn. iki terim üst üste)
    if (inserts.some((i) => start < i.end && end > i.start)) continue;
    inserts.push({ start, end, href: t.href });
    linked.add(t.href);
  }
  if (!inserts.length) return escapeHtml(text);
  inserts.sort((a, b) => a.start - b.start);
  let out = '';
  let cursor = 0;
  for (const ins of inserts) {
    out += escapeHtml(text.slice(cursor, ins.start));
    out += `<a href="${ins.href}" class="text-primary hover:underline">${escapeHtml(text.slice(ins.start, ins.end))}</a>`;
    cursor = ins.end;
  }
  out += escapeHtml(text.slice(cursor));
  return out;
}
