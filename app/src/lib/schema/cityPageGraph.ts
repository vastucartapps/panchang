import { IDS, REFS, SITE_ORIGIN } from "./ids";
import { buildCityDatasetSchema, type CityDatasetInput } from "./dataset";
import { buildCityServiceSchema } from "./service";

/**
 * Combined @graph for /[city] pages: WebPage + Dataset + Service +
 * BreadcrumbList + SpeakableSpecification. One parse, all entities
 * cross-linked by @id.
 *
 * The Speakable selector `.panchang-today-summary` must exist in the
 * rendered DOM at first paint (not JS-hydrated-only) per Google's
 * Speakable requirements. See DailySummary component — carries the
 * class.
 */
export function buildCityPageGraph(city: CityDatasetInput): object | null {
  const dataset = buildCityDatasetSchema(city);
  const service = buildCityServiceSchema(city);
  if (!dataset || !service) return null;

  const pageUrl = `${SITE_ORIGIN}/${city.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: `Panchang Today — ${city.name}, ${city.state}`,
        description: `Today's Tithi, Nakshatra, Rahu Kaal, Choghadiya, sunrise, sunset, and auspicious muhurtas for ${city.name}, ${city.state}.`,
        isPartOf: { "@id": IDS.website },
        about: [
          { "@id": REFS.conceptPanchang },
          { "@id": REFS.conceptTithiSet },
          { "@id": REFS.conceptNakshatraSet },
        ],
        mainEntity: { "@id": `${pageUrl}#dataset` },
        inLanguage: "en-IN",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".panchang-today-summary"],
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${SITE_ORIGIN}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: city.name,
            },
          ],
        },
      },
      dataset,
      service,
    ],
  };
}
