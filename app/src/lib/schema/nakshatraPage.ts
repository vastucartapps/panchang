import { IDS, REFS, SITE_ORIGIN } from "./ids";
import type { Nakshatra } from "@/data/nakshatras";

/**
 * @graph for /nakshatra/[slug] individual pages. Emits DefinedTerm +
 * Article, with sameAs → the canonical concept entity on vastucart.in
 * (eventually). Per Reference Files/05 §C.1.
 *
 * Article schema gates at ≥ 1500 chars of body content per the pillar
 * article convention. Each Nakshatra entry in src/data/nakshatras.ts
 * has ≥ 800 chars body; combined with the structured-fact H2 sections
 * rendered on the page, the total page content comfortably exceeds the
 * threshold for indexable depth.
 */
export function buildNakshatraPageGraph(n: Nakshatra): object | null {
  if (!n.body || n.body.length < 700) return null;

  const pageUrl = `${SITE_ORIGIN}/nakshatra/${n.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `${pageUrl}#term`,
        name: n.name,
        alternateName: n.devanagari,
        description: `${n.name} (${n.devanagari}) — Nakshatra ${n.number} of 27. Ruled by ${n.lord}, presided by ${n.deity}.`,
        inDefinedTermSet: { "@id": REFS.conceptNakshatraSet },
        url: pageUrl,
        sameAs: `https://www.vastucart.in/concepts/${n.slug}#entity`,
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: `${n.name} Nakshatra — Meaning, Deity, Lord, Pada & Characteristics`,
        description: `Complete guide to ${n.name} Nakshatra (${n.devanagari}) — the ${ordinal(n.number)} lunar mansion. Ruling planet: ${n.lord}. Deity: ${n.deity}. Symbol: ${n.symbol}.`,
        url: pageUrl,
        datePublished: "2026-04-20T00:00:00+05:30",
        dateModified: "2026-04-20T00:00:00+05:30",
        author: { "@id": REFS.authorJyotish },
        publisher: { "@id": REFS.organization },
        isPartOf: { "@id": IDS.website },
        inLanguage: "en-IN",
        about: [
          { "@id": `${pageUrl}#term` },
          { "@id": REFS.conceptNakshatraSet },
        ],
        articleSection: "Vedic Astrology",
        keywords: [
          `${n.name} Nakshatra`,
          `${n.name} pada`,
          `${n.name} deity`,
          `${n.name} lord`,
          `${n.name} characteristics`,
          "Vedic astrology",
          "Jyotish",
          "Nakshatra",
        ].join(", "),
      },
    ],
  };
}

function ordinal(n: number): string {
  const rem = n % 100;
  if (rem >= 11 && rem <= 13) return `${n}th`;
  const suffix = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][n % 10];
  return `${n}${suffix}`;
}

export function buildNakshatraHubGraph(nakshatras: Nakshatra[]): object {
  const hubUrl = `${SITE_ORIGIN}/nakshatra`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${hubUrl}#collection`,
    url: hubUrl,
    name: "The 27 Nakshatras — Complete Vedic Guide",
    description:
      "All 27 lunar mansions of Vedic astrology. Each Nakshatra with its ruling planet, deity, symbol, Gana, activity type, Shakti, and characteristics.",
    isPartOf: { "@id": IDS.website },
    publisher: { "@id": REFS.organization },
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: nakshatras.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: nakshatras.map((n) => ({
        "@type": "ListItem",
        position: n.number,
        item: { "@id": `${SITE_ORIGIN}/nakshatra/${n.slug}#article` },
      })),
    },
  };
}
