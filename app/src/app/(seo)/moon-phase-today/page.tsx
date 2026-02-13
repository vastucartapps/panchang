import type { Metadata } from "next";
import { Moon, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { MOON_PHASE_FAQS } from "@/lib/faqs";
import { getAllCities } from "@/lib/cities";
import { getTodayISO } from "@/lib/format";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Moon Phase Today - Current Lunar Phase, Illumination & Paksha",
  description:
    "Today's Moon phase with illumination percentage, Paksha (waxing/waning), and phase name. Visual moon tracker for Vedic calendar and astronomy enthusiasts.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/moon-phase-today`,
  },
  openGraph: {
    title: "Moon Phase Today | VastuCart Panchang",
    description:
      "See today's Moon phase, illumination, and Paksha. Beautiful visual moon tracker updated daily.",
    url: `${SITE_CONFIG.url}/moon-phase-today`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function MoonPhasePage() {
  const allCities = getAllCities();
  const today = getTodayISO();
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Moon Phase Today", url: `${SITE_CONFIG.url}/moon-phase-today` },
        ]}
        faqs={MOON_PHASE_FAQS}
      />

      {/* Hero bar */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            Moon Phase Today
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Current lunar phase, illumination &amp; Paksha
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="prose prose-neutral max-w-none space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            The Moon&apos;s phase determines many aspects of the Hindu calendar, from festival
            dates to auspicious timings. The lunar cycle of approximately 29.5 days is divided
            into Shukla Paksha (bright/waxing half) and Krishna Paksha (dark/waning half).
          </p>

          <div className="rounded-2xl border-0 bg-card p-6 shadow-lg">
            <h2 className="text-xl font-bold text-[var(--color-vedic)]">
              Lunar Phases Explained
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold text-foreground">New Moon (Amavasya)</p>
                <p className="text-sm text-muted-foreground">0% illumination. Sacred for ancestral rites (Pitru Tarpan).</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold text-foreground">Waxing Crescent</p>
                <p className="text-sm text-muted-foreground">1-49% illumination. Favorable for new beginnings.</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold text-foreground">First Quarter</p>
                <p className="text-sm text-muted-foreground">~50% illumination. Good for taking action on plans.</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold text-foreground">Full Moon (Purnima)</p>
                <p className="text-sm text-muted-foreground">100% illumination. Most auspicious for worship and celebrations.</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            Significance in Vedic Tradition
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>Purnima (Full Moon) is observed for Satyanarayan Puja and Guru worship</li>
            <li>Amavasya (New Moon) is dedicated to ancestral offerings</li>
            <li>Ekadashi fasting is observed during both waxing and waning phases</li>
            <li>The Moon&apos;s phase affects Tithi and overall Panchang calculations</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-vedic)]">
            View Moon Phase for Your City
          </h2>
          <p className="text-sm text-muted-foreground">
            Select your city to view today&apos;s moon phase, illumination, and Paksha details.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {allCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/moon-phase-today/${today}`}
                className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
              >
                <MapPin className="h-3 w-3 text-[var(--color-saffron)]" />
                {city.name}
              </Link>
            ))}
          </div>

          <FaqSection faqs={MOON_PHASE_FAQS} />
        </div>
      </div>
    </>
  );
}
