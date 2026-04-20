import { NextResponse } from "next/server";
import { getCitySlugs } from "@/lib/cities";
import { getAllFestivals } from "@/data/festivals";
import { format, addDays } from "date-fns";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";

// Indexed window. Past panchang is evergreen (historical queries); future is
// high-value long-tail (wedding/muhurta planning). Keep within 50K-URL limit
// per sub-sitemap: 200 cities × 181 future days = 36,200 URLs (largest shard).
const PAST_DAYS = 90;
const FUTURE_DAYS = 180;

// Topics with [city]/{topic}/[date] routes. Order is load-bearing:
// sub-sitemap IDs 3+ are computed from this array.
const DATE_TOPICS = [
  "rahu-kaal-today",
  "choghadiya-today",
  "todays-tithi",
  "todays-nakshatra",
  "moon-phase-today",
  "sunrise-sunset",
] as const;

const MAX_SITEMAP_ID = 17; // 0 core + 2 city/date + 12 topics × period + calendar + weeks + programmatic hubs

// Programmatic city hubs (topic-first URLs) per Reference Files/05 §C.4.
// Each entry = 1 route family × N cities.
const PROGRAMMATIC_HUB_TOPICS = [
  "rahu-kaal",
  "choghadiya",
  "todays-tithi",
  "todays-nakshatra",
] as const;

// Fixed lastmod for content that only changes on explicit rewrites.
const LEGAL_LASTMOD = "2026-04-01";
const STATIC_HUB_LASTMOD = "2026-04-18";

export const dynamic = "force-dynamic";

function todayISO(): string {
  return format(new Date(), "yyyy-MM-dd");
}

function getPastDates(): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = -PAST_DAYS; i < 0; i++) {
    dates.push(format(addDays(today, i), "yyyy-MM-dd"));
  }
  return dates;
}

function getFutureDates(): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = 0; i <= FUTURE_DAYS; i++) {
    dates.push(format(addDays(today, i), "yyyy-MM-dd"));
  }
  return dates;
}

function getMonthRange(): string[] {
  // 12 months past + 12 months future = 24 months per city × 200 cities = 4,800 URLs
  const now = new Date();
  const months: string[] = [];
  for (let i = -12; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(format(d, "yyyy-MM"));
  }
  return months;
}

function getWeekRange(): string[] {
  // 4 past weeks + next 8 = 13 weeks per city × 200 cities = 2,600 URLs
  const now = new Date();
  const day = now.getDay() || 7;
  const thisMonday = new Date(now);
  thisMonday.setDate(now.getDate() - day + 1);

  const weeks: string[] = [];
  for (let i = -4; i <= 8; i++) {
    const monday = addDays(thisMonday, i * 7);
    weeks.push(format(monday, "yyyy-MM-dd"));
  }
  return weeks;
}

/**
 * Per-URL lastmod. Past content is immutable → lastmod = the date itself
 * (so Google knows to stop re-crawling for freshness). Today/future content
 * gets today's date because the computed panchang shifts as the day approaches.
 */
function lastmodForDate(date: string, todayStr: string): string {
  return date < todayStr ? date : todayStr;
}

