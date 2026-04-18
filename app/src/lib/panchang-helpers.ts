/**
 * Helpers used by the calendar UI: week-date computation, score→color bucketing,
 * Vikram Samvat conversion, Hindu month span labels.
 *
 * Palette constants live here (not Tailwind theme) because the calendar design
 * uses its own teal/coral system that's distinct from the site-wide palette.
 */

export const CAL_COLORS = {
  teal: {
    border: "#0F6E56",
    fill: "#E1F5EE",
    textDark: "#04342C",
    pillText: "#085041",
    decorative: "rgba(29,158,117,0.08)",
  },
  coral: {
    border: "#F0997B",
    fill: "#FAECE7",
    text: "#712B13",
    countdown: "#993C1D",
  },
  moon: {
    outline: "#5F5E5A",
    dark: "#2C2C2A",
    light: "#F1EFE8",
  },
  text: {
    primary: "#2C2C2A",
    secondary: "#5F5E5A",
  },
  score: {
    goodDot: "#639922",
    goodText: "#3B6D11",
    moderateDot: "#BA7517",
    moderateText: "#854F0B",
    poorDot: "#A32D2D",
    poorText: "#791F1F",
  },
  heroGradient: "linear-gradient(135deg, #E1F5EE 0%, #F1EFE8 100%)",
} as const;

export function scoreTier(score: number): "good" | "moderate" | "poor" {
  if (score >= 70) return "good";
  if (score >= 40) return "moderate";
  return "poor";
}

export function scoreColors(score: number): { dot: string; text: string } {
  const tier = scoreTier(score);
  if (tier === "good") return { dot: CAL_COLORS.score.goodDot, text: CAL_COLORS.score.goodText };
  if (tier === "moderate") return { dot: CAL_COLORS.score.moderateDot, text: CAL_COLORS.score.moderateText };
  return { dot: CAL_COLORS.score.poorDot, text: CAL_COLORS.score.poorText };
}

/** Monday–Sunday dates of the ISO week containing `dateISO`. */
export function getWeekDatesAround(dateISO: string): string[] {
  const d = new Date(dateISO + "T00:00:00");
  const dayOfWeek = d.getDay() || 7; // Mon=1, Sun=7
  const monday = new Date(d);
  monday.setDate(d.getDate() - dayOfWeek + 1);
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const x = new Date(monday);
    x.setDate(monday.getDate() + i);
    dates.push(
      `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`
    );
  }
  return dates;
}

/**
 * Vikram Samvat year for a Gregorian (year, month). VS begins in Chaitra
 * (roughly mid-March), so Jan–mid-Mar = (year + 56), rest = (year + 57).
 * Using month boundary as a reasonable approximation for calendar display.
 */
export function vikramSamvatYear(year: number, month: number): number {
  return month <= 3 ? year + 56 : year + 57;
}

/** Hindu (amanta) months that typically span a given Gregorian month. */
export function hinduMonthSpanLabel(month: number): string {
  const spans: Record<number, string> = {
    1: "Pausha — Magha",
    2: "Magha — Phalguna",
    3: "Phalguna — Chaitra",
    4: "Chaitra — Vaisakha",
    5: "Vaisakha — Jyeshtha",
    6: "Jyeshtha — Ashadha",
    7: "Ashadha — Shravana",
    8: "Shravana — Bhadrapada",
    9: "Bhadrapada — Ashwin",
    10: "Ashwin — Kartik",
    11: "Kartik — Margashirsha",
    12: "Margashirsha — Pausha",
  };
  return spans[month] ?? "";
}

/** Prettify SNAKE_CASE names like "KRISHNA_CHATURDASHI" → "Krishna Chaturdashi" */
export function prettifyEnum(s: string): string {
  return s
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Days until a future YYYY-MM-DD (0 = today, 1 = tomorrow). */
export function daysUntil(targetISO: string, todayISO: string): number {
  const a = new Date(targetISO + "T00:00:00").getTime();
  const b = new Date(todayISO + "T00:00:00").getTime();
  return Math.max(0, Math.round((a - b) / 86400000));
}

/** ISO date → "Apr 18" (Short month + day, no year). */
export function shortMonthDay(dateISO: string): string {
  const d = new Date(dateISO + "T00:00:00");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

/** ISO date → "Monday" */
export function weekdayName(dateISO: string): string {
  const d = new Date(dateISO + "T00:00:00");
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
}
