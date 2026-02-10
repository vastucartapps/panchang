import { PanchangResponseSchema } from "@/schemas/panchang";
import type { PanchangResponse } from "@/schemas/panchang";

const API_BASE = process.env.API_BASE_URL || "https://api.vastucart.in";
const API_KEY = process.env.ASTROENGINE_API_KEY || "";

interface FetchPanchangParams {
  targetDate: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export async function fetchPanchang(
  params: FetchPanchangParams,
  cacheTtl = 300
): Promise<PanchangResponse> {
  const url = new URL(`${API_BASE}/api/v1/panchang/v2/comprehensive`);
  url.searchParams.set("target_date", params.targetDate);
  url.searchParams.set("latitude", String(params.latitude));
  url.searchParams.set("longitude", String(params.longitude));
  url.searchParams.set("timezone", params.timezone);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["X-API-Key"] = API_KEY;
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: cacheTtl },
  });

  if (!res.ok) {
    throw new Error(
      `Panchang API error: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();
  return PanchangResponseSchema.parse(json);
}

/**
 * Fetch panchang for multiple dates with concurrency throttle.
 * Uses longer cache TTL (1 hour) since calendar data is relatively static.
 * Processes in batches of 5 to avoid hammering the API.
 */
export async function fetchPanchangBatch(
  dates: string[],
  location: { latitude: number; longitude: number; timezone: string }
): Promise<Map<string, PanchangResponse>> {
  const BATCH_SIZE = 5;
  const CACHE_TTL = 3600; // 1 hour for batch/calendar data
  const map = new Map<string, PanchangResponse>();

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
          CACHE_TTL
        )
      )
    );

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        map.set(batch[index], result.value);
      }
    });
  }

  return map;
}
