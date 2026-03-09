/**
 * Geographic Service Areas Data
 * Single source of truth for all location pages
 *
 * Structure:
 * - Istanbul: All 39 districts (primary service area)
 *
 * Non-Istanbul provinces removed per SEO strategy:
 * doorway page risk + crawl budget waste for areas not actively served.
 */

export interface District {
  slug: string;
  trName: string;
  enName: string;
}

export interface Province {
  slug: string;
  trName: string;
  enName: string;
  districts: District[];
}

export const LOCATIONS: Province[] = [
  // Istanbul - All 39 Districts
  {
    slug: 'istanbul',
    trName: 'İstanbul',
    enName: 'Istanbul',
    districts: [
      { slug: 'adalar', trName: 'Adalar', enName: 'Adalar' },
      { slug: 'arnavutkoy', trName: 'Arnavutköy', enName: 'Arnavutkoy' },
      { slug: 'atasehir', trName: 'Ataşehir', enName: 'Atasehir' },
      { slug: 'avcilar', trName: 'Avcılar', enName: 'Avcilar' },
      { slug: 'bagcilar', trName: 'Bağcılar', enName: 'Bagcilar' },
      { slug: 'bahcelievler', trName: 'Bahçelievler', enName: 'Bahcelievler' },
      { slug: 'bakirkoy', trName: 'Bakırköy', enName: 'Bakirkoy' },
      { slug: 'basaksehir', trName: 'Başakşehir', enName: 'Basaksehir' },
      { slug: 'bayrampasa', trName: 'Bayrampaşa', enName: 'Bayrampasa' },
      { slug: 'besiktas', trName: 'Beşiktaş', enName: 'Besiktas' },
      { slug: 'beykoz', trName: 'Beykoz', enName: 'Beykoz' },
      { slug: 'beylikduzu', trName: 'Beylikdüzü', enName: 'Beylikduzu' },
      { slug: 'beyoglu', trName: 'Beyoğlu', enName: 'Beyoglu' },
      { slug: 'buyukcekmece', trName: 'Büyükçekmece', enName: 'Buyukcekmece' },
      { slug: 'catalca', trName: 'Çatalca', enName: 'Catalca' },
      { slug: 'cekmekoy', trName: 'Çekmeköy', enName: 'Cekmekoy' },
      { slug: 'esenler', trName: 'Esenler', enName: 'Esenler' },
      { slug: 'esenyurt', trName: 'Esenyurt', enName: 'Esenyurt' },
      { slug: 'eyupsultan', trName: 'Eyüpsultan', enName: 'Eyupsultan' },
      { slug: 'fatih', trName: 'Fatih', enName: 'Fatih' },
      { slug: 'gaziosmanpasa', trName: 'Gaziosmanpaşa', enName: 'Gaziosmanpasa' },
      { slug: 'gungoren', trName: 'Güngören', enName: 'Gungoren' },
      { slug: 'kadikoy', trName: 'Kadıköy', enName: 'Kadikoy' },
      { slug: 'kagithane', trName: 'Kağıthane', enName: 'Kagithane' },
      { slug: 'kartal', trName: 'Kartal', enName: 'Kartal' },
      { slug: 'kucukcekmece', trName: 'Küçükçekmece', enName: 'Kucukcekmece' },
      { slug: 'maltepe', trName: 'Maltepe', enName: 'Maltepe' },
      { slug: 'pendik', trName: 'Pendik', enName: 'Pendik' },
      { slug: 'sancaktepe', trName: 'Sancaktepe', enName: 'Sancaktepe' },
      { slug: 'sariyer', trName: 'Sarıyer', enName: 'Sariyer' },
      { slug: 'sile', trName: 'Şile', enName: 'Sile' },
      { slug: 'silivri', trName: 'Silivri', enName: 'Silivri' },
      { slug: 'sisli', trName: 'Şişli', enName: 'Sisli' },
      { slug: 'sultanbeyli', trName: 'Sultanbeyli', enName: 'Sultanbeyli' },
      { slug: 'sultangazi', trName: 'Sultangazi', enName: 'Sultangazi' },
      { slug: 'tuzla', trName: 'Tuzla', enName: 'Tuzla' },
      { slug: 'umraniye', trName: 'Ümraniye', enName: 'Umraniye' },
      { slug: 'uskudar', trName: 'Üsküdar', enName: 'Uskudar' },
      { slug: 'zeytinburnu', trName: 'Zeytinburnu', enName: 'Zeytinburnu' },
    ],
  },
];

/**
 * Get all districts across all provinces
 */
export function getAllDistricts(): Array<District & { province: string; provinceTrName: string }> {
  return LOCATIONS.flatMap(province =>
    province.districts.map(district => ({
      ...district,
      province: province.slug,
      provinceTrName: province.trName,
    }))
  );
}

/**
 * Get district by slug
 */
export function getDistrictBySlug(slug: string): (District & { province: Province }) | null {
  for (const province of LOCATIONS) {
    const district = province.districts.find(d => d.slug === slug);
    if (district) {
      return { ...district, province };
    }
  }
  return null;
}

/**
 * Get province by slug
 */
export function getProvinceBySlug(slug: string): Province | null {
  return LOCATIONS.find(p => p.slug === slug) || null;
}

/**
 * Get total district count
 */
export function getTotalDistrictCount(): number {
  return LOCATIONS.reduce((sum, province) => sum + province.districts.length, 0);
}
