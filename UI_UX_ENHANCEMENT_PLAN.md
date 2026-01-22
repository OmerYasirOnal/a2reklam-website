# A2 Reklam UI/UX Enhancement Plan

> **Branch:** `feature/ui-ux-gallery-theme-20260122`
> **Author:** Claude Code (Opus 4.5)
> **Last Updated:** 2026-01-22

## Overview

Implement 6 major UI/UX upgrades for the A2 Reklam production website while maintaining SEO, performance, and accessibility standards across all 3 locales (TR, EN, AR with RTL).

**Key Constraints:**
- Preserve i18n routing, hreflang, sitemap, structured data
- No CLS (Cumulative Layout Shift) regressions
- WAI-ARIA compliant modals/lightboxes
- Support `prefers-reduced-motion` and `prefers-color-scheme`
- No heavy JS libraries - pure CSS/vanilla JS solutions

---

## Feature 1: Hero Background Visibility Enhancement

**Goal:** Make background imagery more visible WITHOUT harming text readability.

**File:** `/src/components/landing/Hero.astro`

**Current State:**
- Background image: `opacity-50` (line 57)
- Gradient 1 (z-10): `from-secondary/40 via-secondary/70 to-secondary`
- Gradient 2 (z-20): `from-secondary via-transparent to-transparent`
- Text: white with `drop-shadow-2xl`

**Implementation:**
1. Increase image opacity: `opacity-50` → `opacity-65`
2. Reduce gradient intensity: `from-secondary/25 via-secondary/55 to-secondary`
3. Add glass-effect backdrop behind text content for readability
4. Enhance text shadows: `drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]`

**Acceptance Criteria:**
- [ ] Background image clearly recognizable (signage visible)
- [ ] Text maintains WCAG AA contrast (4.5:1 minimum)
- [ ] Readable on mobile and desktop
- [ ] No CLS from layout changes

---

## Feature 2: Navigation Changes

**Goal:** Remove "Hizmet Bölgeleri" from header; add Gallery link to header/footer.

**Files:**
- `/src/components/common/Header.astro`
- `/src/components/common/Footer.astro`

**Header Changes:**
- Remove from `items_tr`: `{ label: 'Hizmet Bölgeleri', href: '/hizmet-bolgeleri/' }`
- Remove from `items_en`: `{ label: 'Service Areas', href: '/en/service-areas/' }`
- Add to `items_tr`: `{ label: 'Galeri', href: '/galeri/' }`
- Add to `items_en`: `{ label: 'Gallery', href: '/en/gallery/' }`
- Add to `items_ar`: `{ label: 'المعرض', href: '/ar/gallery/' }`

**Footer Changes:**
- Add to TR quickLinks: `{ label: 'Hizmet Bölgeleri', href: '/hizmet-bolgeleri/' }`
- Add to EN quickLinks: `{ label: 'Service Areas', href: '/en/service-areas/' }`
- Add Gallery links to all locale quickLinks

**Acceptance Criteria:**
- [ ] Header nav does NOT show "Hizmet Bölgeleri" in any locale
- [ ] Header nav shows "Galeri/Gallery/المعرض" with correct hrefs
- [ ] Footer shows both "Hizmet Bölgeleri" and "Galeri" links
- [ ] Mobile menu reflects same changes
- [ ] All links work and route correctly

---

## Feature 3: Service Detail Pages - Move Gallery Higher

**Goal:** Surface gallery images immediately after "Hızlı Yanıt" section.

**Files:**
- `/src/pages/hizmetler/[...slug].astro` (TR)
- `/src/pages/en/services/[...slug].astro` (EN)

**Current State:** Gallery at lines 337-353 (end of content)

**Implementation:**
1. Move Gallery section to after line 169 (after "Hızlı Yanıt")
2. Change `initialLimit={12}` to `initialLimit={6}`
3. Keep same component usage pattern

**Acceptance Criteria:**
- [ ] Gallery appears immediately after Quick Answer section
- [ ] Shows 6 images initially with "Load More"
- [ ] Lightbox works correctly
- [ ] No duplicate gallery sections

---

## Feature 4: New Gallery Pages with Filtering

**Goal:** Create dedicated gallery pages with category filtering and counts.

**Files to Create:**
- `/src/components/gallery/GalleryPage.astro` - Shared component
- `/src/pages/galeri/index.astro` - TR route
- `/src/pages/en/gallery/index.astro` - EN route
- `/src/pages/ar/gallery/index.astro` - AR route

**Files to Modify:**
- `/src/components/common/Gallery.astro` - Add `data-category` attributes
- `/src/utils/localeRoutes.ts` - Add gallery route mappings

**GalleryPage Features:**
1. Load images from manifest via `loadImagesManifest()`
2. Group by category with counts
3. Filter buttons showing total counts: "Çatı Tabelası (12)"
4. Dynamic "Showing X of Y" counter with minimal JS
5. CSS-based filtering via `data-category` + display toggle
6. Reuse Gallery component for grid/lightbox

**Filter Implementation:**
```javascript
// Filter buttons show TOTAL counts (static)
// "Showing X of Y" updates dynamically:
// - X = currently visible items
// - Y = total in selected filter (or all)
```

