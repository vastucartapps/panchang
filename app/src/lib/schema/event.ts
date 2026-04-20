import { IDS, REFS, SITE_ORIGIN } from "./ids";

export interface FestivalEventInput {
  slug: string; // "diwali-2026"
  name: string; // "Diwali" (cleaned — no parentheticals)
  nameHindi?: string;
  year: number;
  date: string; // YYYY-MM-DD (IST civil date)
  endDate?: string; // optional multi-day; defaults to same as date
  description: string;
  imageUrl?: string; // absolute HTTPS, 1200×630 preferred
  aboutRefs?: string[]; // concept @id references (deity, tithi, etc.)
  mode?: "offline" | "mixed"; // default offline — festivals observed at temples/homes
}

/**
 * Event schema for a Hindu festival page. Corrects the v1 emission's
 * known issues per Reference Files/05 §B.4:
 *
 *   - Default eventAttendanceMode is Offline (festivals are physically
 *     observed at temples / homes). Pass mode: "mixed" only when there's
 *     a genuine livestream component.
 *   - @id follows the canonical contract {origin}/hindu-festivals/{slug}#event.
 *   - organizer references the Organization @id (not an inline entity —
 *     would violate shared-contracts §5.2).
 *   - image is wrapped as ImageObject with explicit dimensions (Google's
 *     Event rich-result card weights ImageObject over bare URL).
 *   - isPartOf → WebSite @id binds the Event into the site's entity graph.
 *   - IST offset (+05:30) on dates — India-observed festivals must not
 *     drift to UTC midnight (v2 §4 timezone rigor).
 */
export function buildFestivalEventSchema(f: FestivalEventInput): object | null {
  if (!f.slug || !f.name || !f.date) return null;

  const attendance =
    f.mode === "mixed"
      ? "https://schema.org/MixedEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode";

  const startDate = `${f.date}T00:00:00+05:30`;
  const endDate = `${f.endDate ?? f.date}T23:59:59+05:30`;
  const url = `${SITE_ORIGIN}/hindu-festivals/${f.slug}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${url}#event`,
    name: `${f.name} ${f.year}`,
    startDate,
    endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: attendance,
    description: f.description,
    url,
    location: {
      "@type": "Place",
      name: "India",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    organizer: { "@id": REFS.organization },
    isPartOf: { "@id": IDS.website },
    inLanguage: ["en-IN", "hi-IN"],
    audience: {
      "@type": "Audience",
      audienceType: "Hindus worldwide",
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,
      validFrom: `${f.year - 1}-12-31T00:00:00+05:30`,
    },
  };

  if (f.nameHindi) {
    schema.alternateName = f.nameHindi;
  }

  if (f.imageUrl) {
    schema.image = {
      "@type": "ImageObject",
      url: f.imageUrl,
      width: "1200",
      height: "630",
    };
  }

  if (f.aboutRefs?.length) {
    schema.about = f.aboutRefs.map((ref) => ({ "@id": ref }));
  }

  return schema;
}
