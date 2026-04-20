import { IDS, REFS, SITE_ORIGIN } from "./ids";

interface PillarArticleInput {
  id: string; // canonical @id for this article (from IDS or derived)
  url: string; // absolute URL
  headline: string;
  description: string;
  body: string; // full article body for gate check
  datePublished: string; // ISO
  dateModified: string; // ISO
  authorRef?: string; // @id reference; defaults to editorial
  aboutRefs?: string[]; // concept @id references
  hasPartRefs?: string[]; // sub-pillar article @id references
  imageUrl?: string;
}

// Gate on body depth. Thin-content Article pages get penalized and have
// no business emitting rich-result schema.
const MIN_BODY_CHARS = 1500;

export function buildPillarArticleSchema(input: PillarArticleInput): object | null {
  if (!input.body || input.body.length < MIN_BODY_CHARS) return null;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": input.id,
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@id": input.authorRef ?? REFS.authorEditorial },
    publisher: { "@id": REFS.organization },
    isPartOf: { "@id": IDS.website },
    inLanguage: "en-IN",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${input.url}#webpage`,
    },
  };

  if (input.aboutRefs?.length) {
    schema.about = input.aboutRefs.map((ref) => ({ "@id": ref }));
  }
  if (input.hasPartRefs?.length) {
    schema.hasPart = input.hasPartRefs.map((ref) => ({ "@id": ref }));
  }
  if (input.imageUrl) {
    schema.image = input.imageUrl;
  }

  return schema;
}

export function pillarDefaultImage(): string {
  return `${SITE_ORIGIN}/images/vastucart-logo.png`;
}
