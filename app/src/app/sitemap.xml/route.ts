import { NextResponse } from "next/server";

const SITE_URL = "https://panchang.vastucart.in";
const SITEMAP_COUNT = 9;

export const dynamic = "force-dynamic";

export function GET() {
  const sitemaps = Array.from({ length: SITEMAP_COUNT }, (_, i) =>
    `  <sitemap>\n    <loc>${SITE_URL}/sitemap/${i}.xml</loc>\n  </sitemap>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