**SEO Requirements:**
- Unique title/description per locale
- Proper canonical URL per locale
- Hreflang links for tr/en/ar/x-default
- Breadcrumb schema
- Auto-included in sitemap (Astro handles this)

**Acceptance Criteria:**
- [ ] Filter buttons show accurate category totals
- [ ] "Showing X of Y" updates on filter change
- [ ] Lightbox works with filtered results
- [ ] SEO meta tags correct per locale
- [ ] Appears in sitemap
- [ ] RTL layout correct for Arabic

---

## Feature 5: Homepage Gallery Slider

**Goal:** Add horizontal image slider on homepage after ReviewsSection.

**File to Create:** `/src/components/landing/GallerySlider.astro`

**Files to Modify:**
- `/src/pages/index.astro` - Add after ReviewsSection (line 14)
- `/src/pages/en/index.astro` - Same position
- `/src/pages/ar/index.astro` - Same position

**Slider Features:**
1. CSS scroll-snap with `proximity` strictness
2. Scroll-padding to account for sticky header
3. 20 images max (2 per category, diverse selection)
4. Navigation arrows (RTL-aware: swap left/right for AR)
5. Lightbox integration with full navigation
6. "View all" link to Gallery page
7. Respect `prefers-reduced-motion`

**Accessibility:**
- Arrow buttons with `aria-label`
- Keyboard navigation (arrow keys)
- Focus visible states
- Announce current position to screen readers

**Acceptance Criteria:**
- [ ] Slider scrolls smoothly with snap points
- [ ] Arrows navigate correctly (RTL reversed for AR)
- [ ] Clicking image opens lightbox at that index
- [ ] "View all" links to correct locale gallery page
- [ ] Reduced motion users see no animations
- [ ] No CLS during load

---

## Feature 6: Dark/Light Theme Toggle

**Goal:** Add theme toggle with persistence and no flash.

**Files to Create:**
- `/src/components/common/ThemeToggle.astro`

**Files to Modify:**
- `/src/styles/global.css` - Add `[data-theme="light"]` variables
- `/src/layouts/Layout.astro` - Add blocking theme init script
- `/src/components/common/Header.astro` - Add ThemeToggle component
- `/src/components/common/SEO.astro` - Dynamic theme-color meta

**CRITICAL: Theme System Architecture**

Use `data-theme` attribute on `<html>`, NOT class-based overrides:

```css
/* BAD - DO NOT DO THIS */
.light .text-white { color: black; }

/* GOOD - Token-based approach */
:root {
  --text-heading: #F3F4F6;
  --bg-base: #0B0F14;
}

[data-theme="light"] {
  --text-heading: #1A1A1A;
  --bg-base: #F8F9FA;
}
```

**CSS Variables (global.css):**
```css
:root {
  /* Base - Dark (default) */
  --bg-base: #0B0F14;
  --bg-surface: #121826;
  --bg-card: #1A1F2E;
  --text-primary: #F3F4F6;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --accent-primary: #C9A227;
  --accent-hover: #E0B945;
  --border-subtle: rgba(255, 255, 255, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.4);
}

[data-theme="light"] {
  --bg-base: #F8F9FA;
  --bg-surface: #FFFFFF;
  --bg-card: #FFFFFF;
  --text-primary: #1F2937;
  --text-secondary: #4B5563;
  --text-muted: #6B7280;
  --accent-primary: #B8860B;
  --accent-hover: #996B08;
  --border-subtle: rgba(0, 0, 0, 0.08);
  --shadow-color: rgba(0, 0, 0, 0.1);
}
```

**No-Flash Script (MUST be first in `<head>`):**
```html
<script is:inline>
(function(){
  var t = localStorage.getItem('a2-theme');
  if (t === 'light' || (!t && !matchMedia('(prefers-color-scheme:dark)').matches)) {
    document.documentElement.dataset.theme = 'light';
  }
})();
</script>
```

**ThemeToggle Component:**
- Sun/moon icon toggle
- Updates `data-theme` attribute
- Persists to localStorage as `a2-theme`
- Announces change to screen readers

**Acceptance Criteria:**
- [ ] Default: dark theme (matches current brand)
- [ ] Light theme is premium (not harsh white)
- [ ] Toggle persists across page navigation
- [ ] No flash on page load/refresh
- [ ] Respects system preference if no stored value
- [ ] Works on all pages and locales

---

## Feature 7: Lightbox Accessibility Refactor

**Goal:** Make Gallery lightbox WAI-ARIA compliant.

**File:** `/src/components/common/Gallery.astro`

**Current Gaps (from audit):**
1. ❌ No focus trap (Tab escapes modal)
2. ❌ No `aria-labelledby` (just generic aria-label)
3. ❌ Background not made inert
4. ❌ No live region for image counter
5. ❌ Focus not returned to trigger on close

**Implementation:**

1. **Focus Trap** (copy pattern from Header.astro lines 290-301):
```javascript
function getFocusableElements(container) {
  return container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

// On Tab keydown:
if (e.key === 'Tab') {
  const focusables = getFocusableElements(lightbox);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
```

