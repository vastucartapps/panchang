import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAllCities, getTopCitySlugs } from "@/lib/cities";
import {
  getWarmerState,
  startWarmerRun,
  recordUrlComplete,
  finishWarmerRun,
} from "@/lib/warmer-state";

export const dynamic = "force-dynamic";

// Hit localhost to bypass Cloudflare's 100s origin-timeout on cold renders.
const INTERNAL_URL = `http://localhost:${process.env.PORT || "3000"}`;
const WARMER_SECRET = process.env.WARMER_SECRET || "";
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

async function warmOne(path: string): Promise<{ status: number; tookMs: number }> {
  const start = Date.now();
  try {
    const res = await fetch(`${INTERNAL_URL}${path}`, {
      headers: { "user-agent": WARMER_UA },
      cache: "no-store",
    });
    await res.text(); // drain to ensure render finishes and ISR is written
    return { status: res.status, tookMs: Date.now() - start };
  } catch {
    return { status: 0, tookMs: Date.now() - start };
  }
}

function buildUrlList(mode: string, singleCity?: string, singleMonth?: string): string[] {
  if (mode === "single") {
    if (!singleCity || !singleMonth) return [];
    return [`/${singleCity}/calendar/${singleMonth}`];
  }
  if (mode === "top20") {
    const months = [
      shiftMonth(currentYearMonth(), -1),
      currentYearMonth(),
      shiftMonth(currentYearMonth(), 1),
    ];
    const urls: string[] = [];
    for (const city of getTopCitySlugs()) {
      for (const month of months) urls.push(`/${city}/calendar/${month}`);
    }
    return urls;
  }
  if (mode === "all-current") {
    const month = currentYearMonth();
    return getAllCities().map((c) => `/${c.slug}/calendar/${month}`);
  }
  return [];
}

/**
 * Fire-and-forget warming loop. Runs in the background after the HTTP
 * response has already been sent. Node keeps the process alive between
 * requests so this continues executing; no event loop magic needed.
 */
async function runWarmer(mode: string, urls: string[]): Promise<void> {
  const runLabel = `[WARMER ${mode} ${new Date().toISOString()}]`;
  console.log(`${runLabel} started, ${urls.length} URLs`);
  let failed = 0;
  try {
    for (const path of urls) {
      const { status, tookMs } = await warmOne(path);
      recordUrlComplete(path);
      if (status !== 200) {
        failed += 1;
        console.warn(`${runLabel} ${path} → ${status} (${tookMs}ms)`);
      } else {
        console.log(`${runLabel} ${path} → 200 (${tookMs}ms)`);
      }
    }
    console.log(`${runLabel} done, ${urls.length - failed}/${urls.length} ok, ${failed} failed`);
    finishWarmerRun();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`${runLabel} fatal error:`, msg);
    finishWarmerRun(msg);
  }
}

export function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const secret = sp.get("secret") || "";
  if (!WARMER_SECRET || secret !== WARMER_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const mode = sp.get("mode") || "";
  if (!["single", "top20", "all-current"].includes(mode)) {
    return NextResponse.json(
      { error: "unknown mode; use single | top20 | all-current" },
      { status: 400 }
    );
  }

  // Validate single-mode params before checking concurrency so a bad request
  // doesn't get masked by a 409.
  let singleCity: string | undefined;
  let singleMonth: string | undefined;
  if (mode === "single") {
    singleCity = sp.get("city") ?? undefined;
    singleMonth = sp.get("month") ?? undefined;
    if (!singleCity || !singleMonth || !validYearMonth(singleMonth)) {
      return NextResponse.json(
        { error: "city and month (YYYY-MM) required for mode=single" },
        { status: 400 }
      );
    }
  }

  // Concurrency guard — one warm at a time per container.
  const state = getWarmerState();
  if (state.running) {
    return NextResponse.json(
      {
        running: true,
        mode: state.mode,
        startedAt: state.startedAt,
        completed: state.completed,
        total: state.total,
      },
      { status: 409 }
    );
  }

  const urls = buildUrlList(mode, singleCity, singleMonth);
  startWarmerRun(mode, urls.length);

  // Fire-and-forget. Node keeps the process alive; the async IIFE below
  // continues running after the 202 response is sent.
  void runWarmer(mode, urls);

  return NextResponse.json(
    {
      started: true,
      mode,
      estimatedUrls: urls.length,
    },
    { status: 202 }
  );
}
