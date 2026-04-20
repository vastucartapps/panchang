import { NextResponse } from "next/server";
import { format, addDays } from "date-fns";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";

export const dynamic = "force-dynamic";

// Mirror of /sitemap/[id]/route.ts layout. Each entry's lastmodKind reflects
// the most recent lastmod of URLs inside that sub-sitemap, so Google's
// index-level lastmod matches reality instead of the "everything changed
// today" anti-pattern.
const SITEMAPS: Array<{ id: number; lastmodKind: "today" | "yesterday" }> = [
  { id: 0, lastmodKind: "today" },       // Core: homepage, city landings, SEO hubs, festivals
  { id: 1, lastmodKind: "yesterday" },   // [city]/[date] past
  { id: 2, lastmodKind: "today" },       // [city]/[date] today + future
  { id: 3, lastmodKind: "yesterday" },   // rahu-kaal-today/[date] past
  { id: 4, lastmodKind: "today" },       // rahu-kaal-today/[date] today + future
  { id: 5, lastmodKind: "yesterday" },   // choghadiya-today/[date] past
  { id: 6, lastmodKind: "today" },       // choghadiya-today/[date] today + future
  { id: 7, lastmodKind: "yesterday" },   // todays-tithi/[date] past
  { id: 8, lastmodKind: "today" },       // todays-tithi/[date] today + future
  { id: 9, lastmodKind: "yesterday" },   // todays-nakshatra/[date] past
  { id: 10, lastmodKind: "today" },      // todays-nakshatra/[date] today + future
  { id: 11, lastmodKind: "yesterday" },  // moon-phase-today/[date] past
  { id: 12, lastmodKind: "today" },      // moon-phase-today/[date] today + future
  { id: 13, lastmodKind: "yesterday" },  // sunrise-sunset/[date] past
  { id: 14, lastmodKind: "today" },      // sunrise-sunset/[date] today + future
  { id: 15, lastmodKind: "today" },      // calendar months
  { id: 16, lastmodKind: "today" },      // weeks
];

function todayISO(): string {
  return format(new Date(), "yyyy-MM-dd");
}

function yesterdayISO(): string {
  return format(addDays(new Date(), -1), "yyyy-MM-dd");
}

export function GET() {
  const today = todayISO();
  const yesterday = yesterdayISO();

  const entries = SITEMAPS.map(({ id, lastmodKind }) => {
    const lastmod = lastmodKind === "today" ? today : yesterday;
    return `  <sitemap>\n    <loc>${SITE_URL}/sitemap/${id}.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
