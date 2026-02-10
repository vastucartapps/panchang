import type { Metadata } from "next";
import { Moon, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { MOON_PHASE_FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";

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

const POPULAR_CITIES = [
  { name: "New Delhi", slug: "new-delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
];

export default function MoonPhasePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Moon Phase Today", url: `${SITE_CONFIG.url}/moon-phase-today` },
        ]}
        faqs={MOON_PHASE_FAQS}
      />

      <div className="mb-8 flex items-center gap-3">
        <Moon className="h-8 w-8 text-[var(--color-brand-gold-end)]" />
        <h1 className="text-3xl font-bold text-[var(--color-vedic)]">
          Moon Phase Today
        </h1>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          The Moon&apos;s phase determines many aspects of the Hindu calendar, from festival
          dates to auspicious timings. The lunar cycle of approximately 29.5 days is divided
          into Shukla Paksha (bright/waxing half) and Krishna Paksha (dark/waning half).
        </p>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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

        <FaqSection faqs={MOON_PHASE_FAQS} />
      </div>
    </div>
  );
}
