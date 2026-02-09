export const SITE_CONFIG = {
  name: "VastuCart Panchang",
  description: "Accurate daily Panchang with Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Choghadiya timings for 200+ Indian cities.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in",
  brandName: "VastuCart",
  brandUrl: "https://vastucart.in",
} as const;

export const DEFAULT_LOCATION = {
  slug: "new-delhi",
  name: "New Delhi",
  state: "Delhi",
  lat: 28.6139,
  lng: 77.209,
  tz: "Asia/Kolkata",
} as const;

export const NETWORK_LINKS = {
  main: "https://vastucart.in",
  tools: "https://vastucart.in/en/tools",
  kundali: "https://kundali.vastucart.in",
  store: "https://store.vastucart.in",
  blog: "https://blog.vastucart.in",
  horoscope: "https://horoscope.vastucart.in",
  muhurta: "https://muhurta.vastucart.in",
  stotra: "https://stotra.vastucart.in",
  wedding: "https://wedding.vastucart.in",
  panchang: "https://panchang.vastucart.in",
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/vastucartindia",
  instagram: "https://www.instagram.com/vastucart/",
  etsy: "https://vastucart.etsy.com",
  amazon: "https://www.amazon.in/s?k=vastucart",
  pinterest: "https://in.pinterest.com/vastucart/",
  threads: "https://www.threads.com/@vastucart",
  x: "https://x.com/vastucart",
} as const;

export const NATURE_STYLES = {
  auspicious: {
    bg: "bg-[var(--color-nature-auspicious-light)]",
    border: "border-[var(--color-nature-auspicious)]/20",
    text: "text-green-700",
    dot: "bg-[var(--color-nature-auspicious)]",
    fill: "var(--color-nature-auspicious)",
    label: "Auspicious",
  },
  excellent: {
    bg: "bg-[var(--color-nature-auspicious-light)]",
    border: "border-[var(--color-nature-auspicious)]/20",
    text: "text-green-700",
    dot: "bg-[var(--color-nature-excellent)]",
    fill: "var(--color-nature-excellent)",
    label: "Excellent",
  },
  good: {
    bg: "bg-lime-50",
    border: "border-lime-200",
    text: "text-lime-700",
    dot: "bg-[var(--color-nature-good)]",
    fill: "var(--color-nature-good)",
    label: "Good",
  },
  neutral: {
    bg: "bg-[var(--color-nature-neutral-light)]",
    border: "border-[var(--color-nature-neutral)]/20",
    text: "text-amber-700",
    dot: "bg-[var(--color-nature-neutral)]",
    fill: "var(--color-nature-neutral)",
    label: "Neutral",
  },
  average: {
    bg: "bg-[var(--color-nature-neutral-light)]",
    border: "border-[var(--color-nature-neutral)]/20",
    text: "text-amber-700",
    dot: "bg-[var(--color-nature-average)]",
    fill: "var(--color-nature-average)",
    label: "Average",
  },
  inauspicious: {
    bg: "bg-[var(--color-nature-inauspicious-light)]",
    border: "border-[var(--color-nature-inauspicious)]/20",
    text: "text-red-700",
    dot: "bg-[var(--color-nature-inauspicious)]",
    fill: "var(--color-nature-inauspicious)",
    label: "Inauspicious",
  },
  "below average": {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    dot: "bg-[var(--color-nature-below-average)]",
    fill: "var(--color-nature-below-average)",
    label: "Below Average",
  },
  poor: {
    bg: "bg-[var(--color-nature-inauspicious-light)]",
    border: "border-[var(--color-nature-inauspicious)]/20",
    text: "text-red-700",
    dot: "bg-[var(--color-nature-poor)]",
    fill: "var(--color-nature-poor)",
    label: "Poor",
  },
} as const;

export function getNatureStyle(nature: string) {
  const key = nature.toLowerCase() as keyof typeof NATURE_STYLES;
  return NATURE_STYLES[key] || NATURE_STYLES.neutral;
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  if (score >= 20) return "Below Average";
  return "Poor";
}

export function getScoreNature(score: number): string {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "average";
  if (score >= 20) return "below average";
  return "poor";
}
