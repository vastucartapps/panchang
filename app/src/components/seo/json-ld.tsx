import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

interface JsonLdProps {
  city?: string;
  breadcrumbs?: { name: string; url: string }[];
}

export function JsonLd({ city, breadcrumbs }: JsonLdProps) {
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

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
