import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCityBySlug, getAllCities } from "@/lib/cities";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { HeroCard } from "@/components/calendar/hero-card";
import { WeekStrip, WeekStripSkeleton } from "@/components/calendar/week-strip";
import { UpcomingFestivals } from "@/components/calendar/upcoming-festivals";
import { MonthNav } from "@/components/calendar/month-nav";
import { MonthGrid, MonthGridSkeleton } from "@/components/calendar/month-grid";
import { Legend } from "@/components/calendar/legend";
import { CAL_COLORS } from "@/lib/panchang-helpers";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

const MONTH_REGEX = /^\d{4}-\d{2}$/;
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
  if (!city || !isValidMonth(month)) notFound();

  const monthYear = formatMonthYear(month);

  return {
    title: `Panchang Calendar ${city.name} — ${monthYear}`,
    description: `Monthly Panchang calendar for ${city.name}, ${city.state} — ${monthYear}. Daily Tithi, Nakshatra, Day Quality score, and auspicious timings at a glance.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/calendar/${month}`,
    },
    openGraph: {
      title: `Panchang Calendar ${city.name} — ${monthYear}`,
      description: `Hindu calendar for ${city.name} — ${monthYear}. Tithi, Nakshatra, and day quality for every day.`,
      url: `${SITE_CONFIG.url}/${city.slug}/calendar/${month}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function CityCalendarPage({ params }: PageProps) {
  const { city: citySlug, month } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  if (!isValidMonth(month)) notFound();

  const dates = getDaysInMonth(month);
  const { prev, next } = getAdjacentMonths(month);
  const monthYear = formatMonthYear(month);

  // URL-derived only — fully deterministic, doesn't opt route out of static
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

      {/* Soft cream page background; keeps site-wide chrome intact. */}
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8" style={{ color: CAL_COLORS.text.primary }}>
        {/* Breadcrumb-ish city label (subtle, above hero) */}
        <p
          className="mb-4 text-[10.5px] font-medium uppercase"
          style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
        >
          Panchang Calendar · {city.name}, {city.state}
        </p>

        {/* ZONE 1: Hero card — streams independently (~same latency as /[city] today fetch) */}
        <Suspense fallback={<HeroCardShell />}>
          <HeroCardWrapper citySlug={citySlug} />
        </Suspense>

        {/* ZONE 2: Week strip — 7 days, Suspense */}
        <div className="mt-6">
          <Suspense fallback={<WeekStripSkeleton />}>
            <WeekStripWrapper citySlug={citySlug} />
          </Suspense>
        </div>

        {/* Upcoming festivals row — wrapped in Suspense so the new Date() read
            inside happens in the deferred render phase, keeping the outer
            shell prerenderable. */}
        <div className="mt-6">
          <Suspense fallback={null}>
            <UpcomingFestivalsWrapper />
          </Suspense>
        </div>

        {/* Month nav */}
        <div className="mt-10">
          <MonthNav citySlug={citySlug} month={month} prev={prev} next={next} />
        </div>

        {/* ZONE 3: Month grid — streams in separately */}
        <div className="mt-6">
          <Suspense fallback={<MonthGridSkeleton firstDayOfWeek={firstDayOfWeek} dayCount={dates.length} />}>
            <MonthGrid
              city={city}
              dates={dates}
              citySlug={citySlug}
              firstDayOfWeek={firstDayOfWeek}
            />
          </Suspense>
        </div>

        {/* Legend */}
        <div className="mt-8">
          <Legend />
        </div>

        {/* CTA + other cities (preserved from prior design) */}
        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-center">
            <Link
              href={`/${city.slug}`}
              className="rounded-full px-6 py-2.5 text-[13px] font-medium transition-all hover:-translate-y-0.5"
              style={{
                background: CAL_COLORS.teal.border,
                color: "#ffffff",
              }}
            >
              Today&apos;s Panchang for {city.name}
            </Link>
          </div>
          <h2 className="font-heading text-[20px] font-medium" style={{ color: CAL_COLORS.teal.textDark }}>
            Calendar for other cities
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/calendar/${month}`}
                prefetch={false}
                className="flex items-center gap-1.5 rounded-[14px] px-3 py-2.5 text-[13px] font-medium transition-all hover:-translate-y-0.5"
                style={{
                  background: "#ffffff",
                  border: `1px solid ${CAL_COLORS.text.secondary}22`,
                  color: CAL_COLORS.text.primary,
                }}
              >
                <MapPin className="h-3 w-3" style={{ color: CAL_COLORS.teal.border }} />
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Wrappers that resolve city from slug inside Suspense boundaries — each zone
// can fail/recover independently.

async function HeroCardWrapper({ citySlug }: { citySlug: string }) {
  const city = getCityBySlug(citySlug)!;
  const todayISO = new Date().toISOString().slice(0, 10);
  return <HeroCard city={city} todayISO={todayISO} />;
}

function HeroCardShell() {
  return (
    <section
      aria-label="Today's Panchang loading"
      style={{
        background: CAL_COLORS.heroGradient,
        border: `1px solid ${CAL_COLORS.teal.border}`,
        borderRadius: 18,
        padding: "22px 24px",
        minHeight: 180,
      }}
      className="animate-pulse"
    />
  );
}

async function WeekStripWrapper({ citySlug }: { citySlug: string }) {
  const city = getCityBySlug(citySlug)!;
  const todayISO = new Date().toISOString().slice(0, 10);
  return <WeekStrip city={city} todayISO={todayISO} />;
}

async function UpcomingFestivalsWrapper() {
  const todayISO = new Date().toISOString().slice(0, 10);
  return <UpcomingFestivals todayISO={todayISO} />;
}
