import type { Metadata } from "next";
import { Moon, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { TITHI_FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const metadata: Metadata = {
  title: "Today's Tithi - Current Lunar Day in Hindu Calendar",
  description:
    "Check today's Tithi (lunar day) with Paksha, deity, nature, and elapsed percentage. Essential for Vedic rituals, festivals, and daily spiritual observances.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/todays-tithi`,
  },
  openGraph: {
    title: "Today's Tithi | VastuCart Panchang",
    description:
      "Know the current Tithi with Paksha, deity, and nature. Updated daily for accurate Vedic timings.",
    url: `${SITE_CONFIG.url}/todays-tithi`,
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

export default function TodaysTithiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Today's Tithi", url: `${SITE_CONFIG.url}/todays-tithi` },
        ]}
        faqs={TITHI_FAQS}
      />

      <div className="mb-8 flex items-center gap-3">
        <Moon className="h-8 w-8 text-[var(--color-vedic)]" />
        <h1 className="text-3xl font-bold text-[var(--color-vedic)]">
          Today&apos;s Tithi
        </h1>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Tithi is the lunar day in the Hindu calendar, determined by the angular distance
          between the Sun and Moon. There are 30 Tithis in a lunar month, divided equally
          between Shukla Paksha (waxing) and Krishna Paksha (waning).
        </p>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            Understanding Tithi
          </h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              Each Tithi spans 12 degrees of angular separation between the Sun and Moon.
              Tithis are classified as Nanda (joyful), Bhadra (gentle), Jaya (victorious),
              Rikta (empty), and Purna (complete).
            </p>
            <p>
              Certain Tithis are especially significant for festivals: Ekadashi (11th Tithi)
              for fasting, Purnima (Full Moon) for worship, and Amavasya (New Moon) for
              ancestral rites.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[var(--color-vedic)]">
          Why Tithi Matters
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>Determines the auspiciousness of the day for rituals and ceremonies</li>
          <li>Essential for calculating festival dates and vratas (fasts)</li>
          <li>Influences the overall day quality score in Panchang</li>
          <li>Each Tithi has a presiding deity whose blessings are sought</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--color-vedic)]">
          Check Today&apos;s Tithi for Your City
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

        <FaqSection faqs={TITHI_FAQS} />
      </div>
    </div>
  );
}
