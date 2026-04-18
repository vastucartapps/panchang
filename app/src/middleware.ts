import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOCKED_USER_AGENTS = [
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "petalbot",
  "serpstatbot",
  "bytespider",
  "gptbot",
  "ccbot",
  "chatgpt-user",
  "anthropic-ai",
  "claudebot",
  "scrapy",
  "python-requests",
  "go-http-client",
  "java/",
  "wget",
  "curl/",
  "httpclient",
  "apache-httpclient",
  "node-fetch",
  "axios",
  "got/",
  "undici",
  "okhttp",
  "libwww-perl",
  "mechanize",
  "zyte",
  "scrapycloud",
  "dataprovider",
  "zoominfobot",
  "blexbot",
  "dataforseo",
  "barkrowler",
  "seekport",
  "megaindex",
  "turnitin",
  "rogerbot",
  "screaming frog",
];

const ALLOWED_BOT_PATTERNS = [
  "googlebot",
  "google-inspectiontool",
  "google-extended",
  "mediapartners-google",
  "adsbot-google",
  "apis-google",
  "feedfetcher-google",
  "google-site-verification",
  "google-read-aloud",
  "storebot-google",
  "google favicon",
  "bingbot",
  "msnbot",
  "linkedinbot",
  "twitterbot",
  "facebookexternalhit",
  "whatsapp",
  "telegrambot",
  "slackbot",
  "discordbot",
  "pinterestbot",
];

// Old week URL pattern: /city/week/YYYY-Www — migrated to /city/week/YYYY-MM-DD
const OLD_WEEK_PATTERN = /^\/[^/]+\/week\/\d{4}-W\d{2}$/;

// Calendar month route: /{city}/calendar/{YYYY-MM}
const CALENDAR_MONTH_PATTERN = /^\/[^/]+\/calendar\/(\d{4})-(\d{2})$/;

function currentYearMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function applyEdgeCacheForCalendar(response: NextResponse, pathname: string): void {
  const m = pathname.match(CALENDAR_MONTH_PATTERN);
  if (!m) return;
  const yearMonth = `${m[1]}-${m[2]}`;
  const now = currentYearMonth();
  // Past months are immutable Panchang data → 30-day edge cache + long browser cache.
  // Current/future months can update (festival data, etc.) → short browser, 6h edge.
  const header =
    yearMonth < now
      ? "public, max-age=3600, s-maxage=2592000, stale-while-revalidate=86400, immutable"
      : "public, max-age=300, s-maxage=21600, stale-while-revalidate=600";
  response.headers.set("cache-control", header);
}

export function middleware(request: NextRequest) {
  // Return 404 for old ISO week URLs (soft 404 prevention)
  if (OLD_WEEK_PATTERN.test(request.nextUrl.pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const ua = request.headers.get("user-agent")?.toLowerCase() || "";

  // Allow all normal browser requests (no bot filtering)
  if (!ua || ua.includes("mozilla/") || ua.includes("chrome/") || ua.includes("safari/")) {
    // Check if it's actually a spoofed bot
    const isBlockedBot = BLOCKED_USER_AGENTS.some((bot) => ua.includes(bot));
    if (isBlockedBot) {
      // Double-check it's not a Google bot spoofing
      const isAllowedBot = ALLOWED_BOT_PATTERNS.some((bot) => ua.includes(bot));
      if (!isAllowedBot) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }
    const response = NextResponse.next();
    applyEdgeCacheForCalendar(response, request.nextUrl.pathname);
    return response;
  }

  // For non-browser user agents, only allow Google bots
  const isAllowedBot = ALLOWED_BOT_PATTERNS.some((bot) => ua.includes(bot));
  if (isAllowedBot) {
    const response = NextResponse.next();
    applyEdgeCacheForCalendar(response, request.nextUrl.pathname);
    return response;
  }

  // Block everything else
  return new NextResponse("Forbidden", { status: 403 });
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
