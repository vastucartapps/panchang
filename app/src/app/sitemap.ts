import type { MetadataRoute } from "next";
import { getCitySlugs } from "@/lib/cities";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getCitySlugs();

  const cityPages = slugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const seoPages = [
    "rahu-kaal-today",
    "choghadiya-today",
    "todays-tithi",
    "todays-nakshatra",
    "moon-phase-today",
    "what-is-panchang",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...cityPages,
    ...seoPages,
  ];
}
