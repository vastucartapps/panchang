import type { Metadata } from "next";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { NAKSHATRA_FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const metadata: Metadata = {
  title: "Today's Nakshatra - Current Lunar Constellation & Pada",
  description:
    "Find today's Nakshatra (lunar mansion) with pada, deity, lord, gana, and activity type. Key element of Vedic Panchang for daily planning and astrology.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/todays-nakshatra`,
  },
  openGraph: {
    title: "Today's Nakshatra | VastuCart Panchang",
    description:
      "Accurate Nakshatra today with pada, lord, and deity. Essential for Vedic astrology and daily planning.",
    url: `${SITE_CONFIG.url}/todays-nakshatra`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

const POPULAR_CITIES = [
  { name: "New Delhi", slug: "new-delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Varanasi", slug: "varanasi" },
  { name: "Ujjain", slug: "ujjain" },
];

export default function TodaysNakshatraPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Today's Nakshatra", url: `${SITE_CONFIG.url}/todays-nakshatra` },
        ]}
        faqs={NAKSHATRA_FAQS}
      />

      <div className="mb-8 flex items-center gap-3">
        <Star className="h-8 w-8 text-[var(--color-vedic)]" />
        <h1 className="text-3xl font-bold text-[var(--color-vedic)]">
          Today&apos;s Nakshatra
        </h1>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Nakshatra (lunar mansion) is the constellation the Moon occupies at a given time.
          There are 27 Nakshatras, each spanning 13 degrees 20 minutes of the zodiac. Each
          Nakshatra is further divided into 4 Padas (quarters).
        </p>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            Understanding Nakshatra
          </h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              Nakshatras are classified into three Ganas: Deva (divine), Manushya (human),
              and Rakshasa (demonic). Each has a presiding deity and a planetary lord that
              influences its qualities.
            </p>
            <p>
              The Nakshatra determines the type of activities best suited for the day,
              ranging from fixed activities (like laying foundations) to moveable ones
              (like travel).
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[var(--color-vedic)]">
          Importance of Nakshatra
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>Determines the best type of activities for the day</li>
          <li>Used in Muhurta selection for ceremonies and events</li>
          <li>Birth Nakshatra defines personality traits and compatibility</li>
          <li>Essential for Vedic horoscope and Dasha calculations</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--color-vedic)]">
          Check Today&apos;s Nakshatra
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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

        <FaqSection faqs={NAKSHATRA_FAQS} />
      </div>
    </div>
  );
}
