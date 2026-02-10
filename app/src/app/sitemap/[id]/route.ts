import { NextResponse } from "next/server";
import { getCitySlugs } from "@/lib/cities";
import { format, addDays } from "date-fns";

const SITE_URL = "https://panchang.vastucart.in";

const SEO_TOPICS = [
  "rahu-kaal-today",
  "choghadiya-today",
  "todays-tithi",
  "todays-nakshatra",
  "moon-phase-today",
];

const PAST_DAYS = 7;
const FUTURE_DAYS = 30;

export const dynamic = "force-dynamic";

function getDateRange(): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = -PAST_DAYS; i <= FUTURE_DAYS; i++) {
    dates.push(format(addDays(today, i), "yyyy-MM-dd"));
  }
  return dates;
}

function urlEntry(url: string, changefreq: string, priority: number): string {
  const lastmod = format(new Date(), "yyyy-MM-dd");
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function wrapUrlset(entries: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  // Handle both /sitemap/0 and /sitemap/0.xml
  const sitemapId = Number(rawId.replace(".xml", ""));

  if (isNaN(sitemapId) || sitemapId < 0 || sitemapId > 6) {
    return new NextResponse("Not found", { status: 404 });
  }

  const slugs = getCitySlugs();
  const dates = getDateRange();
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const entries: string[] = [];

  // Sitemap 0: Main pages (home, cities, SEO hubs, legal)
  if (sitemapId === 0) {
    entries.push(urlEntry(SITE_URL, "daily", 1));

    for (const slug of slugs) {
      entries.push(urlEntry(`${SITE_URL}/${slug}`, "daily", 0.9));
    }

    for (const topic of [...SEO_TOPICS, "what-is-panchang"]) {
      entries.push(urlEntry(`${SITE_URL}/${topic}`, "daily", 0.8));
    }

    for (const page of ["privacy-policy", "terms-of-service", "disclaimer"]) {
      entries.push(urlEntry(`${SITE_URL}/${page}`, "yearly", 0.3));
    }
  }

  // Sitemap 1: City/date panchang pages (/city/date)
  else if (sitemapId === 1) {
    for (const slug of slugs) {
      for (const date of dates) {
        const isToday = date === todayStr;
        entries.push(
          urlEntry(
            `${SITE_URL}/${slug}/${date}`,
            isToday ? "daily" : "weekly",
            isToday ? 0.8 : 0.6
          )
        );
      }
    }
  }

  // Sitemaps 2-6: City topic pages (/city/topic/date)
  else {
    const topicIndex = sitemapId - 2;
    if (topicIndex >= 0 && topicIndex < SEO_TOPICS.length) {
      const topic = SEO_TOPICS[topicIndex];
      for (const slug of slugs) {
        for (const date of dates) {
          const isToday = date === todayStr;
          entries.push(
            urlEntry(
              `${SITE_URL}/${slug}/${topic}/${date}`,
              isToday ? "daily" : "weekly",
              isToday ? 0.7 : 0.5
            )
          );
        }
      }
    }
  }

  const xml = wrapUrlset(entries);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
