import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug, getTopCitySlugs } from "@/lib/cities";
import { formatDate, getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { getCityFaqs } from "@/lib/faqs";
import { getLocale } from "@/lib/i18n";
import { HeroSection } from "@/components/hero/hero-section";
import { TimeQualitySection } from "@/components/time-quality/time-quality-section";
import { PanchangGrid } from "@/components/panchang-details/panchang-grid";
import { WidgetSidebar } from "@/components/network-widgets/widget-sidebar";
import { JsonLd } from "@/components/seo/json-ld";
import { HeroActions } from "@/components/hero/hero-actions";
import { DateNavigator } from "@/components/hero/date-navigator";
import { FaqSection } from "@/components/seo/faq-section";
import { ShareButton } from "@/components/hero/share-button";
import { DailySummary } from "@/components/panchang-details/daily-summary";

export const revalidate = 3600;

export function generateStaticParams() {
  const today = getTodayISO();
  return getTopCitySlugs().map((city) => ({ city, date: today }));
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

interface CityDatePageProps {
  params: Promise<{ city: string; date: string }>;
}

function isValidDate(dateStr: string): boolean {
  if (!DATE_REGEX.test(dateStr)) return false;
  const d = new Date(dateStr + "T00:00:00");
  return !isNaN(d.getTime());
}

export async function generateMetadata({
  params,
}: CityDatePageProps): Promise<Metadata> {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || !isValidDate(date)) return {};

  const formattedDate = formatDate(date);

  return {
    title: `Panchang for ${city.name} on ${formattedDate} | Tithi, Nakshatra, Rahu Kaal`,
    description: `Panchang for ${city.name}, ${city.state} on ${formattedDate}. Accurate Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Choghadiya timings for ${city.name}.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}/${date}`,
    },
    openGraph: {
      title: `Panchang for ${city.name} - ${formattedDate}`,
      description: `Accurate Panchang for ${city.name} on ${formattedDate}. Tithi, Nakshatra, Rahu Kaal, Choghadiya timings.`,
      url: `${SITE_CONFIG.url}/${city.slug}/${date}`,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og/${city.slug}/${date}`,
          width: 1200,
          height: 630,
          alt: `Panchang for ${city.name} on ${formattedDate}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Panchang for ${city.name} - ${formattedDate}`,
      description: `Tithi, Nakshatra, Rahu Kaal for ${city.name} on ${formattedDate}.`,
      images: [`${SITE_CONFIG.url}/api/og/${city.slug}/${date}`],
    },
  };
}

export default async function CityDatePanchangPage({
  params,
}: CityDatePageProps) {
  const { city: citySlug, date } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  if (!isValidDate(date)) notFound();

  const locale = await getLocale();
  const faqs = getCityFaqs(city.name, city.state);

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
        <h1 className="mb-4 text-2xl font-bold text-[var(--color-vedic)]">
          Unable to Load Panchang
        </h1>
        <p className="text-muted-foreground">
          We&apos;re having trouble fetching Panchang data for {city.name} on{" "}
          {date}. Please try again shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="flex flex-col items-center text-center">
            <h1 className="animate-fade-in-up heading-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Panchang &mdash; {city.name}
            </h1>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
            <p className="animate-fade-in-up-delay mt-4 text-lg tracking-wide text-white/60">
              {formatDate(data.date)} &middot; {city.state}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <HeroActions citySlug={city.slug} cityName={city.name} variant="dark" />
              <ShareButton cityName={city.name} citySlug={city.slug} date={date} />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <DateNavigator currentDate={data.date} citySlug={city.slug} variant="dark" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[92%] overflow-hidden px-4 py-6 sm:px-6">
        <JsonLd
          city={city.name}
          breadcrumbs={[
            { name: "Home", url: SITE_CONFIG.url },
            { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
            { name: formatDate(date), url: `${SITE_CONFIG.url}/${city.slug}/${date}` },
          ]}
          faqs={faqs}
        />
        <HeroSection data={data} locale={locale} />

        <div className="mt-6">
          <DailySummary data={data} cityName={city.name} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-8">
            <TimeQualitySection hora={data.hora} choghadiya={data.choghadiya} />
            <PanchangGrid data={data} locale={locale} />
          </div>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <WidgetSidebar />
          </aside>
        </div>

        <FaqSection faqs={faqs} cityName={city.name} />
      </div>
    </>
  );
}
