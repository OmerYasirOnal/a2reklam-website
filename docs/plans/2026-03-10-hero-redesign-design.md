# Hero Redesign: Diagonal Split Layout

## Summary
Replace the current full-width image slider hero with a modern diagonal split layout featuring typewriter-animated text on the left and a looping video showcase on the right.

## Layout
- Min-height: 75vh
- Left side (~55%): Dark background (#0B0F14), text content + CTAs
- Right side (~45%): Video area clipped with diagonal `clip-path`
- Diagonal edge: Gold (#C9A227) glow accent

## Left Content
1. Badge: "2005'TEN BERİ" gold pill
2. Title with typewriter: "Premium [rotating word] ve Reklam Çözümleri"
   - Words: Tabela, Totem, Cephe Tabelası, Araç Giydirme, Işıklı Harf
   - Gold color for rotating word, white for rest
   - Type speed: 80ms/char, delete: 50ms/char, pause: 3s
3. Subtitle: existing description text
4. CTA buttons: Hemen Ara, WhatsApp, Teklif Al (existing styles)

## Right Video
- `<video autoplay muted loop playsinline>`
- `clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%)`
- Light dark overlay for contrast
- Gold glow along diagonal edge
- Poster image for LCP, fallback to static image if no video

## Responsive
- Desktop (lg+): Side-by-side diagonal split
- Tablet (md): Softened diagonal
- Mobile (<md): Stacked — video top (40vh, no clip), text below

## Animations (on load)
- Left content: fadeInLeft 0.6s
- Right video: fadeInRight 0.6s, 0.2s delay
- Badge: fadeInDown 0.4s
- CTA buttons: staggered fadeInUp 0.1s apart
- All respect `prefers-reduced-motion`

## Preserved
- Bilingual support (TR/EN)
- Dark/Light mode
- Accessibility (aria-labels, contrast ratios)
- LCP optimization

## Removed
- Image slider (replaced by video)
- KPI strip (not needed)
