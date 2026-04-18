import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";
const SITEMAP_COUNT = 8;

export const dynamic = "force-dynamic";

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function GET() {
  // Every child sitemap contains at least some URLs whose lastmod is "today"
  // (the daily-refreshing hub and city-landing pages), so the sitemap index
  // entries advertise today's date as their lastmod.
  const lastmod = todayISO();
  const sitemaps = Array.from({ length: SITEMAP_COUNT }, (_, i) =>
    `  <sitemap>\n    <loc>${SITE_URL}/sitemap/${i}.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`
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
