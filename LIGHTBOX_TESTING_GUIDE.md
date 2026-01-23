# LIGHTBOX TESTING GUIDE - ISSUE #2
Branch: `feature/ui-polish-20260123`

## CRITICAL FIXES APPLIED

### 1. CSS Touch Action (Mobile Reliability)
Added to both Gallery.astro and GallerySlider.astro:
```css
#lightbox-image-container {
  touch-action: pan-y pinch-zoom;
  user-select: none;
  -webkit-user-select: none;
}

#lightbox-modal img {
  pointer-events: none;
}
```

**Why this matters:**
- `touch-action: pan-y pinch-zoom` tells the browser we handle horizontal gestures, browser handles vertical scroll
- `pointer-events: none` on image prevents it from capturing events (container handles all gestures)
- Essential for iOS Safari pointer event reliability

### 2. Pointer-Based Gesture System
- Uses pointer events (unified touch/mouse)
- Continuous tracking with pointermove
- 350ms swipe cooldown prevents click-after-swipe
- 40px horizontal threshold, 110px vertical tolerance

### 3. Hint Positioning
- Lowered to `0.75rem` (was 1.5rem)
- Safe-area aware: `max(0.75rem, calc(env(safe-area-inset-bottom, 0) + 0.5rem))`

## MANUAL TESTING PROTOCOL

### Setup
```bash
cd /Users/omeryasironal/Projects/A2reklam
git checkout feature/ui-polish-20260123
npm run dev
```

Open: http://localhost:4321

### Pages to Test
1. `/galeri/` - Main gallery with 180+ images
2. `/` - Homepage gallery slider
3. `/hizmetler/cephe-tabela/` - Service detail page with project gallery

---

## DESKTOP TESTING (Chrome/Firefox/Safari)

### D1: Arrow Key Navigation
**Test Steps:**
1. Navigate to `/galeri/`
2. Click any image thumbnail
3. Lightbox opens with image counter (e.g., "5 / 180")
4. Press **→** (right arrow) 10 times
5. Press **←** (left arrow) 10 times

**Expected Result:**
- Each keypress advances/reverses by 1 image
- Counter updates accurately
- Wraps around at boundaries (180 → 1, 1 → 180)
- Smooth transitions, no skipped images

**Pass Criteria:** ✅ All 20 keypresses register correctly

---

### D2: Escape Key Close
**Test Steps:**
1. Open any lightbox image
2. Press **Esc** key

**Expected Result:**
- Lightbox closes immediately
- Focus returns to thumbnail that opened lightbox
- Body scroll restored

**Pass Criteria:** ✅ Closes and focus returns

---

### D3: Backdrop Click Close
**Test Steps:**
1. Open lightbox
2. Click on dark backdrop area (NOT on image)
3. Try clicking on image itself

**Expected Result:**
- Backdrop click → closes
- Image click → does NOT close
- Hint area click → does NOT close

**Pass Criteria:** ✅ Only backdrop closes, image stays open on image click

---

## MOBILE TESTING (Chrome DevTools)

### Setup Device Emulation
1. Open Chrome DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Select: **iPhone 13 Pro** (390 x 844)
4. Set zoom to 100%
5. Enable touch simulation

---

### M1: Consecutive Swipe Navigation (/galeri/)
**Test Steps:**
1. Navigate to `/galeri/`
2. Tap any image thumbnail
3. Lightbox opens in mobile view
4. **Swipe LEFT** 10 times consecutively (not too fast, realistic speed)
5. **Swipe RIGHT** 10 times consecutively

**Expected Result:**
- Each swipe advances/reverses by 1 image
- No missed swipes (all 20 register)
- Counter updates accurately
- Smooth, no lag

**Pass Criteria:** ✅ 20/20 swipes register, no misses

---

### M2: Homepage Slider Swipe
**Test Steps:**
1. Navigate to `/` (homepage)
2. Scroll to gallery slider section
3. Tap any slider image
4. Swipe LEFT 5 times
5. Swipe RIGHT 5 times

**Expected Result:**
- All swipes register
- Works identically to /galeri/

**Pass Criteria:** ✅ 10/10 swipes work

---

### M3: Service Page Gallery Swipe
**Test Steps:**
1. Navigate to `/hizmetler/cephe-tabela/`
2. Scroll to "Proje Galerisi" section
3. Tap any project image
4. Swipe LEFT 5 times
5. Swipe RIGHT 5 times

**Expected Result:**
- All swipes register
- Consistent behavior across all lightbox instances

**Pass Criteria:** ✅ 10/10 swipes work

---

### M4: Vertical Scroll Prevention
**Test Steps:**
1. Open lightbox on mobile
2. Attempt diagonal swipe (45° angle, mostly vertical)
3. Attempt pure vertical swipe

**Expected Result:**
- Diagonal with vertical > 110px → does NOT navigate
- Pure vertical → ignored completely
- Only horizontal-dominant swipes trigger navigation

**Pass Criteria:** ✅ Vertical/diagonal swipes ignored

---

### M5: Tap to Close vs Tap Image
**Test Steps:**
1. Open lightbox
2. Tap on dark backdrop area (corners, edges)
3. Tap directly on the image
4. Tap on hint/counter at bottom

**Expected Result:**
- Backdrop tap → closes immediately
- Image tap → stays open (no close)
- Hint tap → stays open

