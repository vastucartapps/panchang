import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, MapPin, Clock } from "lucide-react";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug, getAllCities, getTopCitySlugs } from "@/lib/cities";
import { formatDate, formatTime12h, formatDuration, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { getCityRahuKaalFaqs } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const revalidate = 3600;

export function generateStaticParams() {
  const today = getTodayISO();
  return getTopCitySlugs().map((city) => ({ city, date: today }));
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

interface PageProps {
  params: Promise<{ city: string; date: string }>;
}

function isValidDate(dateStr: string): boolean {
  if (!DATE_REGEX.test(dateStr)) return false;
  const d = new Date(dateStr + "T00:00:00");
  return !isNaN(d.getTime());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || !isValidDate(date)) return {};

  const formattedDate = formatDate(date);

  return {
    title: `Rahu Kaal in ${city.name} on ${formattedDate} - Accurate Timings`,
    description: `Rahu Kaal, Yamagandam, and Gulika Kalam timings for ${city.name}, ${city.state} on ${formattedDate}. Know the exact inauspicious periods to avoid.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/rahu-kaal-today/${date}`,
    },
    openGraph: {
      title: `Rahu Kaal in ${city.name} - ${formattedDate} | VastuCart Panchang`,
      description: `Accurate Rahu Kaal timings for ${city.name} on ${formattedDate}.`,
      url: `${SITE_CONFIG.url}/${city.slug}/rahu-kaal-today/${date}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function CityRahuKaalDatePage({ params }: PageProps) {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  if (!isValidDate(date)) notFound();

  let data;
  try {
    data = await fetchPanchang({
      targetDate: date,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
  } catch {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-[var(--color-vedic)]">Unable to Load Data</h1>
        <p className="text-muted-foreground">Please try again shortly.</p>
      </div>
    );
  }

  const { timing } = data;
  const timings = [timing.rahu_kalam, timing.yamagandam, timing.gulika_kalam];
  const cityFaqs = getCityRahuKaalFaqs(city.name, city.state);
  const otherCities = getAllCities()
    .filter((c) => c.slug !== citySlug)
    .slice(0, 12);

  return (
    <>
      <JsonLd
        city={city.name}
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
          { name: `Rahu Kaal - ${formatDate(date)}`, url: `${SITE_CONFIG.url}/${city.slug}/rahu-kaal-today/${date}` },
        ]}
        faqs={cityFaqs}
      />

      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ShieldAlert className="mx-auto h-10 w-10 text-[#ef4444]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Rahu Kaal in {city.name}
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            {formatDate(date)} &middot; {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Live timings */}
        <div className="grid gap-3 sm:grid-cols-3">
          {timings.map((t) => (
            <div
              key={t.name}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] p-4 sm:p-5"
              style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">{t.name}</p>
              <div className="mt-2 h-px w-12 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <p className="mt-3 font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {formatTime12h(t.start_time)}
              </p>
              <p className="text-xs text-white/50">to</p>
              <p className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {formatTime12h(t.end_time)}
              </p>
              <span className="mt-3 rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-white/80">
                {formatDuration(t.duration_minutes)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span>Sunrise: <strong className="text-foreground">{formatTime12h(timing.sunrise)}</strong></span>
          <span>Sunset: <strong className="text-foreground">{formatTime12h(timing.sunset)}</strong></span>
        </div>

        <div className="mt-10 space-y-6">
          <div className="rounded-2xl border-0 bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[var(--color-vedic)]" />
              <h2 className="text-xl font-bold text-[var(--color-vedic)]">
                About Rahu Kaal in {city.name}
              </h2>
            </div>
            <p className="text-muted-foreground">
              Rahu Kaal for {city.name} on {formatDate(date)} is calculated based on the local sunrise ({formatTime12h(timing.sunrise)}) and sunset ({formatTime12h(timing.sunset)}) times. The daylight period of {timing.dinamana_hours.toFixed(1)} hours is divided into 8 equal parts, and the segment ruled by Rahu becomes the inauspicious Rahu Kaal period.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Link
              href={`/${city.slug}/${date}`}
              className="rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #003636, #004D40)" }}
            >
              Full Panchang for {city.name}
            </Link>
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">Rahu Kaal in Other Cities</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/rahu-kaal-today/${date}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {c.name}
              </Link>
            ))}
          </div>

          <FaqSection faqs={cityFaqs} />
        </div>
      </div>
    </>
  );
}
