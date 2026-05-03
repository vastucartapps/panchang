import { IDS, REFS, BRAND_LOGO_URL, SITE_ORIGIN } from "./ids";
import { getAllCities } from "@/lib/cities";

const VASTUCART_ORIGIN = "https://www.vastucart.in";

const ORGANIZATION_SAME_AS = [
  "https://www.linkedin.com/company/vastucart",
  "https://www.facebook.com/vastucartindia",
  "https://www.instagram.com/vastucart/",
  "https://in.pinterest.com/vastucart/",
  "https://www.threads.com/@vastucart",
  "https://x.com/vastucart",
  "https://vastucart.etsy.com",
  "https://www.amazon.in/s?k=vastucart",
];

// Emitted once on the homepage. Other pages reference these entities via
// @id only (never redeclare). The @graph shape lets Google bind all
// entities to the same page in one parse.
export function buildHomepageGraph(): object {
  const cities = getAllCities();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": REFS.organization,
        name: "VastuCart",
        url: VASTUCART_ORIGIN,
        logo: BRAND_LOGO_URL,
        sameAs: ORGANIZATION_SAME_AS,
      },
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
        url: `${SITE_ORIGIN}/`,
        logo: BRAND_LOGO_URL,
        parentOrganization: { "@id": REFS.organization },
      },
      {
        "@type": "ItemList",
        name: "Aaj Ka Panchang for Indian cities",
        numberOfItems: cities.length,
        itemListElement: cities.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: `${SITE_ORIGIN}/${c.slug}`,
        })),
      },
    ],
  };
}
