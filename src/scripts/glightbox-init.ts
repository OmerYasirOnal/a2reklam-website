import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

// Track instances to prevent duplicates and allow cleanup
const instances: Map<string, ReturnType<typeof GLightbox>> = new Map();

function initLightbox(selector: string, galleryId: string) {
  // Destroy old instance if any (HMR/dev)
  if (instances.has(galleryId)) {
    instances.get(galleryId)?.destroy();
    instances.delete(galleryId);
  }

  // Check if there are elements to initialize
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  // Initialize GLightbox
  const instance = GLightbox({
    selector,
    loop: true,
    touchNavigation: true,
    keyboardNavigation: true,
    closeOnOutsideClick: true,
  });

  instances.set(galleryId, instance);
  return instance;
}

// Initialize grid gallery
function initGridLightbox() {
  initLightbox('a.glightbox[data-gallery="a2-gallery-grid"]', 'grid');
}

// Initialize slider gallery
function initSliderLightbox() {
  initLightbox('a.glightbox[data-gallery="a2-gallery-slider"]', 'slider');
}

// Initialize all galleries on the page
function initAllLightboxes() {
  initGridLightbox();
  initSliderLightbox();
}

// Expose reinit function for load more functionality
declare global {
  interface Window {
    __a2_glightbox_reinit__?: () => void;
  }
}

window.__a2_glightbox_reinit__ = initAllLightboxes;

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllLightboxes);
} else {
  initAllLightboxes();
}

// HMR support for development
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    initAllLightboxes();
  });
}

export { initGridLightbox, initSliderLightbox, initAllLightboxes };
