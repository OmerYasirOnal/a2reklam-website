/**
 * Google Ads Conversion Tracking
 *
 * This script attaches conversion tracking to phone, WhatsApp, and form submission events.
 * It only fires conversions when user actions are actually taken.
 *
 * IMPORTANT: This script is defensive against double-initialization (HMR/dev mode).
 */

import { ADS_CONFIG } from '../config/ads';

// Prevent double initialization in dev mode
const INIT_FLAG = '__a2_ads_conversions_initialized__';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    [key: string]: any;
  }
}

/**
 * Fire a Google Ads conversion event
 */
function fireConversion(conversionLabel: string, callback?: () => void): void {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('[Ads] gtag not available, skipping conversion:', conversionLabel);
    callback?.();
    return;
  }

  try {
    window.gtag('event', 'conversion', {
      send_to: conversionLabel,
      event_callback: () => {
        console.log('[Ads] Conversion fired:', conversionLabel);
        callback?.();
      },
    });

    // Fallback: call callback after 500ms if event_callback doesn't fire
    setTimeout(() => {
      callback?.();
    }, 500);
  } catch (error) {
    console.error('[Ads] Error firing conversion:', error);
    callback?.();
  }
}

/**
 * Track phone button clicks
 */
function initPhoneTracking(): void {
  const phoneButtons = document.querySelectorAll('[data-conversion="phone"]');

  phoneButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const href = (button as HTMLAnchorElement).href;

      // Only intercept if it's a tel: link
      if (href && href.startsWith('tel:')) {
        event.preventDefault();

        // Fire conversion, then navigate
        fireConversion(ADS_CONFIG.CONVERSIONS.PHONE, () => {
          window.location.href = href;
        });
      }
    });
  });

  console.log(`[Ads] Phone tracking initialized for ${phoneButtons.length} button(s)`);
}

/**
 * Track WhatsApp button clicks
 */
function initWhatsAppTracking(): void {
  const whatsappButtons = document.querySelectorAll('[data-conversion="whatsapp"]');

  whatsappButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const href = (button as HTMLAnchorElement).href;

      // Only intercept WhatsApp links
      if (href && (href.includes('wa.me') || href.includes('api.whatsapp.com'))) {
        event.preventDefault();

        // Fire conversion, then open WhatsApp
        fireConversion(ADS_CONFIG.CONVERSIONS.WHATSAPP, () => {
          window.open(href, '_blank', 'noopener,noreferrer');
        });
      }
    });
  });

  console.log(`[Ads] WhatsApp tracking initialized for ${whatsappButtons.length} button(s)`);
}

/**
 * Initialize all conversion tracking
 */
function initConversionTracking(): void {
  // Prevent double initialization
  if (window[INIT_FLAG]) {
    console.log('[Ads] Conversion tracking already initialized, skipping');
    return;
  }

  initPhoneTracking();
  initWhatsAppTracking();

  // Mark as initialized
  window[INIT_FLAG] = true;
  console.log('[Ads] Conversion tracking initialized');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConversionTracking);
} else {
  initConversionTracking();
}

// Export for manual initialization if needed
export { fireConversion, initConversionTracking };
