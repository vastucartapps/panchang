import { IDS, REFS, SITE_ORIGIN } from "./ids";

export function buildContactPageGraph(): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": IDS.contactPage,
        url: `${SITE_ORIGIN}/contact`,
        name: "Contact VastuCart Panchang",
        description:
          "Reach the VastuCart team for Panchang data corrections, muhurta questions, feature requests, or partnership inquiries.",
        isPartOf: { "@id": IDS.website },
        inLanguage: "en-IN",
        publisher: { "@id": REFS.organization },
        mainEntity: { "@id": IDS.contactPoint },
      },
      {
        "@type": "ContactPoint",
        "@id": IDS.contactPoint,
        contactType: "customer support",
        email: "hi@vastucart.in",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
    ],
  };
}
