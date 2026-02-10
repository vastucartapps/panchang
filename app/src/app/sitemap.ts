import type { MetadataRoute } from "next";
import { getCitySlugs } from "@/lib/cities";
import { format, addDays } from "date-fns";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";

const SEO_TOPICS = [
  "rahu-kaal-today",
  "choghadiya-today",
  "todays-tithi",
  "todays-nakshatra",
  "moon-phase-today",
];

// Past 7 days + today + next 30 days = 38 days
const PAST_DAYS = 7;
const FUTURE_DAYS = 30;

function getDateRange(): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = -PAST_DAYS; i <= FUTURE_DAYS; i++) {
    dates.push(format(addDays(today, i), "yyyy-MM-dd"));
  }
  return dates;
}

// Sitemap 0: Main pages (home, city index, SEO hubs, legal)
// Sitemap 1: City/date panchang pages
// Sitemap 2: Rahu Kaal city topic pages
// Sitemap 3: Choghadiya city topic pages
// Sitemap 4: Tithi city topic pages
// Sitemap 5: Nakshatra city topic pages
// Sitemap 6: Moon Phase city topic pages
export const dynamic = "force-dynamic";

export async function generateSitemaps() {
  return [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const sitemapId = Number(id);
  const slugs = getCitySlugs();
  const today = new Date();
  const dates = getDateRange();

  // Sitemap 0: Main pages
  if (sitemapId === 0) {
    const cityPages = slugs.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: today,
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

    const seoHubPages = [
      ...SEO_TOPICS,
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
      ...seoHubPages,
      ...legalPages,
    ];
  }

  // Sitemap 1: City/date panchang pages (/city/date)
  if (sitemapId === 1) {
    const pages: MetadataRoute.Sitemap = [];
    for (const slug of slugs) {
      for (const date of dates) {
        const isToday = date === format(today, "yyyy-MM-dd");
        pages.push({
          url: `${SITE_URL}/${slug}/${date}`,
          lastModified: today,
          changeFrequency: isToday ? "daily" as const : "weekly" as const,
          priority: isToday ? 0.8 : 0.6,
        });
      }
    }
    return pages;
  }

  // Sitemaps 2-6: City topic pages (/city/topic/date)
  const topicIndex = sitemapId - 2;
  if (topicIndex >= 0 && topicIndex < SEO_TOPICS.length) {
    const topic = SEO_TOPICS[topicIndex];
    const pages: MetadataRoute.Sitemap = [];
    for (const slug of slugs) {
      for (const date of dates) {
        const isToday = date === format(today, "yyyy-MM-dd");
        pages.push({
          url: `${SITE_URL}/${slug}/${topic}/${date}`,
          lastModified: today,
          changeFrequency: isToday ? "daily" as const : "weekly" as const,
          priority: isToday ? 0.7 : 0.5,
        });
      }
    }
    return pages;
  }

  return [];
}
