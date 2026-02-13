import { NextRequest, NextResponse } from "next/server";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug } from "@/lib/cities";
import { DEFAULT_LOCATION } from "@/lib/constants";
import { getTodayISO } from "@/lib/format";

// Simple in-memory rate limiter: max 30 requests per IP per minute
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Clean stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}, 300_000);

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const citySlug = searchParams.get("city") || DEFAULT_LOCATION.slug;
  const date = searchParams.get("date") || getTodayISO();

  const city = getCityBySlug(citySlug);
  if (!city) {
    return NextResponse.json(
      { error: "City not found" },
      { status: 404 }
    );
  }

  try {
    const data = await fetchPanchang({
      targetDate: date,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch panchang data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
