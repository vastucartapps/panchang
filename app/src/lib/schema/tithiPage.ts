import { IDS, REFS, SITE_ORIGIN } from "./ids";
import type { Tithi } from "@/data/tithis";

/**
 * @graph for /tithi/[slug] individual pages. Emits DefinedTerm +
 * Article, with sameAs → the canonical concept entity on vastucart.in
 * (eventually, when File 01 ships /concepts/tithi/...). Per Reference
 * Files/05 §C.2.
 */
export function buildTithiPageGraph(t: Tithi): object | null {
  if (!t.body || t.body.length < 700) return null;

  const pageUrl = `${SITE_ORIGIN}/tithi/${t.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `${pageUrl}#term`,
        name: t.name,
        alternateName: t.devanagari,
        description: `${t.name} (${t.devanagari}) — the ${ordinal(t.number)} Tithi. Category: ${t.category}.`,
        inDefinedTermSet: { "@id": REFS.conceptTithiSet },
        url: pageUrl,
        sameAs: `https://www.vastucart.in/concepts/tithi/${t.slug}#entity`,
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: `${t.name} Tithi — Category, Deity, Observances & Significance`,
        description: `Complete guide to ${t.name} Tithi (${t.devanagari}) — the ${ordinal(t.number)} Tithi. Category: ${t.category}. Shukla deity: ${t.shuklaDeity}. Krishna deity: ${t.krishnaDeity}.`,
        url: pageUrl,
        datePublished: "2026-04-20T00:00:00+05:30",
        dateModified: "2026-04-20T00:00:00+05:30",
        author: { "@id": REFS.authorEditorial },
        publisher: { "@id": REFS.organization },
        isPartOf: { "@id": IDS.website },
        inLanguage: "en-IN",
        about: [
          { "@id": `${pageUrl}#term` },
          { "@id": REFS.conceptTithiSet },
        ],
        articleSection: "Hindu Calendar",
        keywords: [
          `${t.name} Tithi`,
          `${t.name} vrat`,
          `${t.name} significance`,
          `${t.name} deity`,
          "Hindu calendar",
          "Panchang",
          "Tithi",
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

export function buildTithiHubGraph(tithis: Tithi[]): object {
  const hubUrl = `${SITE_ORIGIN}/tithi`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${hubUrl}#collection`,
    url: hubUrl,
    name: "The 16 Tithis of the Hindu Panchang — Complete Guide",
    description:
      "All 16 canonical Tithi names of the Hindu calendar — 14 that appear in both Shukla and Krishna pakshas plus Purnima and Amavasya. Each with category, deity, and major observances.",
    isPartOf: { "@id": IDS.website },
    publisher: { "@id": REFS.organization },
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tithis.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: tithis.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@id": `${SITE_ORIGIN}/tithi/${t.slug}#article` },
      })),
    },
  };
}
