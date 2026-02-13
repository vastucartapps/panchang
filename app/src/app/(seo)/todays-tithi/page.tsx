import type { Metadata } from "next";
import { Moon, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { TITHI_FAQS } from "@/lib/faqs";
import { getAllCities } from "@/lib/cities";
import { getTodayISO } from "@/lib/format";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const dynamic = "force-dynamic";

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

export default function TodaysTithiPage() {
  const allCities = getAllCities();
  const today = getTodayISO();
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Today's Tithi", url: `${SITE_CONFIG.url}/todays-tithi` },
        ]}
        faqs={TITHI_FAQS}
      />

      {/* Hero bar */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Today&apos;s Tithi
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Current lunar day in the Hindu calendar
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="prose prose-neutral max-w-none space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tithi is the lunar day in the Hindu calendar, determined by the angular distance
            between the Sun and Moon. There are 30 Tithis in a lunar month, divided equally
            between Shukla Paksha (waxing) and Krishna Paksha (waning).
          </p>

          <div className="rounded-2xl border-0 bg-card p-6 shadow-lg">
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
          <p className="text-sm text-muted-foreground">
            Select your city to view today&apos;s Tithi, Paksha, deity, and nature details.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {allCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/todays-tithi/${today}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {city.name}
              </Link>
            ))}
          </div>

          <FaqSection faqs={TITHI_FAQS} />
        </div>
      </div>
    </>
  );
}
