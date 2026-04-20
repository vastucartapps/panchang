import { IDS, REFS } from "@/lib/schema/ids";

interface FaqItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  city?: string;
  breadcrumbs?: { name: string; url: string }[];
  faqs?: FaqItem[];
}

/**
 * Per-page JSON-LD emitter. Keeps page-scoped schemas (Breadcrumb, FAQ)
 * inline and references the global entities (Organization, WebSite) via
 * @id. Local Organization emission was removed — vastucart.in owns that
 * canonical declaration and every subdomain only references it (shared
 * contracts §2.1, §5.2). Emitting it locally breaks the entity graph.
 */
export function JsonLd({ breadcrumbs, faqs }: JsonLdProps) {
  const schemas: object[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  // Reference WebSite + Organization on every page so Google links the
  // entity graph even on pages that only emit page-scoped schemas.
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    isPartOf: { "@id": IDS.website },
    publisher: { "@id": REFS.organization },
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
