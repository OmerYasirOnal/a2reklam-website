type LeadType = 'call' | 'whatsapp' | 'quote' | 'cta' | 'outbound';

interface LeadEvent {
  type: LeadType;
  lang?: string;
  page?: string;
}

function getDataLayer(): unknown[] | null {
  if (typeof window === 'undefined') return null;
  const win = window as typeof window & { dataLayer?: unknown[] };
  if (!Array.isArray(win.dataLayer)) {
    win.dataLayer = [];
  }
  return win.dataLayer;
}

export function trackLeadClick({ type, lang, page }: LeadEvent): void {
  const dataLayer = getDataLayer();
  if (!dataLayer) return;
  dataLayer.push({
    event: 'lead_click',
    lead_type: type,
    lang,
    page,
  });
}

export function trackLeadSubmit({ type, lang, page }: LeadEvent): void {
  const dataLayer = getDataLayer();
  if (!dataLayer) return;
  dataLayer.push({
    event: 'lead_submit',
    lead_type: type,
    lang,
    page,
  });
}

export function trackLeadConversion({ type, lang, page }: LeadEvent): void {
  const dataLayer = getDataLayer();
  if (!dataLayer) return;
  dataLayer.push({
    event: 'lead_conversion',
    lead_type: type,
    lang,
    page,
  });
}

interface OutboundEvent {
  type: string;
  target?: string | null;
  name?: string | null;
  lang?: string;
  page?: string;
}

export function trackOutboundClick({ type, target, name, lang, page }: OutboundEvent): void {
  const dataLayer = getDataLayer();
  if (!dataLayer) return;
  dataLayer.push({
    event: 'outbound_click',
    outbound_type: type,
    outbound_target: target ?? null,
    outbound_name: name ?? null,
    lang,
    page,
  });
}
