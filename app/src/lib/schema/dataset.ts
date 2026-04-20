import { REFS, SITE_ORIGIN } from "./ids";

export interface CityDatasetInput {
  slug: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  dateModified: string; // IST ISO (from lib/tz istIso helper or similar)
}

/**
 * Dataset schema per city. Google Dataset Search surfaces rich results
 * for properly-structured Datasets; each city becomes individually
 * eligible. Gate on lat/lng — a Dataset with empty spatialCoverage is
 * a known rich-result reject.
 *
 * @id contract: {origin}/{city-slug}#dataset (per Reference Files
 * §1 "Dataset (per city)" ownership table).
 */
export function buildCityDatasetSchema(city: CityDatasetInput): object | null {
  if (!city.lat || !city.lng) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_ORIGIN}/${city.slug}#dataset`,
    name: `Daily Panchang Dataset — ${city.name}, ${city.state}`,
    description: `Tithi, Nakshatra, Yoga, Karana, Vara, sunrise, sunset, Rahu Kaal, Yamaganda, Gulika Kaal, Abhijit Muhurta, Brahma Muhurta, and Choghadiya for ${city.name}, ${city.state}, India. Computed daily using the Drik Ganita system with Lahiri Ayanamsa.`,
    url: `${SITE_ORIGIN}/${city.slug}`,
    creator: { "@id": REFS.organization },
    publisher: { "@id": REFS.organization },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    spatialCoverage: {
      "@type": "Place",
      name: `${city.name}, ${city.state}, India`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lng,
      },
    },
    temporalCoverage: "2020-01-01/..", // open-ended: "2020 onwards"
    datePublished: "2022-01-01",
    dateModified: city.dateModified,
    inLanguage: "en-IN",
    keywords: [
      `panchang ${city.name}`,
      `tithi ${city.name}`,
      `nakshatra ${city.name}`,
      `rahu kaal ${city.name}`,
      `choghadiya ${city.name}`,
      "hindu calendar",
      "vedic panchang",
      "drik ganita",
    ],
    variableMeasured: [
      { "@type": "PropertyValue", name: "Tithi", url: REFS.conceptTithiSet },
      { "@type": "PropertyValue", name: "Nakshatra", url: REFS.conceptNakshatraSet },
      { "@type": "PropertyValue", name: "Yoga" },
      { "@type": "PropertyValue", name: "Karana" },
      { "@type": "PropertyValue", name: "Vara (Weekday)" },
      { "@type": "PropertyValue", name: "Sunrise" },
      { "@type": "PropertyValue", name: "Sunset" },
      { "@type": "PropertyValue", name: "Rahu Kaal", url: REFS.conceptRahuKaal },
      { "@type": "PropertyValue", name: "Yamaganda" },
      { "@type": "PropertyValue", name: "Gulika Kaal" },
      { "@type": "PropertyValue", name: "Abhijit Muhurta" },
      { "@type": "PropertyValue", name: "Brahma Muhurta" },
      { "@type": "PropertyValue", name: "Choghadiya", url: REFS.conceptChoghadiya },
    ],
  };
}
