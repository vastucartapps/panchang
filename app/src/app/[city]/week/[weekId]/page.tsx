import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { fetchPanchangBatch } from "@/lib/api";
import type { DayEntry } from "@/lib/api";
import { getCityBySlug, getAllCities } from "@/lib/cities";
import { formatDate, formatDateShort } from "@/lib/format";
import { format, parseISO } from "date-fns";
import { SITE_CONFIG, getNatureStyle } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

// Week ID format: YYYY-MM-DD (Monday of the week)
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

interface PageProps {
  params: Promise<{ city: string; weekId: string }>;
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function isValidWeekStart(dateStr: string): boolean {
  if (!DATE_REGEX.test(dateStr)) return false;
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return false;
  if (d.getDay() !== 1) return false; // Must be Monday
  return d.getFullYear() >= 2020 && d.getFullYear() <= 2030;
}

function getWeekDates(mondayDate: string): string[] {
  const monday = new Date(mondayDate + "T00:00:00");
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(toISO(d));
  }
  return dates;
}

function getAdjacentWeeks(mondayDate: string): { prev: string; next: string } {
  const monday = new Date(mondayDate + "T00:00:00");
  const prevMonday = new Date(monday);
  prevMonday.setDate(monday.getDate() - 7);
  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);
  return { prev: toISO(prevMonday), next: toISO(nextMonday) };
}

function formatWeekRange(dates: string[]): string {
  if (dates.length === 0) return "";
  const start = formatDate(dates[0]);
  const end = formatDate(dates[dates.length - 1]);
  return `${start.split(",")[0]} – ${end}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, weekId } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || !isValidWeekStart(weekId)) return {};

  const dates = getWeekDates(weekId);
  const startDate = parseISO(dates[0]);
  const endDate = parseISO(dates[dates.length - 1]);
  const sameMonth = startDate.getMonth() === endDate.getMonth();
  const compactRange = sameMonth
    ? `${format(startDate, "MMM d")}–${format(endDate, "d, yyyy")}`
    : `${format(startDate, "MMM d")} – ${format(endDate, "MMM d, yyyy")}`;

  return {
    title: `Weekly Panchang ${city.name} — ${compactRange}`,
    description: `7-day Panchang planner for ${city.name}, ${city.state}. Day quality, Tithi, Nakshatra, and Rahu Kaal for the entire week at a glance.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/week/${weekId}`,
    },
    openGraph: {
      title: `Weekly Panchang ${city.name} — ${compactRange}`,
      description: `Plan your week with daily Panchang for ${city.name}.`,
      url: `${SITE_CONFIG.url}/${city.slug}/week/${weekId}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

function DayRow({ date, entry, citySlug, isToday }: {
  date: string;
  entry: DayEntry;
  citySlug: string;
  isToday: boolean;
}) {
  if (!entry.ok) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/40 p-4 opacity-60">
        <p className="text-sm text-muted-foreground">Data unavailable for {date}</p>
      </div>
    );
  }

  const data = entry.data;
  const score = Math.round(data.day_quality.score);
  const scoreColor = score >= 70 ? "#22c55e" : score >= 40 ? "#C4973B" : "#ef4444";
  const tithiStyle = getNatureStyle(data.panchang.tithi.nature);
  const tithi = data.panchang.tithi.tithi.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
  const nakshatra = data.panchang.nakshatra.nakshatra.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");

  return (
    <Link
      href={`/${citySlug}/${date}`}
      className={`group block rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5 ${
        isToday
          ? "border-[#C4973B]/50 bg-[#C4973B]/5 shadow-md"
          : "border-border/50 bg-card hover:border-[#C4973B]/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: day info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold sm:text-base ${isToday ? "text-[#C4973B]" : "text-foreground"}`}>
              {data.day_name}
            </span>
            {isToday && (
              <span className="rounded-full bg-[#C4973B] px-2 py-0.5 text-[10px] font-bold text-white">TODAY</span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(date)}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
            <span><span className="text-muted-foreground">Tithi:</span> <span className="font-semibold text-foreground">{tithi}</span></span>
            <span><span className="text-muted-foreground">Nakshatra:</span> <span className="font-semibold text-foreground">{nakshatra}</span></span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tithiStyle.bg} ${tithiStyle.text}`}>{data.panchang.tithi.paksha}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span>Rahu Kaal: <span className="font-semibold text-red-500">{data.timing.rahu_kalam.start_time}–{data.timing.rahu_kalam.end_time}</span></span>
            <span>Sunrise: {data.timing.sunrise}</span>
            <span>Sunset: {data.timing.sunset}</span>
          </div>
        </div>
        {/* Right: score */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Score</span>
          <span className="text-3xl font-bold" style={{ color: scoreColor }}>{score}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function CityWeekPage({ params }: PageProps) {
  const { city: citySlug, weekId } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  if (!isValidWeekStart(weekId)) notFound();

  const dates = getWeekDates(weekId);
  const dataMap = await fetchPanchangBatch(dates, {
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  });

  const { prev, next } = getAdjacentWeeks(weekId);
  const weekRange = formatWeekRange(dates);
  const todayISO = new Date().toISOString().slice(0, 10);

  const otherCities = getAllCities()
    .filter((c) => c.slug !== citySlug)
    .slice(0, 8);

  return (
    <>
      <JsonLd
        city={city.name}
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
          { name: `Week of ${formatDateShort(weekId)}`, url: `${SITE_CONFIG.url}/${city.slug}/week/${weekId}` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <CalendarDays className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Weekly Panchang
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            {city.name} &middot; {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Week navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/${citySlug}/week/${prev}`}
            className="flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-[#C4973B]/30 hover:shadow-md"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </Link>
          <div className="text-center">
            <h2 className="text-lg font-bold text-[var(--color-vedic)] sm:text-xl heading-display">
              {weekRange}
            </h2>
          </div>
          <Link
            href={`/${citySlug}/week/${next}`}
            className="flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-[#C4973B]/30 hover:shadow-md"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Day rows */}
        <div className="space-y-3">
          {dates.map((date) => (
            <DayRow
              key={date}
              date={date}
              entry={dataMap.get(date) ?? { ok: false }}
              citySlug={citySlug}
              isToday={date === todayISO}
            />
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${city.slug}`}
              className="rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
            >
              Today&apos;s Panchang
            </Link>
            <Link
              href={`/${city.slug}/calendar/${dates[0]?.slice(0, 7)}`}
              className="rounded-full border border-[var(--color-vedic)]/30 px-6 py-2.5 text-sm font-bold text-[var(--color-vedic)] transition-all hover:shadow-md"
            >
              Monthly Calendar
            </Link>
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">Weekly Panchang for Other Cities</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/week/${weekId}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
