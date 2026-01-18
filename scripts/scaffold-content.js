import fs from 'fs';
import path from 'path';

const MANIFEST_PATH = path.join(process.cwd(), 'public', 'images-manifest.json');
const SERVICES_DIR = path.join(process.cwd(), 'src', 'content', 'services');

// Ensure dir exists
if (!fs.existsSync(SERVICES_DIR)) fs.mkdirSync(SERVICES_DIR, { recursive: true });

function formatCategoryEn(slug) {
    const map = {
        'cephe-tabela': 'Facade Signage',
        'totem': 'Totem Pylon',
        'kutu-harf': 'Channel Letters',
        'arac-giydirme': 'Vehicle Wrapping',
        'isikli-tabela': 'Illuminated Signs',
        'yonlendirme': 'Wayfinding'
    };
    return map[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

try {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    const categories = [...new Set(manifest.map((m) => m.category))];

    categories.forEach((catSlug) => {
        // Find a representative image
        const rep = manifest.find((m) => m.category === catSlug);
        const titleTr = rep.category_tr;
        // const titleEn = rep.category_en; // Not used in TR file

        // TR File
        const trPath = path.join(SERVICES_DIR, `${catSlug}.md`);
        if (!fs.existsSync(trPath)) {
            const content = `---
title: "${titleTr}"
description: "İstanbul ${titleTr} imalatı ve montajı. En uygun fiyat ve kaliteli malzeme garantisi ile hizmetinizdeyiz."
heroImage: "${rep.paths['1600']}"
features:
  - "Garantili Malzeme"
  - "Profesyonel Tasarım"
  - "Hızlı Montaj"
---

## ${titleTr} Hakkında

A2 Reklam olarak **${titleTr}** konusunda yılların verdiği tecrübe ile hizmet sunuyoruz. İstanbul genelinde yüzlerce referansımız ile işletmeniz için en dikkat çekici çözümleri üretiyoruz.

### Neden Biz?
Kaliteli malzeme, uzman işçilik ve zamanında teslimat prensiplerimizle çalışıyoruz.

(Bu içerik taslaktır. Detaylandırılmalıdır.)
`;
            fs.writeFileSync(trPath, content);
            console.log(`Created TR service: ${catSlug}.md`);
        }
    });

    // Handle EN
    const SERVICES_EN_DIR = path.join(process.cwd(), 'src', 'content', 'services_en');

    if (!fs.existsSync(SERVICES_EN_DIR)) fs.mkdirSync(SERVICES_EN_DIR, { recursive: true });

    categories.forEach((catSlug) => {
        const rep = manifest.find((m) => m.category === catSlug);
        const titleEn = rep.category_en;

        const enPath = path.join(SERVICES_EN_DIR, `${catSlug}.md`);
        if (!fs.existsSync(enPath)) {
            const content = `---
title: "${titleEn}"
description: "Professional ${titleEn} services in Istanbul. High quality manufacturing and installation."
heroImage: "${rep.paths['1600']}"
features:
  - "Guaranteed Materials"
  - "Professional Design"
  - "Fast Installation"
---

## About ${titleEn}

As A2 Advertising, we offer professional solutions for **${titleEn}**. We help your business stand out with our experience and quality.
`;
            fs.writeFileSync(enPath, content);
            console.log(`Created EN service: ${catSlug}.md`);
        }
    });

} catch (e) {
    console.error(e);
}
