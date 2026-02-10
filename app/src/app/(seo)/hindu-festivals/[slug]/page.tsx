import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Star, ArrowLeft, MapPin, Clock, Sun } from "lucide-react";
import { SITE_CONFIG, DEFAULT_LOCATION, getNatureStyle } from "@/lib/constants";
import { getAllFestivals, getFestivalBySlug } from "@/data/festivals";
import { fetchPanchang } from "@/lib/api";
import { formatDate, formatTime12h } from "@/lib/format";
import { getAllCities } from "@/lib/cities";
import { JsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllFestivals().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) return {};

  return {
    title: `${festival.name} ${festival.year} - Date, Significance & Panchang | VastuCart`,
    description: `${festival.name} (${festival.nameHindi}) falls on ${formatDate(festival.date)}. ${festival.description.slice(0, 120)}`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/hindu-festivals/${slug}`,
    },
    openGraph: {
      title: `${festival.name} ${festival.year} - Date, Significance & Panchang`,
      description: festival.description.slice(0, 160),
      url: `${SITE_CONFIG.url}/hindu-festivals/${slug}`,
      siteName: SITE_CONFIG.name,
      type: "article",
    },
  };
}

export default async function FestivalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) notFound();

  // Fetch panchang data for the festival date (using New Delhi as default)
  let data;
  try {
    data = await fetchPanchang(
      {
        targetDate: festival.date,
        latitude: DEFAULT_LOCATION.lat,
        longitude: DEFAULT_LOCATION.lng,
        timezone: DEFAULT_LOCATION.tz,
      },
      3600
    );
  } catch {
    data = null;
  }

  const cities = getAllCities().slice(0, 16);
  const tithiStyle = data ? getNatureStyle(data.panchang.tithi.nature) : null;

  const faqs = [
    {
      question: `When is ${festival.name} in ${festival.year}?`,
      answer: `${festival.name} (${festival.nameHindi}) falls on ${formatDate(festival.date)} in ${festival.year}.`,
    },
    {
      question: `What is the significance of ${festival.name}?`,
      answer: festival.significance,
    },
    {
      question: `What are the traditions of ${festival.name}?`,
      answer: `Key traditions include: ${festival.traditions.join(", ")}.`,
    },
  ];

  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Hindu Festivals", url: `${SITE_CONFIG.url}/hindu-festivals` },
          { name: festival.name, url: `${SITE_CONFIG.url}/hindu-festivals/${slug}` },
        ]}
        faqs={faqs}
      />

      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{
          background:
            "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Link
            href="/hindu-festivals"
            className="mb-6 inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> All Festivals
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            {festival.name}
          </h1>
          <p className="mt-2 text-lg text-[#C4973B]">{festival.nameHindi}</p>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60">
            {formatDate(festival.date)}
          </p>
          {festival.deity && (
            <p className="mt-2 text-sm text-white/40">
              Dedicated to {festival.deity}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* About the festival */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-vedic)]">
            About {festival.name}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {festival.description}
          </p>
        </section>

        {/* Significance */}
        <section className="mb-8 rounded-2xl border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-[#C4973B]" />
            <h2 className="text-base font-bold text-[var(--color-vedic)]">
              Significance
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {festival.significance}
          </p>
          {festival.tithi && (
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Tithi:</span>{" "}
              {festival.tithi}
            </p>
          )}
        </section>

        {/* Traditions */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-vedic)]">
            Traditions &amp; Customs
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {festival.traditions.map((t) => (
              <div
                key={t}
                className="flex items-start gap-2 rounded-lg border bg-card px-4 py-3"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C4973B]" />
                <span className="text-sm text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Panchang Data for this date */}
        {data && (
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[var(--color-vedic)]">
              Panchang on {festival.name}
            </h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Panchang details for {DEFAULT_LOCATION.name} on{" "}
              {formatDate(festival.date)}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Day Score */}
              <div className="rounded-xl border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Day Quality
                </p>
                <p
                  className="mt-1 text-3xl font-bold"
                  style={{
                    color:
                      data.day_quality.score >= 70
                        ? "#22c55e"
                        : data.day_quality.score >= 40
                          ? "#C4973B"
                          : "#ef4444",
                  }}
                >
                  {Math.round(data.day_quality.score)}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    / 100
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {data.day_quality.label}
                </p>
              </div>

              {/* Tithi */}
              <div className="rounded-xl border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tithi
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {data.panchang.tithi.tithi.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                </p>
                {tithiStyle && (
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${tithiStyle.bg} ${tithiStyle.text}`}
                  >
                    {data.panchang.tithi.paksha}
                  </span>
                )}
              </div>

              {/* Nakshatra */}
              <div className="rounded-xl border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Nakshatra
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {data.panchang.nakshatra.nakshatra.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Lord: {data.panchang.nakshatra.lord}
                </p>
              </div>

              {/* Timings */}
              <div className="rounded-xl border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Key Timings
                </p>
                <div className="mt-2 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Sun className="h-3 w-3 text-amber-500" />
                    <span className="text-muted-foreground">Sunrise:</span>
                    <span className="font-semibold text-foreground">
                      {formatTime12h(data.timing.sunrise)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-3 w-3 text-orange-500" />
                    <span className="text-muted-foreground">Sunset:</span>
                    <span className="font-semibold text-foreground">
                      {formatTime12h(data.timing.sunset)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-red-500" />
                    <span className="text-muted-foreground">Rahu Kaal:</span>
                    <span className="font-semibold text-red-600">
                      {data.timing.rahu_kalam.start_time}–
                      {data.timing.rahu_kalam.end_time}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link
                href={`/${DEFAULT_LOCATION.slug}/${festival.date}`}
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #003636, #004D40)",
                }}
              >
                <Calendar className="h-4 w-4" />
                Full Panchang for {formatDate(festival.date)}
              </Link>
            </div>
          </section>
        )}

        {/* View in other cities */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-[var(--color-vedic)]">
            View Panchang on {festival.name} by City
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/${festival.date}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-[var(--color-vedic)]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border bg-card"
              >
                <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-foreground">
                  {faq.question}
                </summary>
                <div className="border-t px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/hindu-festivals"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-vedic)] transition-colors hover:text-[#C4973B]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Festivals
          </Link>
        </div>
      </div>
    </>
  );
}
