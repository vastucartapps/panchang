import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Moon, MapPin } from "lucide-react";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug, getAllCities, getTopCitySlugs } from "@/lib/cities";
import { formatDate, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { getNatureStyle } from "@/lib/constants";
import { getCityTithiFaqs } from "@/lib/faqs";
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
    title: `Today's Tithi in ${city.name} on ${formattedDate} - Lunar Day Details`,
    description: `Tithi details for ${city.name}, ${city.state} on ${formattedDate}. Know the current lunar day, Paksha, deity, and its influence on activities.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/todays-tithi/${date}`,
    },
    openGraph: {
      title: `Tithi in ${city.name} - ${formattedDate} | VastuCart Panchang`,
      description: `Current Tithi and Paksha details for ${city.name} on ${formattedDate}.`,
      url: `${SITE_CONFIG.url}/${city.slug}/todays-tithi/${date}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function CityTithiDatePage({ params }: PageProps) {
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

  const { tithi } = data.panchang;
  const style = getNatureStyle(tithi.nature);
  const cityFaqs = getCityTithiFaqs(city.name, city.state);
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
          { name: `Tithi - ${formatDate(date)}`, url: `${SITE_CONFIG.url}/${city.slug}/todays-tithi/${date}` },
        ]}
        faqs={cityFaqs}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Tithi in {city.name}
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            {formatDate(date)} &middot; {city.state}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Tithi card */}
        <div
          className="rounded-3xl border border-white/[0.08] p-6 sm:p-8"
          style={{ background: "linear-gradient(135deg, #013f47 0%, #002828 100%)" }}
        >
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">Current Tithi</p>
          <p className="mt-2 text-center text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            {tithi.tithi}
          </p>
          <p className="mt-1 text-center text-lg text-[#C4973B]">{tithi.paksha}</p>
          <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Nature</p>
              <p className={`mt-1 text-sm font-bold ${style.text}`}>{tithi.nature}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Deity</p>
              <p className="mt-1 text-sm font-bold text-white">{tithi.deity}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Category</p>
              <p className="mt-1 text-sm font-bold text-white">{tithi.category}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Elapsed</p>
              <p className="mt-1 text-sm font-bold text-white">{tithi.percent_elapsed.toFixed(1)}%</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${tithi.percent_elapsed}%`, backgroundColor: style.fill }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>{tithi.elapsed_degrees.toFixed(1)}° elapsed</span>
              <span>{tithi.remaining_degrees.toFixed(1)}° remaining</span>
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

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">Tithi in Other Cities</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/todays-tithi/${date}`}
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
