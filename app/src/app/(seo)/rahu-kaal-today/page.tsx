import type { Metadata } from "next";
import { ShieldAlert, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";

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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Rahu Kaal Today", url: `${SITE_CONFIG.url}/rahu-kaal-today` },
        ]}
      />

      <div className="mb-8 flex items-center gap-3">
        <ShieldAlert className="h-8 w-8 text-[var(--color-nature-inauspicious)]" />
        <h1 className="text-3xl font-bold text-[var(--color-vedic)]">
          Rahu Kaal Today
        </h1>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Rahu Kaal (also written as Rahu Kalam or Rahu Kaalam) is a daily inauspicious period
          in Vedic astrology ruled by the shadow planet Rahu. It is one of the most widely
          observed timings across India, considered unfavorable for starting new activities,
          signing contracts, or beginning journeys.
        </p>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
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
              className="flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-[var(--color-saffron)]/30 hover:bg-accent"
            >
              <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
