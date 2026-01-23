/**
 * Google Ads Configuration
 *
 * IMPORTANT: After creating conversion actions in Google Ads, update the conversion labels below.
 *
 * To find your conversion labels:
 * 1. Go to Google Ads → Goals → Conversions
 * 2. Click on each conversion action
 * 3. Copy the "Event snippet" - look for send_to: "AW-XXXXXXX/LABEL"
 * 4. Paste the full "AW-XXXXXXX/LABEL" value below
 */

import { GOOGLE_ADS_ID } from '../consts';

export const ADS_CONFIG = {
  // Google Ads account ID (from consts)
  ACCOUNT_ID: GOOGLE_ADS_ID,

  // Conversion labels - UPDATE THESE after creating conversions in Google Ads
  // Format: "AW-XXXXXXX/CONVERSION_LABEL"
  CONVERSIONS: {
    // Phone call button click conversion
    // TODO: Replace with actual conversion label from Google Ads
    PHONE: `${GOOGLE_ADS_ID}/PHONE_CONVERSION_LABEL`,

    // WhatsApp button click conversion
    // TODO: Replace with actual conversion label from Google Ads
    WHATSAPP: `${GOOGLE_ADS_ID}/WHATSAPP_CONVERSION_LABEL`,

    // Contact form successful submission conversion
    // TODO: Replace with actual conversion label from Google Ads
    FORM: `${GOOGLE_ADS_ID}/FORM_CONVERSION_LABEL`,
  },
} as const;

/**
 * Check if Google Ads tracking is properly configured
 */
export function isAdsConfigured(): boolean {
  return (
    ADS_CONFIG.ACCOUNT_ID !== '' &&
    !ADS_CONFIG.CONVERSIONS.PHONE.includes('PHONE_CONVERSION_LABEL') &&
    !ADS_CONFIG.CONVERSIONS.WHATSAPP.includes('WHATSAPP_CONVERSION_LABEL') &&
    !ADS_CONFIG.CONVERSIONS.FORM.includes('FORM_CONVERSION_LABEL')
  );
}
