import type { MetadataRoute } from "next";
import { getCitySlugs } from "@/lib/cities";
import { format, addDays } from "date-fns";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getCitySlugs();
  const today = new Date();

  const cityPages = slugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: today,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Generate /city/date pages: today + next 30 days for every city
  const cityDatePages: MetadataRoute.Sitemap = [];
  for (const slug of slugs) {
    for (let i = 0; i <= 30; i++) {
      const date = format(addDays(today, i), "yyyy-MM-dd");
      cityDatePages.push({
        url: `${SITE_URL}/${slug}/${date}`,
        lastModified: today,
        changeFrequency: i === 0 ? "daily" as const : "weekly" as const,
        priority: i === 0 ? 0.8 : 0.6,
      });
    }
  }

  const seoPages = [
    "rahu-kaal-today",
    "choghadiya-today",
    "todays-tithi",
    "todays-nakshatra",
    "moon-phase-today",
    "what-is-panchang",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: today,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const legalPages = [
    "privacy-policy",
    "terms-of-service",
    "disclaimer",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: today,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1,
    },
    ...cityPages,
    ...cityDatePages,
    ...seoPages,
    ...legalPages,
  ];
}
