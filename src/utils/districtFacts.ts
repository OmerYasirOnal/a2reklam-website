import type { District } from '../data/districts';
import type { QuickFact } from './sectorFacts';

/**
 * AEO/AIO yardımcıları — İLÇE sayfaları için alıntılanabilir özet + kısa bilgiler + FAQ.
 * İlçeler hizmet-spesifik olmadığından fiyat/dayanıklılık değerleri A2 Reklam'ın site
 * geneli aralıklarıdır (sektör materialTable başlık rakamlarıyla aynı). Fiyatlar değişirse
 * burayı güncelle. Sektör AnswerBox pattern'inin ilçe karşılığı (aynı .answerbox-* seçicileri).
 */

// Site geneli başlık fiyat aralıkları (sektör materialTable ile tutarlı).
const ISIKLI = '₺3.500–₺25.000';
const KUTU_HARF = '₺8.000–₺25.000';
const GENEL_MIN_MAX = '₺3.500 – ₺25.000';

/** Alıntılanabilir, entity-zengin tek-paragraf tanım (AI yanıt motorları doğrudan çeker). */
export function getDistrictDefinition(d: District): string {
  return `${d.name}'de profesyonel tabela imalatı ve montajı A2 Reklam tarafından yapılır: Kağıthane'deki atölyede üretim, ${d.name} dahil İstanbul'un 39 ilçesinde yerinde montaj. Işıklı tabela ${ISIKLI}, paslanmaz ve LED kutu harf ${KUTU_HARF} aralığındadır; LED kutu harf 15+ yıl dayanır. Ücretsiz keşif, 3D tasarım ve ⭐5.0/90 Google puanı.`;
}

/** AnswerBox "Kısa Bilgiler" satırları (ilçe). */
export function getDistrictQuickFacts(d: District): QuickFact[] {
  return [
    { label: 'Fiyat Aralığı', value: GENEL_MIN_MAX },
    { label: 'Dayanıklılık', value: 'LED kutu harf 15+ yıl' },
    { label: 'Hizmet Bölgesi', value: `${d.name} + 39 ilçe` },
    { label: 'Süreç', value: 'Keşif · 3D · Üretim · Montaj' },
  ];
}

/** Tek-cümle fiyat özeti (ilçe adıyla). */
export function getDistrictPriceSummary(d: District): string {
  return `${d.name}'de tabela fiyatları 2026'da işıklı tabela için ${ISIKLI}, kutu harf için ${KUTU_HARF} aralığında değişir.`;
}

/**
 * Yüksek-niyet, ilçe-agnostik FAQ — her ilçe sayfasının kendi faq'ına EKLENİR (visible + FAQPage
 * schema parity korunur). Soru/cevaplar ilçe adıyla templatelenir. Mevcut soruyla çakışmayı
 * önlemek için, ilçenin kendi faq'ında benzer soru varsa atlanır (basit anahtar-kelime kontrolü).
 */
export function getDistrictSharedFaq(d: District): Array<{ question: string; answer: string }> {
  return [
    {
      question: `${d.name}'de tabela fiyatları ne kadar?`,
      answer: `${d.name}'de işıklı tabela ${ISIKLI}, paslanmaz/LED kutu harf ${KUTU_HARF} aralığındadır. Fiyat; ebat, malzeme, aydınlatma tipi ve montaj yüksekliğine göre değişir. A2 Reklam ücretsiz keşif sonrası net fiyat verir.`,
    },
    {
      question: `${d.name}'de tabela montajı ne kadar sürer?`,
      answer: `Tasarım onayından sonra üretim 3-7 iş günü, montaj çoğu projede 1 gündür. Acil işlerde ${d.name} ve çevresine aynı hafta montaj yapılabilir; atölyemiz Kağıthane'de olduğu için Avrupa Yakası'na erişim hızlıdır.`,
    },
    {
      question: `Tabela için belediye izni gerekir mi?`,
      answer: `Cephe ve totem tabelalarda ilgili belediyeden ilan-reklam izni ve ölçü onayı gerekir. A2 Reklam, ${d.name} belediyesi başvuru sürecinde ölçülü görsel ve teknik dosya hazırlayarak yönlendirme yapar; ruhsatlandırma müşteri adına yürütülür.`,
    },
    {
      question: `Tabelada garanti veriyor musunuz?`,
      answer: `Evet. LED ve elektrik aksamına 2 yıl, kutu harf ve konstrüksiyon işçiliğine garanti verilir. LED kutu harf doğru kullanımda 15+ yıl dayanır. Arıza durumunda ${d.name} dahil tüm İstanbul'da yerinde servis sağlanır.`,
    },
  ];
}
