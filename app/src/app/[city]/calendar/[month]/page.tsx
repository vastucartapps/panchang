import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { fetchPanchangBatch } from "@/lib/api";
import { getCityBySlug, getAllCities } from "@/lib/cities";
import { SITE_CONFIG } from "@/lib/constants";
import { getNatureStyle } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import type { PanchangResponse } from "@/schemas/panchang";

export const revalidate = 3600;

const MONTH_REGEX = /^\d{4}-\d{2}$/;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface PageProps {
  params: Promise<{ city: string; month: string }>;
}

function isValidMonth(m: string): boolean {
  if (!MONTH_REGEX.test(m)) return false;
  const [year, month] = m.split("-").map(Number);
  return year >= 2020 && year <= 2030 && month >= 1 && month <= 12;
}

function getDaysInMonth(yearMonth: string): string[] {
  const [year, month] = yearMonth.split("-").map(Number);
  const daysCount = new Date(year, month, 0).getDate();
  const dates: string[] = [];
  for (let d = 1; d <= daysCount; d++) {
    dates.push(`${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
  }
  return dates;
}

function getAdjacentMonths(yearMonth: string): { prev: string; next: string } {
  const [year, month] = yearMonth.split("-").map(Number);
  const prevDate = new Date(year, month - 2, 1);
  const nextDate = new Date(year, month, 1);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  return { prev: fmt(prevDate), next: fmt(nextDate) };
}

function formatMonthYear(yearMonth: string): string {
  const [year, month] = yearMonth.split("-").map(Number);
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, month } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || !isValidMonth(month)) return {};

  const monthYear = formatMonthYear(month);

  return {
    title: `Panchang Calendar for ${city.name} - ${monthYear}`,
    description: `Monthly Panchang calendar for ${city.name}, ${city.state} - ${monthYear}. Daily Tithi, Nakshatra, Day Quality score, and auspicious timings at a glance.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/calendar/${month}`,
    },
    openGraph: {
      title: `Panchang Calendar - ${city.name} - ${monthYear}`,
      description: `Hindu calendar for ${city.name} - ${monthYear}. Tithi, Nakshatra, and day quality for every day.`,
      url: `${SITE_CONFIG.url}/${city.slug}/calendar/${month}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

function DayCell({
  date,
  data,
  citySlug,
  isToday,
}: {
  date: string;
  data: PanchangResponse | undefined;
  citySlug: string;
  isToday: boolean;
}) {
  const dayNum = parseInt(date.split("-")[2], 10);

  if (!data) {
    return (
      <div className="min-h-[90px] rounded-xl border border-border/50 bg-card/50 p-2 opacity-50">
        <span className="text-xs font-bold text-muted-foreground">{dayNum}</span>
      </div>
    );
  }

  const score = Math.round(data.day_quality.score);
  const scoreColor = score >= 70 ? "text-green-500" : score >= 40 ? "text-[#C4973B]" : "text-red-400";
  const tithiStyle = getNatureStyle(data.panchang.tithi.nature);
  const tithi = data.panchang.tithi.tithi.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
  const nakshatra = data.panchang.nakshatra.nakshatra.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");

  return (
    <Link
      href={`/${citySlug}/${date}`}
      className={`group flex min-h-[90px] flex-col rounded-xl border p-2 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:min-h-[100px] sm:p-2.5 ${
        isToday
          ? "border-[#C4973B]/50 bg-[#C4973B]/5 shadow-md"
          : "border-border/50 bg-card hover:border-[#C4973B]/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold sm:text-sm ${isToday ? "text-[#C4973B]" : "text-foreground"}`}>
          {dayNum}
        </span>
        <span className={`text-xs font-bold ${scoreColor}`}>{score}</span>
      </div>
      <p className="mt-1 truncate text-[10px] font-semibold leading-tight text-foreground sm:text-xs">
        {tithi}
      </p>
      <p className="mt-0.5 truncate text-[9px] text-muted-foreground sm:text-[10px]">
        {nakshatra}
      </p>
      <span className={`mt-auto inline-block w-fit rounded-full px-1.5 py-0.5 text-[8px] font-bold sm:text-[9px] ${tithiStyle.bg} ${tithiStyle.text}`}>
        {data.panchang.tithi.paksha.slice(0, 2)}
      </span>
    </Link>
  );
}

export default async function CityCalendarPage({ params }: PageProps) {
  const { city: citySlug, month } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  if (!isValidMonth(month)) notFound();

  const dates = getDaysInMonth(month);
  const dataMap = await fetchPanchangBatch(dates, {
    latitude: city.lat,
    longitude: city.lng,
    timezone: city.tz,
  });

  const { prev, next } = getAdjacentMonths(month);
  const monthYear = formatMonthYear(month);
  const todayISO = new Date().toISOString().slice(0, 10);

  // Calculate first day of month for grid offset
  const [year, mo] = month.split("-").map(Number);
  const firstDayOfWeek = new Date(year, mo - 1, 1).getDay();

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
          { name: `Calendar - ${monthYear}`, url: `${SITE_CONFIG.url}/${city.slug}/calendar/${month}` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <CalendarDays className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Panchang Calendar
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            {city.name} &middot; {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Month navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/${citySlug}/calendar/${prev}`}
            className="flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-[#C4973B]/30 hover:shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{formatMonthYear(prev)}</span>
            <span className="sm:hidden">Prev</span>
          </Link>
          <h2 className="text-xl font-bold text-[var(--color-vedic)] sm:text-2xl heading-display">
            {monthYear}
          </h2>
          <Link
            href={`/${citySlug}/calendar/${next}`}
            className="flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-[#C4973B]/30 hover:shadow-md"
          >
            <span className="hidden sm:inline">{formatMonthYear(next)}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Weekday headers */}
          {WEEKDAYS.map((day) => (
            <div key={day} className="pb-2 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-xs">
              {day}
            </div>
          ))}

          {/* Empty cells before first day */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {dates.map((date) => (
            <DayCell
              key={date}
              date={date}
              data={dataMap.get(date)}
              citySlug={citySlug}
              isToday={date === todayISO}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Score 70+
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C4973B]" /> Score 40-69
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Score &lt;40
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#C4973B]" /> Today
          </span>
        </div>

        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-center">
            <Link
              href={`/${city.slug}`}
              className="rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
            >
              Today&apos;s Panchang for {city.name}
            </Link>
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">Calendar for Other Cities</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/calendar/${month}`}
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
