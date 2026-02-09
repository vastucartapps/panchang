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
  params: FetchPanchangParams
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
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(
      `Panchang API error: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();
  return PanchangResponseSchema.parse(json);
}
