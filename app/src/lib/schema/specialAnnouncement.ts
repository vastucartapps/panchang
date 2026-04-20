import { SITE_ORIGIN } from "./ids";

export interface FestivalAnnouncementInput {
  slug: string;
  name: string;
  year: number;
  date: string; // YYYY-MM-DD
  description: string;
}

/**
 * SpecialAnnouncement for a festival inside the 30-day lead-up window.
 * Google surfaces these on the SERP for time-sensitive Hindu events and
 * the Discover feed. Emission is gated — only returns a schema when
 * today is within 30 days before the festival OR up to the festival day
 * itself. Outside that window returns null (no emission).
 *
 * Reference Files/05 §B.5.
 */
export function buildFestivalAnnouncementSchema(
  f: FestivalAnnouncementInput
): object | null {
  const today = new Date();
  const target = new Date(`${f.date}T00:00:00+05:30`);
  const msPerDay = 86_400_000;
  const daysUntil = Math.floor((target.getTime() - today.getTime()) / msPerDay);

  if (daysUntil < 0 || daysUntil > 30) return null;

  const url = `${SITE_ORIGIN}/hindu-festivals/${f.slug}`;
  const datePosted = today.toISOString().split(".")[0] + "+00:00";
  const expires = `${f.date}T23:59:59+05:30`;

  return {
    "@context": "https://schema.org",
    "@type": "SpecialAnnouncement",
    "@id": `${url}#announcement`,
    name: `${f.name} ${f.year} — Muhurta and Puja Vidhi`,
    text: f.description,
    datePosted,
    expires,
    category: "https://en.wikipedia.org/wiki/Hindu_festivals",
    url,
    spatialCoverage: {
      "@type": "Country",
      name: "India",
    },
    inLanguage: ["en-IN", "hi-IN"],
  };
}
