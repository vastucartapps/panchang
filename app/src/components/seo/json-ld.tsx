import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

interface FaqItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  city?: string;
  breadcrumbs?: { name: string; url: string }[];
  faqs?: FaqItem[];
}

export function JsonLd({ breadcrumbs, faqs }: JsonLdProps) {
  const schemas = [];

  // WebSite schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.brandUrl,
    },
  });

  // Organization schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.brandUrl,
    logo: `${SITE_CONFIG.url}/images/vastucart-logo.png`,
    sameAs: Object.values(SOCIAL_LINKS),
  });

  // BreadcrumbList
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

  // FAQPage schema for rich results
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