**Pass Criteria:** ✅ Only backdrop closes

---

### M6: Click-After-Swipe Prevention (CRITICAL)
**Test Steps:**
1. Open lightbox
2. Swipe LEFT to navigate
3. **IMMEDIATELY** tap backdrop (within 0.5 seconds)
4. Wait 1 second, then tap backdrop

**Expected Result:**
- Immediate tap after swipe → does NOT close (cooldown active)
- Tap after 1 second → closes normally

**Pass Criteria:** ✅ Cooldown prevents accidental close

---

## iOS SAFARI SPECIFIC (If Available)

### H1 & H2: Safe Area + Hint Position
**Test Steps:**
1. Open Safari on iPhone (11 or newer with notch/Dynamic Island)
2. Navigate to `/galeri/`
3. Open lightbox
4. Observe hint position at bottom

**Expected Result:**
- Hint appears **lower than previous** (0.75rem = 12px from bottom)
- Does NOT overlap iOS home indicator
- Safe-area padding adds extra space on iOS

**Alternative (DevTools):**
- Chrome DevTools → Device: iPhone 13 Pro
- Inspect hint element
- Verify: `bottom: max(0.75rem, calc(env(safe-area-inset-bottom, 0) + 0.5rem))`

**Pass Criteria:** ✅ Visibly lower, respects safe area

---

## REGRESSION CHECKS

### R1: Scroll Lock
**Test Steps:**
1. Open lightbox
2. Try to scroll background content (should be blocked)
3. Close lightbox
4. Scroll page (should work)

**Pass Criteria:** ✅ Background locked while open, restored after close

---

### R2: RTL Support (Arabic)
**Test Steps:**
1. Navigate to `/ar/` (if Arabic locale exists)
2. Open lightbox
3. Swipe LEFT and RIGHT

**Expected Result:**
- Swipe directions reversed for RTL
- LEFT → previous (instead of next)
- RIGHT → next (instead of previous)

**Pass Criteria:** ✅ Directions correct for RTL

---

### R3: Light/Dark Theme
**Test Steps:**
1. Toggle theme switcher (if present)
2. Open lightbox in both themes

**Expected Result:**
- Lightbox appears correctly in both themes
- Hint readable in both modes
- No theme-specific gesture issues

**Pass Criteria:** ✅ Works in both themes

---

## ACCEPTANCE CRITERIA SUMMARY

### Mobile (Must All Pass)
- [ ] M1: 20/20 consecutive swipes on /galeri/
- [ ] M2: 10/10 swipes on homepage slider
- [ ] M3: 10/10 swipes on service page
- [ ] M4: Vertical swipes ignored
- [ ] M5: Backdrop closes, image doesn't
- [ ] M6: Click-after-swipe cooldown works

### Desktop (Must All Pass)
- [ ] D1: Arrow keys navigate (20/20 keypresses)
- [ ] D2: Esc closes + focus returns
- [ ] D3: Backdrop click closes, image click doesn't

### Hint (Must All Pass)
- [ ] H1: Visibly lower (0.75rem vs 1.5rem)
- [ ] H2: Safe-area aware (iOS)

### No Regressions (Must All Pass)
- [ ] R1: Scroll lock works
- [ ] R2: RTL correct
- [ ] R3: Both themes work

---

## KNOWN ISSUES & WORKAROUNDS

### If Swipe Still Doesn't Work on iOS Safari:
1. Check if `touch-action` CSS is being overridden
2. Verify pointer events are supported (iOS 13+)
3. Fallback: Consider touch event hybrid implementation

### If Click-After-Swipe Still Occurs:
1. Increase `SWIPE_COOLDOWN` from 350ms to 500ms
2. Check if backdrop click handler fires before pointerup

### If Vertical Scroll Conflicts with Swipe:
1. Adjust `touch-action` to `touch-action: none` (test carefully)
2. Increase `MAX_SWIPE_Y` threshold

---

## FILES CHANGED IN THIS FIX

1. `src/components/common/Gallery.astro`
   - Added touch-action CSS
   - Image pointer-events: none

2. `src/components/landing/GallerySlider.astro`
   - Added touch-action CSS
   - Image pointer-events: none

---

## COMMANDS FOR LOCAL TESTING

```bash
# Start dev server
npm run dev

# Open in browser
open http://localhost:4321

# Test pages
http://localhost:4321/galeri/
http://localhost:4321/
http://localhost:4321/hizmetler/cephe-tabela/

# Mobile testing via DevTools
# Chrome: F12 → Device Toolbar (Ctrl+Shift+M)
# Select: iPhone 13 Pro (390x844)
# Enable touch simulation
```

---

## SUCCESS CRITERIA

✅ **ALL acceptance criteria must be PASS**
✅ **All quality gates pass** (build, safety, lint, audit)
✅ **Consistent behavior** across all 3 lightbox locations
✅ **No regressions** in existing functionality

---

## NEXT STEPS IF TESTING FAILS

1. Document exact failure (which criterion, which page, which device)
2. Check browser console for errors
3. Verify CSS applied correctly (DevTools → Elements)
4. Test on actual iOS device if DevTools passes but real device fails
5. Consider PhotoSwipe or Embla Carousel replacement if pointer events remain unreliable

