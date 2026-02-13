import type { Metadata } from "next";
import { Sunrise, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { SUNRISE_SUNSET_FAQS } from "@/lib/faqs";
import { getAllCities } from "@/lib/cities";
import { getTodayISO } from "@/lib/format";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sunrise & Sunset Today - Accurate Timings for All Indian Cities",
  description:
    "Check today's sunrise and sunset times for your city. Accurate timings with day duration, Brahma Muhurta, and Abhijit Muhurta for 200+ Indian cities.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/sunrise-sunset-today`,
  },
  openGraph: {
    title: "Sunrise & Sunset Today | VastuCart Panchang",
    description:
      "Accurate daily sunrise and sunset timings for 200+ Indian cities.",
    url: `${SITE_CONFIG.url}/sunrise-sunset-today`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [{ url: `${SITE_CONFIG.url}/images/vastucart-logo.png`, width: 512, height: 512, alt: "VastuCart Panchang" }],
  },
  twitter: {
    card: "summary",
    title: "Sunrise & Sunset Today | VastuCart Panchang",
    description: "Accurate daily sunrise and sunset timings for 200+ Indian cities.",
    images: [`${SITE_CONFIG.url}/images/vastucart-logo.png`],
  },
};

export default function SunriseSunsetPage() {
  const allCities = getAllCities();
  const today = getTodayISO();
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Sunrise & Sunset Today", url: `${SITE_CONFIG.url}/sunrise-sunset-today` },
        ]}
        faqs={SUNRISE_SUNSET_FAQS}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Sunrise className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Sunrise &amp; Sunset Today
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Accurate sun timings for your city
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="prose prose-neutral max-w-none space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Sunrise and sunset times are the foundation of the Vedic day. All Panchang elements —
            Rahu Kaal, Choghadiya, Hora, Brahma Muhurta, and Abhijit Muhurta — are calculated
            from the exact sunrise and sunset times for your location.
          </p>

          <div className="rounded-2xl border-0 bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[var(--color-vedic)]" />
              <h2 className="text-xl font-bold text-[var(--color-vedic)]">
                Why Sunrise Times Matter
              </h2>
            </div>
            <p className="text-muted-foreground">
              In Vedic tradition, the day begins at sunrise, not midnight. Sunrise marks the start
              of the first Hora and first Choghadiya period. Brahma Muhurta, the most sacred time
              for meditation, occurs approximately 96 minutes before sunrise. Accurate sunrise
              times ensure all other Panchang calculations are precise for your city.
            </p>
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            Key Sun Timings
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li><strong>Brahma Muhurta</strong> — 96 minutes before sunrise, ideal for meditation</li>
            <li><strong>Sunrise</strong> — Start of the Vedic day and Panchang calculations</li>
            <li><strong>Abhijit Muhurta</strong> — 48 minutes around solar noon, universally auspicious</li>
            <li><strong>Sunset</strong> — End of daytime, start of nighttime periods</li>
            <li><strong>Dinamana</strong> — Total daylight hours from sunrise to sunset</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            Check Sunrise &amp; Sunset for Your City
          </h2>
          <p className="text-sm text-muted-foreground">
            Select your city to view today&apos;s sunrise, sunset, and key sun timings.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {allCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/sunrise-sunset/${today}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {city.name}
              </Link>
            ))}
          </div>

          <FaqSection faqs={SUNRISE_SUNSET_FAQS} />
        </div>
      </div>
    </>
  );
}
