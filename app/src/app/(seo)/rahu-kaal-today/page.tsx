import type { Metadata } from "next";
import { ShieldAlert, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { RAHU_KAAL_FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const metadata: Metadata = {
  title: "Rahu Kaal Today - Accurate Rahu Kalam Timings for All Indian Cities",
  description:
    "Check today's Rahu Kaal timings for your city. Rahu Kalam is an inauspicious period ruled by Rahu — avoid starting new work, travel, or important activities during this time.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/rahu-kaal-today`,
  },
  openGraph: {
    title: "Rahu Kaal Today | VastuCart Panchang",
    description:
      "Accurate daily Rahu Kaal timings for 200+ Indian cities. Know when to avoid starting new ventures.",
    url: `${SITE_CONFIG.url}/rahu-kaal-today`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

const POPULAR_CITIES = [
  { name: "New Delhi", slug: "new-delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Kolkata", slug: "kolkata" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Pune", slug: "pune" },
  { name: "Ahmedabad", slug: "ahmedabad" },
  { name: "Jaipur", slug: "jaipur" },
  { name: "Varanasi", slug: "varanasi" },
  { name: "Lucknow", slug: "lucknow" },
  { name: "Indore", slug: "indore" },
];

export default function RahuKaalPage() {
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Rahu Kaal Today", url: `${SITE_CONFIG.url}/rahu-kaal-today` },
        ]}
        faqs={RAHU_KAAL_FAQS}
      />

      {/* Hero bar */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ShieldAlert className="mx-auto h-10 w-10 text-[#ef4444]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Rahu Kaal Today
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Know when to avoid starting new ventures
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="prose prose-neutral max-w-none space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Rahu Kaal (also written as Rahu Kalam or Rahu Kaalam) is a daily inauspicious period
            in Vedic astrology ruled by the shadow planet Rahu. It is one of the most widely
            observed timings across India, considered unfavorable for starting new activities,
            signing contracts, or beginning journeys.
          </p>

          <div className="rounded-2xl border-0 bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[var(--color-vedic)]" />
              <h2 className="text-xl font-bold text-[var(--color-vedic)]">
                How is Rahu Kaal Calculated?
              </h2>
            </div>
            <p className="text-muted-foreground">
              Rahu Kaal is calculated by dividing the daylight hours (sunrise to sunset) into
              8 equal parts. Each part is assigned to a planetary lord, and the segment ruled by
              Rahu is considered Rahu Kaal. The position of Rahu Kaal changes based on the day
              of the week and varies by city due to differences in sunrise and sunset times.
            </p>
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            What to Avoid During Rahu Kaal
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>Starting a new business or venture</li>
            <li>Signing important documents or contracts</li>
            <li>Beginning a journey or travel</li>
            <li>Performing auspicious ceremonies</li>
            <li>Making major financial decisions</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            Check Rahu Kaal for Your City
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {POPULAR_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {city.name}
              </Link>
            ))}
          </div>

          <FaqSection faqs={RAHU_KAAL_FAQS} />
        </div>
      </div>
    </>
  );
}
