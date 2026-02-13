/**
 * Lightweight Google Analytics event tracking utility.
 * Safe to call anywhere — silently no-ops if gtag is not loaded.
 */

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent({ action, category, label, value }: GTagEvent) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

// Pre-built events for common interactions
export const analytics = {
  cityChange: (cityName: string) =>
    trackEvent({ action: "city_change", category: "navigation", label: cityName }),
  dateNavigate: (direction: "prev" | "next" | "today") =>
    trackEvent({ action: "date_navigate", category: "navigation", label: direction }),
  shareClick: (method: string) =>
    trackEvent({ action: "share", category: "engagement", label: method }),
  languageToggle: (locale: string) =>
    trackEvent({ action: "language_toggle", category: "settings", label: locale }),
  festivalClick: (festivalName: string) =>
    trackEvent({ action: "festival_click", category: "engagement", label: festivalName }),
  externalLink: (destination: string) =>
    trackEvent({ action: "external_link", category: "navigation", label: destination }),
};
