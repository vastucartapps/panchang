import type { Festival } from "@/data/festivals";
import { SITE_CONFIG, DEFAULT_LOCATION } from "@/lib/constants";

/**
 * Event schema (schema.org/Event) for a Hindu festival detail page.
 *
 * Produces a single JSON-LD block with required + strongly-recommended
 * fields per Google's Event structured data guidelines:
 *   https://developers.google.com/search/docs/appearance/structured-data/event
 *
 * Eligibility: produces rich-result "event" cards in Google SERP, which
 * for high-traffic festivals (Diwali, Holi, Navratri, etc.) can dominate
 * the SERP ahead of Wikipedia and competitor sites.
 */
export function EventJsonLd({ festival, canonicalUrl }: { festival: Festival; canonicalUrl: string }) {
  const ogImage = `${SITE_CONFIG.url}/api/og/${DEFAULT_LOCATION.slug}/${festival.date}`;
  // Festivals observed across India — location type "Place" with country-level address
  // satisfies Google's required location field for non-geographically-fixed events.
  const location = {
    "@type": "Place",
    name: "India",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };

  // IST offset assumed for religious festival dates (all our data is IST-based)
  const startDate = `${festival.date}T00:00:00+05:30`;
  const endDate = `${festival.date}T23:59:59+05:30`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${festival.name} ${festival.year}`,
    alternateName: festival.nameHindi,
    startDate,
    endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location,
    description: festival.description,
    image: [ogImage],
    url: canonicalUrl,
    organizer: {
      "@type": "Organization",
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.brandUrl,
    },
    // isAccessibleForFree and offers required by Google to avoid "missing
    // field" warnings — mark festival as free, universally accessible.
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
      validFrom: `${festival.year - 1}-12-31T00:00:00+05:30`,
    },
    // Performer/audience: festivals are participatory religious events
    audience: {
      "@type": "Audience",
      audienceType: "Hindu community, general public",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
