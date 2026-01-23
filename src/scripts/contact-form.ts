/**
 * Contact Form Handler
 *
 * This script handles contact form submission via fetch API.
 * It only fires Google Ads conversion after successful email send.
 */

import { fireConversion } from './ads-conversions';
import { ADS_CONFIG } from '../config/ads';

// Prevent double initialization
const INIT_FLAG = '__a2_contact_form_initialized__';

declare global {
  interface Window {
    [key: string]: any;
  }
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  website?: string; // Honeypot field
}

/**
 * Show form feedback message
 */
function showFeedback(
  form: HTMLFormElement,
  type: 'success' | 'error',
  message: string
): void {
  // Remove existing feedback
  const existingFeedback = form.querySelector('.form-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }

  // Create feedback element
  const feedback = document.createElement('div');
  feedback.className = `form-feedback p-4 rounded-lg mb-4 ${
    type === 'success'
      ? 'bg-green-500/20 text-green-300 border border-green-500/50'
      : 'bg-red-500/20 text-red-300 border border-red-500/50'
  }`;
  feedback.textContent = message;

  // Insert at the top of the form
  form.insertBefore(feedback, form.firstChild);

  // Scroll to feedback
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Handle form submission
 */
async function handleSubmit(event: Event): Promise<void> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

  if (!submitButton) return;

  // Disable button and show loading state
  const originalText = submitButton.textContent || 'GÖNDER';
  submitButton.disabled = true;
  submitButton.textContent = 'GÖNDERİLİYOR...';

  try {
    // Collect form data
    const formData = new FormData(form);
    const data: FormData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      serviceType: formData.get('serviceType') as string,
      message: formData.get('message') as string,
      website: formData.get('website') as string, // Honeypot
    };

    // Submit to PHP endpoint
    const response = await fetch('/api/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.ok) {
      // Success! Show success message
      showFeedback(
        form,
        'success',
        '✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
      );

      // Clear form fields
      form.reset();

      // Fire Google Ads conversion (ONLY on success)
      fireConversion(ADS_CONFIG.CONVERSIONS.FORM);

      // Also fire GTM event (already exists from data-track attribute)
      // The TrackingEvents.astro script handles this on submit

    } else {
      // Error from server
      showFeedback(
        form,
        'error',
        `✗ Hata: ${result.error || 'Mesaj gönderilemedi. Lütfen tekrar deneyin.'}`
      );
    }
  } catch (error) {
    console.error('[Contact Form] Error:', error);
    showFeedback(
      form,
      'error',
      '✗ Bir hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.'
    );
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

/**
 * Initialize contact form handling
 */
function initContactForm(): void {
  // Prevent double initialization
  if (window[INIT_FLAG]) {
    console.log('[Contact Form] Already initialized, skipping');
    return;
  }

  const form = document.querySelector('#contact-form') as HTMLFormElement;
  if (!form) {
    console.log('[Contact Form] Form not found on this page');
    return;
  }

  // Add honeypot field (hidden from users, visible to bots)
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'website';
  honeypot.style.position = 'absolute';
  honeypot.style.left = '-9999px';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  form.appendChild(honeypot);

  // Attach submit handler
  form.addEventListener('submit', handleSubmit);

  window[INIT_FLAG] = true;
  console.log('[Contact Form] Initialized');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

export { initContactForm };
