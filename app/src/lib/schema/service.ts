import { REFS, SITE_ORIGIN } from "./ids";

export interface CityServiceInput {
  slug: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
}

/**
 * Service schema per city — models the panchang offering as a
 * service-area business without the LocalBusiness Address constraint.
 * Reference Files/05 §B.3 explicitly prefers Service over
 * LocalBusiness when no physical address exists at the city level,
 * since Google's LocalBusiness heuristics penalize missing PostalAddress.
 *
 * priceRange intentionally omitted — schema.org spec allows it but
 * Google's LocalBusiness validator rejects "Free" as a literal value.
 * isAccessibleForFree + free-priced offer express the same fact in the
 * shape Google consumes.
 */
export function buildCityServiceSchema(city: CityServiceInput): object | null {
  if (!city.lat || !city.lng) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_ORIGIN}/${city.slug}#service`,
    name: `Vedic Panchang Service — ${city.name}`,
    description: `Free daily Panchang, Tithi, Nakshatra, Rahu Kaal, and Choghadiya timings for ${city.name}, ${city.state}, India — computed per local sunrise.`,
    serviceType: "Vedic Panchang",
    provider: { "@id": REFS.organization },
    areaServed: {
      "@type": "City",
      name: city.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lng,
      },
      containedInPlace: { "@type": "Country", name: "India" },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: true,
    url: `${SITE_ORIGIN}/${city.slug}`,
    inLanguage: "en-IN",
  };
}
