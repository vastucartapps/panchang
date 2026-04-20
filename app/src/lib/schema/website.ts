import { IDS, REFS, BRAND_LOGO_URL, SITE_ORIGIN } from "./ids";

// Emitted once on the homepage. Other pages reference these entities via
// @id only (never redeclare). The @graph shape lets Google bind all three
// entities to the same page in one parse.
export function buildHomepageGraph(): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": IDS.website,
        url: `${SITE_ORIGIN}/`,
        name: "Panchang by VastuCart",
        description:
          "Accurate Vedic Panchang for 200+ Indian cities. Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Choghadiya, sunrise, sunset — updated daily.",
        inLanguage: "en-IN",
        publisher: { "@id": REFS.organization },
      },
      {
        "@type": "WebApplication",
        "@id": IDS.webapp,
        name: "Panchang",
        url: `${SITE_ORIGIN}/`,
        description:
          "Free Vedic Panchang web app — daily Tithi, Nakshatra, Rahu Kaal, Choghadiya and Muhurta for 200+ Indian cities.",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and a modern browser.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        isAccessibleForFree: true,
        publisher: { "@id": REFS.organization },
        inLanguage: "en-IN",
        about: [
          { "@id": REFS.conceptPanchang },
          { "@id": REFS.conceptTithiSet },
          { "@id": REFS.conceptNakshatraSet },
        ],
      },
      {
        "@type": "Brand",
        "@id": IDS.brand,
        name: "Panchang by VastuCart",
        logo: BRAND_LOGO_URL,
        parentOrganization: { "@id": REFS.organization },
      },
    ],
  };
}
