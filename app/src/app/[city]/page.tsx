import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPanchang } from "@/lib/api";
import { getCityBySlug } from "@/lib/cities";
import { getTodayISO, formatDate } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";
import { HeroSection } from "@/components/hero/hero-section";
import { TimeQualitySection } from "@/components/time-quality/time-quality-section";
import { PanchangGrid } from "@/components/panchang-details/panchang-grid";
import { WidgetSidebar } from "@/components/network-widgets/widget-sidebar";
import { JsonLd } from "@/components/seo/json-ld";
import { HeroActions } from "@/components/hero/hero-actions";
import { DateNavigator } from "@/components/hero/date-navigator";

export const dynamic = "force-dynamic";
export const revalidate = 300;

interface CityPageProps {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ date?: string }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const today = formatDate(getTodayISO());

  return {
    title: `Panchang Today in ${city.name} | Tithi, Nakshatra, Rahu Kaal`,
    description: `Today's Panchang for ${city.name}, ${city.state} - ${today}. Get accurate Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Choghadiya timings. Updated daily.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${city.slug}`,
    },
    openGraph: {
      title: `Panchang Today in ${city.name}`,
      description: `Accurate daily Panchang for ${city.name}. Tithi, Nakshatra, Rahu Kaal, Choghadiya timings.`,
      url: `${SITE_CONFIG.url}/${city.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function CityPanchangPage({
  params,
  searchParams,
}: CityPageProps) {
  const { city: citySlug } = await params;
  const { date } = await searchParams;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const targetDate = date || getTodayISO();

  let data;
  try {
    data = await fetchPanchang({
      targetDate,
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
          We&apos;re having trouble fetching today&apos;s Panchang data for{" "}
          {city.name}. Please try again shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="py-8" style={{ backgroundColor: "#D9C2A6", backgroundImage: "none" }}>
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold text-[#3B2512] sm:text-4xl">
              Panchang &mdash; {city.name}
            </h1>
            <p className="mt-2 text-base text-[#5C3D1E]/70">
              {formatDate(data.date)} &middot; {city.state}
            </p>
            <HeroActions citySlug={city.slug} cityName={city.name} />
          </div>
          <div className="mt-3 flex justify-center">
            <DateNavigator currentDate={data.date} citySlug={city.slug} />
          </div>
        </div>
      </section>

      <div className="mx-auto px-4 py-6 sm:px-6" style={{ maxWidth: "92%" }}>
        <JsonLd
          city={city.name}
          breadcrumbs={[
            { name: "Home", url: SITE_CONFIG.url },
            { name: `Panchang - ${city.name}`, url: `${SITE_CONFIG.url}/${city.slug}` },
          ]}
        />
        <HeroSection data={data} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <TimeQualitySection hora={data.hora} choghadiya={data.choghadiya} />
            <PanchangGrid data={data} />
          </div>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <WidgetSidebar />
          </aside>
        </div>
      </div>
    </>
  );
}
