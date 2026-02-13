import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Sunrise, Sunset, MapPin, Sun } from "lucide-react";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug, getAllCities, getTopCitySlugs } from "@/lib/cities";
import { formatDate, formatTime12h, formatDuration, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { getCitySunriseSunsetFaqs } from "@/lib/faqs";
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
    title: `Sunrise & Sunset in ${city.name} on ${formattedDate} - Sun Timings`,
    description: `Sunrise and sunset times for ${city.name}, ${city.state} on ${formattedDate}. Accurate day duration, Brahma Muhurta, and Abhijit Muhurta timings.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/sunrise-sunset/${date}`,
    },
    openGraph: {
      title: `Sunrise & Sunset in ${city.name} - ${formattedDate} | VastuCart Panchang`,
      description: `Sun timings for ${city.name} on ${formattedDate}. Sunrise, sunset, day duration.`,
      url: `${SITE_CONFIG.url}/${city.slug}/sunrise-sunset/${date}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function CitySunriseSunsetDatePage({ params }: PageProps) {
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
  const cityFaqs = getCitySunriseSunsetFaqs(city.name, city.state);
  const otherCities = getAllCities()
    .filter((c) => c.slug !== citySlug)
    .slice(0, 12);

  const dinamanaHours = Math.floor(timing.dinamana_hours);
  const dinamanaMinutes = Math.round((timing.dinamana_hours - dinamanaHours) * 60);

  return (
    <>
      <JsonLd
        city={city.name}
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
          { name: `Sunrise & Sunset - ${formatDate(date)}`, url: `${SITE_CONFIG.url}/${city.slug}/sunrise-sunset/${date}` },
        ]}
        faqs={cityFaqs}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Sun className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Sunrise &amp; Sunset in {city.name}
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            {formatDate(date)} &middot; {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Sun timing card */}
        <div
          className="rounded-3xl border border-white/[0.08] p-6 sm:p-8"
          style={{ background: "linear-gradient(135deg, #013f47 0%, #002828 100%)" }}
        >
          {/* Sunrise & Sunset — large display */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center">
              <Sunrise className="h-8 w-8 text-amber-400" />
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">Sunrise</p>
              <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {timing.sunrise}
              </p>
              <p className="mt-1 text-xs text-white/50">{formatTime12h(timing.sunrise)}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Sunset className="h-8 w-8 text-rose-400" />
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">Sunset</p>
              <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {timing.sunset}
              </p>
              <p className="mt-1 text-xs text-white/50">{formatTime12h(timing.sunset)}</p>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

          {/* Dinamana */}
          <div className="mt-6 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">Day Duration (Dinamana)</p>
            <p className="mt-1 text-2xl font-bold text-[#C4973B]">
              {dinamanaHours}h {dinamanaMinutes}m
            </p>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Muhurta timings */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">Brahma Muhurta</p>
              <p className="mt-2 font-mono text-lg font-bold text-white">
                {timing.brahma_muhurta.start_time} – {timing.brahma_muhurta.end_time}
              </p>
              <p className="mt-1 text-xs text-white/50">
                {formatDuration(timing.brahma_muhurta.duration_minutes)}
              </p>
            </div>
            {timing.abhijit_muhurta && (
              <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">Abhijit Muhurta</p>
                <p className="mt-2 font-mono text-lg font-bold text-white">
                  {timing.abhijit_muhurta.start_time} – {timing.abhijit_muhurta.end_time}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {formatDuration(timing.abhijit_muhurta.duration_minutes)}
                </p>
                {timing.abhijit_muhurta.note && (
                  <p className="mt-1 text-[10px] leading-tight text-white/30 italic">
                    {timing.abhijit_muhurta.note}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Inauspicious timings summary */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/[0.04] p-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Rahu Kaal</p>
              <p className="mt-1 text-sm font-bold text-white">
                {timing.rahu_kalam.start_time} – {timing.rahu_kalam.end_time}
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Yamagandam</p>
              <p className="mt-1 text-sm font-bold text-white">
                {timing.yamagandam.start_time} – {timing.yamagandam.end_time}
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Gulika</p>
              <p className="mt-1 text-sm font-bold text-white">
                {timing.gulika_kalam.start_time} – {timing.gulika_kalam.end_time}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-center">
            <Link
              href={`/${city.slug}/${date}`}
              className="rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
            >
              Full Panchang for {city.name}
            </Link>
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">Sunrise &amp; Sunset in Other Cities</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/sunrise-sunset/${date}`}
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
