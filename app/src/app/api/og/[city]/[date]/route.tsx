import { ImageResponse } from "next/og";
import { getCityBySlug } from "@/lib/cities";
import { fetchPanchang } from "@/lib/api";
import { formatDate } from "@/lib/format";

export const runtime = "nodejs";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ city: string; date: string }> }
) {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);

  if (!city || !DATE_REGEX.test(date)) {
    return new Response("Not found", { status: 404 });
  }

  let data;
  try {
    data = await fetchPanchang({
      targetDate: date,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
  } catch {
    return new Response("API error", { status: 500 });
  }

  const score = Math.round(data.day_quality.score);
  const tithi = data.panchang.tithi.tithi.replace(/_/g, " ");
  const nakshatra = data.panchang.nakshatra.nakshatra.replace(/_/g, " ");
  const formattedDate = formatDate(date);

  const scoreColor =
    score >= 70 ? "#22c55e" : score >= 40 ? "#C4973B" : "#ef4444";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const }}>
              VastuCart Panchang
            </span>
          </div>
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)" }}>
            {formattedDate}
          </span>
        </div>

        {/* City name */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
          <span style={{ fontSize: "56px", fontWeight: 700, color: "white", lineHeight: 1.1 }}>
            Panchang — {city.name}
          </span>
          <div style={{ width: "80px", height: "2px", background: "linear-gradient(90deg, #C4973B, transparent)", marginTop: "16px" }} />
          <span style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)", marginTop: "8px" }}>
            {city.state}
          </span>
        </div>

        {/* Data cards row */}
        <div style={{ display: "flex", gap: "24px", marginTop: "auto" }}>
          {/* Day Score */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "24px 36px",
              border: "1px solid rgba(255,255,255,0.08)",
              minWidth: "160px",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const }}>
              Day Score
            </span>
            <span style={{ fontSize: "52px", fontWeight: 700, color: scoreColor, marginTop: "4px" }}>
              {score}
            </span>
          </div>

          {/* Tithi */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "24px 36px",
              border: "1px solid rgba(255,255,255,0.08)",
              flex: 1,
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const }}>
              Tithi
            </span>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "white", marginTop: "4px" }}>
              {tithi}
            </span>
            <span style={{ fontSize: "16px", color: "#C4973B", marginTop: "4px" }}>
              {data.panchang.tithi.paksha}
            </span>
          </div>

          {/* Nakshatra */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "24px 36px",
              border: "1px solid rgba(255,255,255,0.08)",
              flex: 1,
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const }}>
              Nakshatra
            </span>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "white", marginTop: "4px" }}>
              {nakshatra}
            </span>
            <span style={{ fontSize: "16px", color: "#C4973B", marginTop: "4px" }}>
              {data.panchang.nakshatra.lord}
            </span>
          </div>

          {/* Sun */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "24px 36px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const }}>
              Sunrise
            </span>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "white", marginTop: "4px" }}>
              {data.timing.sunrise}
            </span>
            <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
              Sunset {data.timing.sunset}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
