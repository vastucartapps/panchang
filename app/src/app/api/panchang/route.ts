import { NextRequest, NextResponse } from "next/server";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug } from "@/lib/cities";
import { DEFAULT_LOCATION } from "@/lib/constants";
import { getTodayISO } from "@/lib/format";

export async function GET(request: NextRequest) {
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
