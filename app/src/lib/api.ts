import { cache } from "react";
import { PanchangResponseSchema } from "@/schemas/panchang";
import type { PanchangResponse } from "@/schemas/panchang";

const API_BASE = process.env.API_BASE_URL || "https://api.vastucart.in";
const API_KEY = process.env.ASTROENGINE_API_KEY || "";

// Only apply AbortController during `next build` to prevent build hangs.
// At runtime, no signal → fetch is fully cacheable by Next.js data cache
// and route stays classified as static-with-ISR (edge-cacheable).
const IS_BUILDING = process.env.NEXT_PHASE === "phase-production-build";
// Tuned so max per-URL time (timeout × attempts + backoff) stays under
// Next's staticPageGenerationTimeout (set to 180s in next.config.ts).
const BUILD_TIMEOUT_MS = 30000;
const BUILD_MAX_ATTEMPTS = 3;
const BUILD_MAX_CONCURRENT = 2; // matches upstream api.vastucart.in 2-concurrent limit

// Build-time semaphore: Coolify runs 11 parallel Next.js build workers which
// easily overwhelm the upstream API. Limit to BUILD_MAX_CONCURRENT in-flight
// fetches so upstream can keep up. At runtime this is a no-op (IS_BUILDING false).
let buildInflight = 0;
const buildQueue: Array<() => void> = [];

function acquireBuildSlot(): Promise<void> {
  if (!IS_BUILDING) return Promise.resolve();
  if (buildInflight < BUILD_MAX_CONCURRENT) {
    buildInflight++;
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    buildQueue.push(() => {
      buildInflight++;
      resolve();
    });
  });
}

function releaseBuildSlot(): void {
  if (!IS_BUILDING) return;
  buildInflight--;
  const next = buildQueue.shift();
  if (next) next();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TTLs
const ONE_HOUR = 3600;
const ONE_YEAR = 31536000; // past Panchang data is immutable

interface FetchPanchangParams {
  targetDate: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

function getCacheTtlForDate(dateStr: string, today?: string): number {
  const t = today ?? new Date().toISOString().slice(0, 10);
  return dateStr < t ? ONE_YEAR : ONE_HOUR;
}

async function doFetch(
  url: URL,
  headers: Record<string, string>,
  cacheTtl: number
): Promise<PanchangResponse> {
  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
    headers,
    next: { revalidate: cacheTtl },
  };

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  if (IS_BUILDING) {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), BUILD_TIMEOUT_MS);
    fetchOptions.signal = controller.signal;
  }

  let res;
  try {
    res = await fetch(url.toString(), fetchOptions);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }

  if (!res.ok) {
    throw new Error(`Panchang API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return PanchangResponseSchema.parse(json);
}

const fetchPanchangInner = cache(async (
  targetDate: string,
  latitude: number,
  longitude: number,
  timezone: string,
  cacheTtl: number
): Promise<PanchangResponse> => {
  const url = new URL(`${API_BASE}/api/v1/panchang/v2/comprehensive`);
  url.searchParams.set("target_date", targetDate);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("timezone", timezone);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_KEY) headers["X-API-Key"] = API_KEY;

  // Runtime: single fetch, no retry, no concurrency limit — Next.js data
  // cache + ISR stale-if-error handle resilience.
  if (!IS_BUILDING) {
    return doFetch(url, headers, cacheTtl);
  }

  // Build phase: throttle to upstream's concurrency cap, retry transient
  // failures. Prevents the Coolify build (11 workers) from saturating
  // upstream's 2-concurrent limit and aborting every fetch.
  await acquireBuildSlot();
  try {
    let lastErr: unknown;
    for (let attempt = 1; attempt <= BUILD_MAX_ATTEMPTS; attempt++) {
      try {
        return await doFetch(url, headers, cacheTtl);
      } catch (err) {
        lastErr = err;
        if (attempt < BUILD_MAX_ATTEMPTS) {
          const backoff = 1000 * Math.pow(2, attempt - 1); // 1s, 2s, 4s
          await sleep(backoff);
        }
      }
    }
    throw lastErr;
  } finally {
    releaseBuildSlot();
  }
});

export function fetchPanchang(
  params: FetchPanchangParams,
  cacheTtl?: number
): Promise<PanchangResponse> {
  const ttl = cacheTtl ?? getCacheTtlForDate(params.targetDate);
  return fetchPanchangInner(
    params.targetDate,
    params.latitude,
    params.longitude,
    params.timezone,
    ttl
  );
}

/**
 * Build-safe wrapper. At `next build` phase, transient upstream failures
 * return null so the caller can `notFound()` and let ISR regenerate the
 * page on first runtime request. At runtime, errors propagate normally to
 * Next.js's error boundary for a proper 500 + ISR stale-if-error behavior.
 *
 * This is the correct primitive for pages that prebuild via
 * `generateStaticParams` or are fully static at the route level — without it,
 * any upstream hiccup during build fails the entire deployment.
 */
export async function fetchPanchangBuildSafe(
  params: FetchPanchangParams,
  cacheTtl?: number
): Promise<PanchangResponse | null> {
  try {
    return await fetchPanchang(params, cacheTtl);
  } catch (err) {
    if (IS_BUILDING) {
      console.warn(
        `[fetchPanchangBuildSafe] build-time fetch failed for ${params.targetDate} @ ${params.latitude},${params.longitude} — URL will regenerate at runtime:`,
        err instanceof Error ? err.message : String(err)
      );
      return null;
    }
    throw err;
  }
}

export type DayEntry =
  | { ok: true; data: PanchangResponse }
  | { ok: false };

/**
 * Batch fetch with guaranteed entries for every requested date.
 * Failed fetches produce { ok: false } entries (never missing or undefined),
 * so the rendering layer can cleanly distinguish "unavailable" from "loading"
 * and Next.js sees the page as fully rendered regardless of upstream failures.
 */
export async function fetchPanchangBatch(
  dates: string[],
  location: { latitude: number; longitude: number; timezone: string }
): Promise<Map<string, DayEntry>> {
  const BATCH_SIZE = 10;
  const map = new Map<string, DayEntry>();

  // Compute "today" once per batch — avoids 30 separate clock reads.
  const today = new Date().toISOString().slice(0, 10);

  // Seed every date with { ok: false } so failures become explicit entries.
  for (const date of dates) map.set(date, { ok: false });

  for (let i = 0; i < dates.length; i += BATCH_SIZE) {
    const batch = dates.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map((date) =>
        fetchPanchang(
          {
            targetDate: date,
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.timezone,
          },
          getCacheTtlForDate(date, today)
        )
      )
    );

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        map.set(batch[index], { ok: true, data: result.value });
      }
      // status === "rejected" leaves the pre-seeded { ok: false } in place
    });
  }

  return map;
}
