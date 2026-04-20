import { IDS, REFS, SITE_ORIGIN } from "./ids";

export function buildAboutPageSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": IDS.aboutPage,
    url: `${SITE_ORIGIN}/about`,
    name: "About Panchang by VastuCart",
    description:
      "Our methodology, sources, and commitment to accurate Vedic Panchang data for every Indian city.",
    isPartOf: { "@id": IDS.website },
    mainEntity: { "@id": REFS.organization },
    about: { "@id": IDS.webapp },
    inLanguage: "en-IN",
    publisher: { "@id": REFS.organization },
  };
}