2. **Inert Background:**
```javascript
// On open:
document.getElementById('main-content').setAttribute('inert', '');
// On close:
document.getElementById('main-content').removeAttribute('inert');
```

3. **ARIA Structure:**
```html
<div id="lightbox-modal"
     role="dialog"
     aria-modal="true"
     aria-labelledby="lightbox-title">
  <h2 id="lightbox-title" class="sr-only">Image Viewer</h2>
  <div aria-live="polite" id="lightbox-counter">Image 1 of 12</div>
  ...
</div>
```

4. **Focus Return:**
```javascript
let lastFocusedElement = null;
function openLightbox(index, triggerEl) {
  lastFocusedElement = triggerEl || document.activeElement;
  // ... open modal
}
function closeLightbox() {
  // ... close modal
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}
```

**Acceptance Criteria:**
- [ ] ESC closes lightbox
- [ ] Tab/Shift+Tab trapped within modal
- [ ] Focus returns to trigger on close
- [ ] `aria-modal="true"` and `aria-labelledby` present
- [ ] Background content not focusable while open
- [ ] Screen reader announces image position

---

## Implementation Order

### Phase 1: Foundation & Low-Risk Changes
1. Lightbox accessibility refactor (Gallery.astro)
2. Navigation changes (Header/Footer)
3. Hero background visibility

### Phase 2: Content Reorganization
4. Service detail pages - move gallery higher

### Phase 3: New Components
5. GallerySlider component + homepage integration
6. GalleryPage component + new routes

### Phase 4: Theme System
7. CSS variables for light theme
8. ThemeToggle component
9. Layout integration + no-flash script

---

## Files Summary

| File | Action | Features |
|------|--------|----------|
| `/src/components/common/Gallery.astro` | Modify | A11y refactor, data-category |
| `/src/components/landing/Hero.astro` | Modify | Background visibility |
| `/src/components/common/Header.astro` | Modify | Nav links, theme toggle |
| `/src/components/common/Footer.astro` | Modify | Add service areas + gallery |
| `/src/pages/hizmetler/[...slug].astro` | Modify | Move gallery higher |
| `/src/pages/en/services/[...slug].astro` | Modify | Move gallery higher |
| `/src/pages/index.astro` | Modify | Add GallerySlider |
| `/src/pages/en/index.astro` | Modify | Add GallerySlider |
| `/src/pages/ar/index.astro` | Modify | Add GallerySlider |
| `/src/styles/global.css` | Modify | Theme variables |
| `/src/layouts/Layout.astro` | Modify | Theme init script |
| `/src/utils/localeRoutes.ts` | Modify | Gallery route mappings |
| `/src/components/landing/GallerySlider.astro` | **Create** | Homepage slider |
| `/src/components/common/ThemeToggle.astro` | **Create** | Theme toggle |
| `/src/components/gallery/GalleryPage.astro` | **Create** | Gallery page |
| `/src/pages/galeri/index.astro` | **Create** | TR gallery route |
| `/src/pages/en/gallery/index.astro` | **Create** | EN gallery route |
| `/src/pages/ar/gallery/index.astro` | **Create** | AR gallery route |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Theme flash on load | Poor UX | Blocking script in `<head>` before CSS |
| Lightbox a11y regression | Legal/UX | Test with screen reader, focus trap |
| CLS from images | Core Web Vitals | Fixed aspect ratios, lazy load |
| RTL slider confusion | AR users | Test arrow direction, keyboard nav |
| SEO regression | Rankings | Verify hreflang, canonical, sitemap |
| Mobile menu breaks | Navigation | Test hamburger + drawer on all locales |

---

## Regression Test Checklist

### All Locales (TR/EN/AR)
- [ ] Homepage loads without errors
- [ ] Header navigation works
- [ ] Footer links work
- [ ] Service listing page works
- [ ] Service detail page works
- [ ] Blog listing and detail work
- [ ] Contact form submits
- [ ] Quote form submits

### RTL Specific (Arabic)
- [ ] Text direction correct
- [ ] Slider arrows feel natural (right=prev, left=next)
- [ ] Mobile menu slides from left
- [ ] Form inputs aligned correctly

### Accessibility
- [ ] Keyboard navigation works throughout
- [ ] Lightbox focus trapped
- [ ] Screen reader announces modal content
- [ ] Theme toggle announced

### Performance
- [ ] No CLS warnings in Lighthouse
- [ ] Images lazy load below fold
- [ ] No unused CSS/JS warnings

---

## Quality Gates

**Must pass before merge:**
```bash
npm ci
npm run build          # Zero errors
npm run preview        # Smoke test locally
npm run repo:safety    # Security check
npm run asset:audit    # Image optimization
npm run content:lint   # Content validation
```

---

## Definition of Done

- [ ] All 7 features implemented
- [ ] All acceptance criteria met
- [ ] All quality gates pass
- [ ] Regression checklist complete
- [ ] Tested on TR/EN/AR locales
- [ ] Tested on mobile/desktop
- [ ] No console errors
- [ ] Committed with conventional commit messages
- [ ] Ready for review/merge
