import { NextResponse } from "next/server";
import { getCitySlugs } from "@/lib/cities";
import { getAllFestivals } from "@/data/festivals";
import { format, addDays } from "date-fns";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";

const SEO_TOPICS = [
  "rahu-kaal-today",
  "choghadiya-today",
  "todays-tithi",
  "todays-nakshatra",
  "moon-phase-today",
];

const PAST_DAYS = 7;
const FUTURE_DAYS = 7;
const MAX_SITEMAP_ID = 7;

// Fixed lastmod for immutable static content — updated only when that
// content actually changes. Avoids the "everything changed today"
// anti-pattern that Google ignores.
const LEGAL_LASTMOD = "2026-04-01"; // bump when privacy/terms/disclaimer change
const STATIC_HUB_LASTMOD = "2026-04-18"; // bump on meaningful hub-page rewrites

export const dynamic = "force-dynamic";

function todayISO(): string {
  return format(new Date(), "yyyy-MM-dd");
}

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
  for (let i = -1; i <= 5; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(format(d, "yyyy-MM"));
  }
  return months;
}

function getWeekRange(): string[] {
  const now = new Date();
  const day = now.getDay() || 7;
  const thisMonday = new Date(now);
  thisMonday.setDate(now.getDate() - day + 1);

  const weeks: string[] = [];
  for (let i = -1; i <= 7; i++) {
    const monday = addDays(thisMonday, i * 7);
    weeks.push(format(monday, "yyyy-MM-dd"));
  }
  return weeks;
}

/**
 * Build a sitemap <url> entry with a CONTEXTUAL lastmod.
 * Google treats lastmod as a hint for prioritization; setting it to "today"
 * on every URL is a known no-op. Better: reflect when the underlying content
 * last meaningfully changed.
 */
function urlEntry(
  url: string,
  lastmod: string,
  changefreq: string,
  priority: number
): string {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function wrapUrlset(entries: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;
}

/**
 * Pick a lastmod for a (city, date) pair.
 * - date ≤ today: the page represents immutable Panchang for that past date
 *   → lastmod = the date itself
 * - date > today: content becomes meaningful as the day approaches
 *   → lastmod = today
 */
function lastmodForDate(date: string, todayStr: string): string {
  return date <= todayStr ? date : todayStr;
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
  const todayStr = todayISO();
  const entries: string[] = [];

  // ─── Sitemap 0: Main pages + festivals + hub pages ─────
  if (sitemapId === 0) {
    // Root + city landings: always today (updated daily with live panchang)
    entries.push(urlEntry(SITE_URL, todayStr, "daily", 1));
    for (const slug of slugs) {
      entries.push(urlEntry(`${SITE_URL}/${slug}`, todayStr, "daily", 0.9));
    }

    // SEO topic hubs with daily-refreshing content
    for (const topic of [...SEO_TOPICS]) {
      entries.push(urlEntry(`${SITE_URL}/${topic}`, todayStr, "daily", 0.8));
    }
    entries.push(urlEntry(`${SITE_URL}/sunrise-sunset-today`, todayStr, "daily", 0.8));

    // Static educational hub — lastmod bumped manually when rewritten
    entries.push(urlEntry(`${SITE_URL}/what-is-panchang`, STATIC_HUB_LASTMOD, "yearly", 0.8));

    // Festival hub index
    entries.push(urlEntry(`${SITE_URL}/hindu-festivals`, todayStr, "weekly", 0.8));

    // Individual festival pages: lastmod = Jan 1 of festival year (fixed
    // for the year the festival belongs to, stable signal for Google)
    for (const f of getAllFestivals()) {
      const festLastmod = `${f.year}-01-01`;
      entries.push(urlEntry(`${SITE_URL}/hindu-festivals/${f.slug}`, festLastmod, "monthly", 0.6));
    }

    // Legal pages: fixed lastmod, bump when policies actually change
    for (const page of ["privacy-policy", "terms-of-service", "disclaimer"]) {
      entries.push(urlEntry(`${SITE_URL}/${page}`, LEGAL_LASTMOD, "yearly", 0.3));
    }
  }

  // ─── Sitemap 1: City/date panchang pages ─────
  else if (sitemapId === 1) {
    for (const slug of slugs) {
      for (const date of dates) {
        const isToday = date === todayStr;
        entries.push(
          urlEntry(
            `${SITE_URL}/${slug}/${date}`,
            lastmodForDate(date, todayStr),
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
              lastmodForDate(date, todayStr),
              isToday ? "daily" : "weekly",
              isToday ? 0.7 : 0.5
            )
          );
        }
      }
    }
  }

  // ─── Sitemap 7: Calendar + weekly pages ─────
  else if (sitemapId === 7) {
    const months = getMonthRange();
    const weeks = getWeekRange();
    const thisMonthStr = todayStr.slice(0, 7);

    for (const slug of slugs) {
      for (const month of months) {
        // Past months are immutable → lastmod = month's first day
        // Current/future months get today's date (data refreshes)
        const lastmod = month < thisMonthStr ? `${month}-01` : todayStr;
        entries.push(urlEntry(`${SITE_URL}/${slug}/calendar/${month}`, lastmod, "weekly", 0.6));
      }
    }

    for (const slug of slugs) {
      for (const week of weeks) {
        // Weeks use their Monday date — past Mondays are immutable content
        const lastmod = lastmodForDate(week, todayStr);
        entries.push(urlEntry(`${SITE_URL}/${slug}/week/${week}`, lastmod, "weekly", 0.6));
      }
    }
  }

  if (entries.length > 45000) {
    console.warn(`[SITEMAP] Sitemap ${sitemapId} has ${entries.length} URLs — approaching 50K limit. Consider splitting.`);
  }

  const xml = wrapUrlset(entries);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
