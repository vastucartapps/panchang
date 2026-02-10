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
];

export function middleware(request: NextRequest) {
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
    return NextResponse.next();
  }

  // For non-browser user agents, only allow Google bots
  const isAllowedBot = ALLOWED_BOT_PATTERNS.some((bot) => ua.includes(bot));
  if (isAllowedBot) {
    return NextResponse.next();
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
