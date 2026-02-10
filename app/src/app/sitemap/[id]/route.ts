import { NextResponse } from "next/server";
import { getCitySlugs } from "@/lib/cities";
import { getAllFestivals } from "@/data/festivals";
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
const MAX_SITEMAP_ID = 8;

export const dynamic = "force-dynamic";

function getDateRange(): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = -PAST_DAYS; i <= FUTURE_DAYS; i++) {
    dates.push(format(addDays(today, i), "yyyy-MM-dd"));
  }
  return dates;
}

function getMonthRange(): string[] {
  const now = new Date();
  const months: string[] = [];
  // Current month + 5 forward + 1 back
  for (let i = -1; i <= 5; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(format(d, "yyyy-MM"));
  }
  return months;
}

function getWeekRange(): string[] {
  const now = new Date();
  const weeks: string[] = [];
  // Current week + 7 forward + 1 back
  for (let i = -1; i <= 7; i++) {
    const d = addDays(now, i * 7);
    const jan4 = new Date(d.getFullYear(), 0, 4);
    const dayOfYear =
      Math.floor(
        (d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86400000
      ) + 1;
    const dayOfWeek = jan4.getDay() || 7;
    const weekNum = Math.min(
      Math.ceil((dayOfYear + dayOfWeek - 1) / 7),
      52
    );
    weeks.push(
      `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`
    );
  }
  // Deduplicate
  return [...new Set(weeks)];
}

function urlEntry(
  url: string,
  changefreq: string,
  priority: number
): string {
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
  const sitemapId = Number(rawId.replace(".xml", ""));

  if (isNaN(sitemapId) || sitemapId < 0 || sitemapId > MAX_SITEMAP_ID) {
    return new NextResponse("Not found", { status: 404 });
  }

  const slugs = getCitySlugs();
  const dates = getDateRange();
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const entries: string[] = [];

  // ─── Sitemap 0: Main pages + festivals + hub pages ─────
  if (sitemapId === 0) {
    entries.push(urlEntry(SITE_URL, "daily", 1));

    // City home pages
    for (const slug of slugs) {
      entries.push(urlEntry(`${SITE_URL}/${slug}`, "daily", 0.9));
    }

    // SEO topic hubs
    for (const topic of [...SEO_TOPICS, "what-is-panchang"]) {
      entries.push(urlEntry(`${SITE_URL}/${topic}`, "daily", 0.8));
    }

    // New hub pages
    entries.push(
      urlEntry(`${SITE_URL}/sunrise-sunset-today`, "daily", 0.8)
    );
    entries.push(
      urlEntry(`${SITE_URL}/hindu-festivals`, "weekly", 0.8)
    );

    // Festival individual pages
    const festivals = getAllFestivals();
    for (const f of festivals) {
      entries.push(
        urlEntry(`${SITE_URL}/hindu-festivals/${f.slug}`, "monthly", 0.6)
      );
    }

    // Legal pages
    for (const page of [
      "privacy-policy",
      "terms-of-service",
      "disclaimer",
    ]) {
      entries.push(urlEntry(`${SITE_URL}/${page}`, "yearly", 0.3));
    }
  }

  // ─── Sitemap 1: City/date panchang pages (/city/date) ─────
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

  // ─── Sitemaps 2-6: City topic pages (/city/topic/date) ─────
  else if (sitemapId >= 2 && sitemapId <= 6) {
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

  // ─── Sitemap 7: City sunrise-sunset pages ─────
  else if (sitemapId === 7) {
    for (const slug of slugs) {
      for (const date of dates) {
        const isToday = date === todayStr;
        entries.push(
          urlEntry(
            `${SITE_URL}/${slug}/sunrise-sunset/${date}`,
            isToday ? "daily" : "weekly",
            isToday ? 0.7 : 0.5
          )
        );
      }
    }
  }

  // ─── Sitemap 8: Calendar + weekly pages ─────
  else if (sitemapId === 8) {
    const months = getMonthRange();
    const weeks = getWeekRange();

    // Calendar pages: /city/calendar/YYYY-MM
    for (const slug of slugs) {
      for (const month of months) {
        entries.push(
          urlEntry(
            `${SITE_URL}/${slug}/calendar/${month}`,
            "weekly",
            0.6
          )
        );
      }
    }

    // Weekly pages: /city/week/YYYY-WNN
    for (const slug of slugs) {
      for (const week of weeks) {
        entries.push(
          urlEntry(
            `${SITE_URL}/${slug}/week/${week}`,
            "weekly",
            0.6
          )
        );
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
