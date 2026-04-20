import { NextResponse } from "next/server";
import { getUpcomingFestivals } from "@/data/festivals";
import { format } from "date-fns";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";

export const dynamic = "force-dynamic";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed of the next 10 upcoming Hindu festivals. Useful for:
 *   - Feed readers / news aggregators tracking the Hindu calendar
 *   - IFTTT / Zapier integrations
 *   - Signal to search engines that content refreshes (crawl-stimulus)
 *
 * Reference Files/05 §D.3. Cache 30 min browser / 1 hr edge.
 */
export function GET() {
  const today = format(new Date(), "yyyy-MM-dd");
  const festivals = getUpcomingFestivals(today, 10);
  const now = new Date().toUTCString();

  const items = festivals
    .map((f) => {
      const url = `${SITE_URL}/hindu-festivals/${f.slug}`;
      // Render festival pubDate at midnight IST; RSS consumers expect RFC-822.
      const pubDate = new Date(`${f.date}T00:00:00+05:30`).toUTCString();
      return `  <item>
    <title>${escapeXml(`${f.name} ${f.year}`)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escapeXml(f.description)}</description>
    <category>${escapeXml(f.category)}</category>
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Upcoming Hindu Festivals — VastuCart Panchang</title>
    <link>${SITE_URL}/hindu-festivals</link>
    <atom:link href="${SITE_URL}/feed/festivals.xml" rel="self" type="application/rss+xml" />
    <description>Upcoming Hindu festival dates with Panchang, tithi, deity, and observance details from VastuCart Panchang.</description>
    <language>en-IN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=3600",
    },
  });
}
