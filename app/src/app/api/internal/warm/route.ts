import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAllCities, getTopCitySlugs } from "@/lib/cities";

export const dynamic = "force-dynamic";

// Hit localhost to bypass Cloudflare's 100s origin-timeout on cold renders.
// Warmer runs inside the same container as the Next.js server, so localhost:3000
// is a direct in-container call — no CF, no Traefik, no 524 risk.
const INTERNAL_URL = `http://localhost:${process.env.PORT || "3000"}`;
const WARMER_SECRET = process.env.WARMER_SECRET || "";

// User-agent that the app's bot-filter middleware allows through.
const WARMER_UA = "Mozilla/5.0 (compatible; VastuCartWarmer/1.0)";

function validYearMonth(ym: string): boolean {
  return /^\d{4}-\d{2}$/.test(ym);
}

function currentYearMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function shiftMonth(ym: string, delta: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

async function warmCalendar(city: string, month: string): Promise<{ city: string; month: string; status: number; tookMs: number }> {
  const url = `${INTERNAL_URL}/${city}/calendar/${month}`;
  const start = Date.now();
  try {
    const res = await fetch(url, {
      headers: { "user-agent": WARMER_UA },
      cache: "no-store", // warmer itself must not be cached — always hit origin
    });
    // Drain body so server finishes rendering (populates ISR)
    await res.text();
    return { city, month, status: res.status, tookMs: Date.now() - start };
  } catch {
    return { city, month, status: 0, tookMs: Date.now() - start };
  }
}

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const secret = sp.get("secret") || "";

  if (!WARMER_SECRET || secret !== WARMER_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const mode = sp.get("mode") || "single";
  const overallStart = Date.now();

  // Mode 1: Warm a single (city, month). Used for manual testing or targeted warming.
  if (mode === "single") {
    const city = sp.get("city");
    const month = sp.get("month");
    if (!city || !month || !validYearMonth(month)) {
      return NextResponse.json({ error: "city and month (YYYY-MM) required" }, { status: 400 });
    }
    const result = await warmCalendar(city, month);
    return NextResponse.json({ mode, result, tookMs: Date.now() - overallStart });
  }

  // Mode 2: Warm top-20 cities × [prev, current, next] months. Runs overnight via cron.
  if (mode === "top20") {
    const months = [shiftMonth(currentYearMonth(), -1), currentYearMonth(), shiftMonth(currentYearMonth(), 1)];
    const cities = getTopCitySlugs();
    const results: Awaited<ReturnType<typeof warmCalendar>>[] = [];
    for (const city of cities) {
      for (const month of months) {
        // Serial — parallelism would saturate upstream API (known 2-concurrent limit)
        const r = await warmCalendar(city, month);
        results.push(r);
      }
    }
    return NextResponse.json({
      mode,
      total: results.length,
      ok: results.filter((r) => r.status === 200).length,
      failed: results.filter((r) => r.status !== 200).length,
      tookMs: Date.now() - overallStart,
      results,
    });
  }

  // Mode 3: Warm ALL cities × current month. Second-tier warm after top20.
  if (mode === "all-current") {
    const cities = getAllCities().map((c) => c.slug);
    const month = currentYearMonth();
    const results: Awaited<ReturnType<typeof warmCalendar>>[] = [];
    for (const city of cities) {
      const r = await warmCalendar(city, month);
      results.push(r);
    }
    return NextResponse.json({
      mode,
      total: results.length,
      ok: results.filter((r) => r.status === 200).length,
      failed: results.filter((r) => r.status !== 200).length,
      tookMs: Date.now() - overallStart,
      results,
    });
  }

  return NextResponse.json({ error: "unknown mode; use single | top20 | all-current" }, { status: 400 });
}
