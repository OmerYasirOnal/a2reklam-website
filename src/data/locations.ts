/**
 * Geographic Service Areas Data
 * Single source of truth for all location pages
 * 
 * Structure:
 * - Istanbul: All 39 districts
 * - Surrounding provinces: Kocaeli, Sakarya, Tekirdağ, Edirne, Kırklareli, Yalova, Bursa
 */

export interface District {
  slug: string;
  trName: string;
  enName: string;
  arName?: string;
}

export interface Province {
  slug: string;
  trName: string;
  enName: string;
  arName?: string;
  districts: District[];
}

export const LOCATIONS: Province[] = [
  // Istanbul - All 39 Districts
  {
    slug: 'istanbul',
    trName: 'İstanbul',
    enName: 'Istanbul',
    arName: 'إسطنبول',
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

  // Kocaeli Province
  {
    slug: 'kocaeli',
    trName: 'Kocaeli',
    enName: 'Kocaeli',
    arName: 'كوجه إيلي',
    districts: [
      { slug: 'gebze', trName: 'Gebze', enName: 'Gebze' },
      { slug: 'izmit', trName: 'İzmit', enName: 'Izmit' },
      { slug: 'darica', trName: 'Darıca', enName: 'Darica' },
      { slug: 'derince', trName: 'Derince', enName: 'Derince' },
      { slug: 'golcuk', trName: 'Gölcük', enName: 'Golcuk' },
      { slug: 'kandira', trName: 'Kandıra', enName: 'Kandira' },
      { slug: 'karamursel', trName: 'Karamürsel', enName: 'Karamursel' },
      { slug: 'kartepe', trName: 'Kartepe', enName: 'Kartepe' },
      { slug: 'korfez', trName: 'Körfez', enName: 'Korfez' },
      { slug: 'cayirova', trName: 'Çayırova', enName: 'Cayirova' },
      { slug: 'basiskele', trName: 'Başiskele', enName: 'Basiskele' },
      { slug: 'dilovasi', trName: 'Dilovası', enName: 'Dilovasi' },
    ],
  },

  // Sakarya Province
  {
    slug: 'sakarya',
    trName: 'Sakarya',
    enName: 'Sakarya',
    arName: 'سكاريا',
    districts: [
      { slug: 'adapazari', trName: 'Adapazarı', enName: 'Adapazari' },
      { slug: 'akyazi', trName: 'Akyazı', enName: 'Akyazi' },
      { slug: 'arifiye', trName: 'Arifiye', enName: 'Arifiye' },
      { slug: 'erenler', trName: 'Erenler', enName: 'Erenler' },
      { slug: 'ferizli', trName: 'Ferizli', enName: 'Ferizli' },
      { slug: 'geyve', trName: 'Geyve', enName: 'Geyve' },
      { slug: 'hendek', trName: 'Hendek', enName: 'Hendek' },
      { slug: 'karapurcek', trName: 'Karapürçek', enName: 'Karapurcek' },
      { slug: 'karasu', trName: 'Karasu', enName: 'Karasu' },
      { slug: 'kaynarca', trName: 'Kaynarca', enName: 'Kaynarca' },
      { slug: 'kocaali', trName: 'Kocaali', enName: 'Kocaali' },
      { slug: 'pamukova', trName: 'Pamukova', enName: 'Pamukova' },
      { slug: 'sapanca', trName: 'Sapanca', enName: 'Sapanca' },
      { slug: 'serdivan', trName: 'Serdivan', enName: 'Serdivan' },
      { slug: 'sogutlu', trName: 'Söğütlü', enName: 'Sogutlu' },
      { slug: 'tarakli', trName: 'Taraklı', enName: 'Tarakli' },
    ],
  },

  // Tekirdağ Province
  {
    slug: 'tekirdag',
    trName: 'Tekirdağ',
    enName: 'Tekirdag',
    arName: 'تكيرداغ',
    districts: [
      { slug: 'cerkezkoy', trName: 'Çerkezköy', enName: 'Cerkezkoy' },
      { slug: 'corlu', trName: 'Çorlu', enName: 'Corlu' },
      { slug: 'ergene', trName: 'Ergene', enName: 'Ergene' },
      { slug: 'hayrabolu', trName: 'Hayrabolu', enName: 'Hayrabolu' },
      { slug: 'kapakli', trName: 'Kapaklı', enName: 'Kapakli' },
      { slug: 'malkara', trName: 'Malkara', enName: 'Malkara' },
      { slug: 'marmaraereglisi', trName: 'Marmara Ereğlisi', enName: 'Marmaraereglisi' },
      { slug: 'muratli', trName: 'Muratlı', enName: 'Muratli' },
      { slug: 'saray', trName: 'Saray', enName: 'Saray' },
      { slug: 'suleymanpasa', trName: 'Süleymanpaşa', enName: 'Suleymanpasa' },
      { slug: 'sarkoy', trName: 'Şarköy', enName: 'Sarkoy' },
    ],
  },

  // Edirne Province
  {
    slug: 'edirne',
    trName: 'Edirne',
    enName: 'Edirne',
    arName: 'أدرنة',
    districts: [
      { slug: 'edirne-merkez', trName: 'Edirne Merkez', enName: 'Edirne Center' },
      { slug: 'enez', trName: 'Enez', enName: 'Enez' },
      { slug: 'havsa', trName: 'Havsa', enName: 'Havsa' },
      { slug: 'ipsala', trName: 'İpsala', enName: 'Ipsala' },
      { slug: 'kesan', trName: 'Keşan', enName: 'Kesan' },
      { slug: 'lalapasa', trName: 'Lalapaşa', enName: 'Lalapasa' },
      { slug: 'meric', trName: 'Meriç', enName: 'Meric' },
      { slug: 'suloglu', trName: 'Süloğlu', enName: 'Suloglu' },
      { slug: 'uzunkopru', trName: 'Uzunköprü', enName: 'Uzunkopru' },
    ],
  },

  // Kırklareli Province
  {
    slug: 'kirklareli',
    trName: 'Kırklareli',
    enName: 'Kirklareli',
    arName: 'قرقلر إيلي',
    districts: [
      { slug: 'kirklareli-merkez', trName: 'Kırklareli Merkez', enName: 'Kirklareli Center' },
      { slug: 'babaeski', trName: 'Babaeski', enName: 'Babaeski' },
      { slug: 'demirkoy', trName: 'Demirköy', enName: 'Demirkoy' },
      { slug: 'kofcaz', trName: 'Kofçaz', enName: 'Kofcaz' },
      { slug: 'luleburgaz', trName: 'Lüleburgaz', enName: 'Luleburgaz' },
      { slug: 'pehlivankoy', trName: 'Pehlivanköy', enName: 'Pehlivankoy' },
      { slug: 'pinarhisar', trName: 'Pınarhisar', enName: 'Pinarhisar' },
      { slug: 'vize', trName: 'Vize', enName: 'Vize' },
    ],
  },

  // Yalova Province
  {
    slug: 'yalova',
    trName: 'Yalova',
    enName: 'Yalova',
    arName: 'يالوفا',
    districts: [
      { slug: 'yalova-merkez', trName: 'Yalova Merkez', enName: 'Yalova Center' },
      { slug: 'altinova', trName: 'Altınova', enName: 'Altinova' },
      { slug: 'armutlu', trName: 'Armutlu', enName: 'Armutlu' },
      { slug: 'cinarcik', trName: 'Çınarcık', enName: 'Cinarcik' },
      { slug: 'ciftlikkoy', trName: 'Çiftlikköy', enName: 'Ciftlikkoy' },
      { slug: 'termal', trName: 'Termal', enName: 'Termal' },
    ],
  },

  // Bursa Province (Major districts)
  {
    slug: 'bursa',
    trName: 'Bursa',
    enName: 'Bursa',
    arName: 'بورصة',
    districts: [
      { slug: 'osmangazi', trName: 'Osmangazi', enName: 'Osmangazi' },
      { slug: 'nilufer', trName: 'Nilüfer', enName: 'Nilufer' },
      { slug: 'yildirim', trName: 'Yıldırım', enName: 'Yildirim' },
      { slug: 'gemlik', trName: 'Gemlik', enName: 'Gemlik' },
      { slug: 'gursu', trName: 'Gürsu', enName: 'Gursu' },
      { slug: 'inegol', trName: 'İnegöl', enName: 'Inegol' },
      { slug: 'iznik', trName: 'İznik', enName: 'Iznik' },
      { slug: 'karacabey', trName: 'Karacabey', enName: 'Karacabey' },
      { slug: 'kestel', trName: 'Kestel', enName: 'Kestel' },
      { slug: 'mudanya', trName: 'Mudanya', enName: 'Mudanya' },
      { slug: 'mustafakemalpasa', trName: 'Mustafakemalpaşa', enName: 'Mustafakemalpasa' },
      { slug: 'orhangazi', trName: 'Orhangazi', enName: 'Orhangazi' },
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
