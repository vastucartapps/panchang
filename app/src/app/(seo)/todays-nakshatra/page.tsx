import type { Metadata } from "next";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { NAKSHATRA_FAQS } from "@/lib/faqs";
import { getAllCities } from "@/lib/cities";
import { getTodayISO } from "@/lib/format";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const dynamic = "force-dynamic";

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
    images: [{ url: `${SITE_CONFIG.url}/images/vastucart-logo.png`, width: 512, height: 512, alt: "VastuCart Panchang" }],
  },
  twitter: {
    card: "summary",
    title: "Today's Nakshatra | VastuCart Panchang",
    description: "Accurate Nakshatra today with pada, lord, and deity.",
    images: [`${SITE_CONFIG.url}/images/vastucart-logo.png`],
  },
};

export default function TodaysNakshatraPage() {
  const allCities = getAllCities();
  const today = getTodayISO();
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Today's Nakshatra", url: `${SITE_CONFIG.url}/todays-nakshatra` },
        ]}
        faqs={NAKSHATRA_FAQS}
      />

      {/* Hero bar */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Star className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Today&apos;s Nakshatra
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Current lunar constellation and its significance
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="prose prose-neutral max-w-none space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Nakshatra (lunar mansion) is the constellation the Moon occupies at a given time.
            There are 27 Nakshatras, each spanning 13 degrees 20 minutes of the zodiac. Each
            Nakshatra is further divided into 4 Padas (quarters).
          </p>

          <div className="rounded-2xl border-0 bg-card p-6 shadow-lg">
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
            Check Today&apos;s Nakshatra for Your City
          </h2>
          <p className="text-sm text-muted-foreground">
            Select your city to view today&apos;s Nakshatra, Pada, Lord, and Deity details.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {allCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/todays-nakshatra/${today}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {city.name}
              </Link>
            ))}
          </div>

          <FaqSection faqs={NAKSHATRA_FAQS} />
        </div>
      </div>
    </>
  );
}