function urlEntry(url: string, lastmod: string, changefreq: string, priority: number): string {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function wrapUrlset(entries: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;
}

function buildCoreEntries(slugs: string[], today: string): string[] {
  const entries: string[] = [];

  entries.push(urlEntry(SITE_URL, today, "daily", 1));

  for (const slug of slugs) {
    entries.push(urlEntry(`${SITE_URL}/${slug}`, today, "daily", 0.9));
  }

  for (const topic of DATE_TOPICS) {
    const hubPath = topic === "sunrise-sunset" ? "sunrise-sunset-today" : topic;
    entries.push(urlEntry(`${SITE_URL}/${hubPath}`, today, "daily", 0.8));
  }

  entries.push(urlEntry(`${SITE_URL}/what-is-panchang`, STATIC_HUB_LASTMOD, "yearly", 0.8));
  // Sub-pillar evergreens (Bundle A-ext) — educational concept pages that
  // hasPart-link from the main Panchang pillar for topical cluster.
  entries.push(urlEntry(`${SITE_URL}/what-is-tithi`, STATIC_HUB_LASTMOD, "yearly", 0.7));
  entries.push(urlEntry(`${SITE_URL}/what-is-nakshatra`, STATIC_HUB_LASTMOD, "yearly", 0.7));
  entries.push(urlEntry(`${SITE_URL}/what-is-rahu-kaal`, STATIC_HUB_LASTMOD, "yearly", 0.7));
  entries.push(urlEntry(`${SITE_URL}/about`, STATIC_HUB_LASTMOD, "yearly", 0.6));
  entries.push(urlEntry(`${SITE_URL}/contact`, STATIC_HUB_LASTMOD, "yearly", 0.4));
  // RSS feed — sitemap entry signals "this exists" to crawlers; feed's own
  // <item> entries drive freshness signals separately.
  entries.push(urlEntry(`${SITE_URL}/feed/festivals.xml`, today, "weekly", 0.4));
  entries.push(urlEntry(`${SITE_URL}/hindu-festivals`, today, "weekly", 0.8));

  for (const f of getAllFestivals()) {
    entries.push(urlEntry(`${SITE_URL}/hindu-festivals/${f.slug}`, `${f.year}-01-01`, "monthly", 0.6));
  }

  for (const page of ["privacy-policy", "terms-of-service", "disclaimer"]) {
    entries.push(urlEntry(`${SITE_URL}/${page}`, LEGAL_LASTMOD, "yearly", 0.3));
  }

  return entries;
}

function buildDateEntries(
  slugs: string[],
  dates: string[],
  todayStr: string,
  topic: string | null
): string[] {
  const entries: string[] = [];
  const topicSegment = topic ? `/${topic}` : "";
  const basePriority = topic ? 0.5 : 0.6;
  const pastPriority = topic ? 0.4 : 0.5;

  for (const slug of slugs) {
    for (const date of dates) {
      const isToday = date === todayStr;
      const isPast = date < todayStr;
      const lastmod = lastmodForDate(date, todayStr);
      const priority = isToday ? (topic ? 0.7 : 0.8) : isPast ? pastPriority : basePriority;
      entries.push(
        urlEntry(
          `${SITE_URL}/${slug}${topicSegment}/${date}`,
          lastmod,
          isToday ? "daily" : isPast ? "yearly" : "weekly",
          priority
        )
      );
    }
  }
  return entries;
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
  const today = todayISO();
  const pastDates = getPastDates();
  const futureDates = getFutureDates();

  let entries: string[] = [];

  if (sitemapId === 0) {
    entries = buildCoreEntries(slugs, today);
  } else if (sitemapId === 1) {
    entries = buildDateEntries(slugs, pastDates, today, null);
  } else if (sitemapId === 2) {
    entries = buildDateEntries(slugs, futureDates, today, null);
  } else if (sitemapId >= 3 && sitemapId <= 14) {
    const topicIndex = Math.floor((sitemapId - 3) / 2);
    const isPast = (sitemapId - 3) % 2 === 0;
    const topic = DATE_TOPICS[topicIndex];
    if (!topic) return new NextResponse("Not found", { status: 404 });
    entries = buildDateEntries(slugs, isPast ? pastDates : futureDates, today, topic);
  } else if (sitemapId === 15) {
    const months = getMonthRange();
    const thisMonth = today.slice(0, 7);
    for (const slug of slugs) {
      for (const month of months) {
        const lastmod = month < thisMonth ? `${month}-01` : today;
        entries.push(urlEntry(`${SITE_URL}/${slug}/calendar/${month}`, lastmod, "weekly", 0.6));
      }
    }
  } else if (sitemapId === 16) {
    const weeks = getWeekRange();
    for (const slug of slugs) {
      for (const week of weeks) {
        const lastmod = lastmodForDate(week, today);
        entries.push(urlEntry(`${SITE_URL}/${slug}/week/${week}`, lastmod, "weekly", 0.6));
      }
    }
  } else if (sitemapId === 17) {
    // Programmatic topic-first hubs: /{topic}/{city}. 4 × ~200 cities = ~800
    // URLs. Content refreshes with today's panchang per city.
    for (const topic of PROGRAMMATIC_HUB_TOPICS) {
      for (const slug of slugs) {
        entries.push(urlEntry(`${SITE_URL}/${topic}/${slug}`, today, "daily", 0.7));
      }
    }
  }

  if (entries.length > 50000) {
    console.error(`[SITEMAP] Sitemap ${sitemapId} has ${entries.length} URLs — EXCEEDS 50K. Must split further.`);
  } else if (entries.length > 45000) {
    console.warn(`[SITEMAP] Sitemap ${sitemapId} has ${entries.length} URLs — approaching 50K limit.`);
  }

  return new NextResponse(wrapUrlset(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
