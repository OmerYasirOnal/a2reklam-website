// Lazy-loaded GLightbox — only imports the library when gallery is visible
// Track instances to prevent duplicates and allow cleanup
const instances: Map<string, any> = new Map();

let glightboxModule: typeof import('glightbox') | null = null;

async function loadGLightbox() {
  if (!glightboxModule) {
    const [mod] = await Promise.all([
      import('glightbox'),
      import('glightbox/dist/css/glightbox.css'),
    ]);
    glightboxModule = mod;
  }
  return glightboxModule.default;
}

async function initLightbox(selector: string, galleryId: string) {
  // Destroy old instance if any (HMR/dev)
  if (instances.has(galleryId)) {
    instances.get(galleryId)?.destroy();
    instances.delete(galleryId);
  }

  // Check if there are elements to initialize
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  // Lazy load GLightbox
  const GLightbox = await loadGLightbox();

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

function initGridLightbox() {
  return initLightbox('a.glightbox[data-gallery="a2-gallery-grid"]', 'grid');
}

function initSliderLightbox() {
  return initLightbox('a.glightbox[data-gallery="a2-gallery-slider"]', 'slider');
}

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

// Lazy init: wait until a gallery element is visible
function lazyInit() {
  const galleries = document.querySelectorAll('a.glightbox');
  if (galleries.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            initAllLightboxes();
            return;
          }
        }
      },
      { rootMargin: '200px' }
    );
    galleries.forEach((el) => observer.observe(el));
  } else {
    // Fallback: init immediately
    initAllLightboxes();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', lazyInit);
} else {
  lazyInit();
}

// HMR support for development
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    initAllLightboxes();
  });
}

export { initGridLightbox, initSliderLightbox, initAllLightboxes };
