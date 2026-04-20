import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SITE_CONFIG, NETWORK_LINKS } from "@/lib/constants";
import { buildAboutPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Panchang by VastuCart — Methodology, Sources, Team",
  description:
    "How VastuCart computes daily Panchang for 200+ Indian cities. Our methodology (Drik Ganita), astronomical sources, data freshness commitment, and the team behind the service.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: "About VastuCart Panchang",
    description: "Methodology, sources, and the team behind accurate Vedic Panchang for 200+ Indian cities.",
    url: `${SITE_CONFIG.url}/about`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About VastuCart Panchang",
    description: "Methodology, sources, and the team behind accurate Vedic Panchang.",
  },
};

export default function AboutPage() {
  const schema = buildAboutPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <section
        className="py-14 sm:py-20"
        style={{
          background:
            "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Sparkles className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl heading-display">
            About VastuCart Panchang
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-lg text-white/70 sm:text-xl">
            Accurate Vedic Panchang for every Indian city, updated daily.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 prose prose-slate">
        <h2 className="text-2xl font-bold text-[var(--color-vedic)]">Our Mission</h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          VastuCart Panchang publishes accurate daily Panchang data for more
          than 200 Indian cities so that every ritual, vrat, and life decision
          can be planned against the correct sunrise-anchored timings for the
          reader&rsquo;s own location. Unlike generic national calendars,
          we calculate sunrise, sunset, Tithi, Nakshatra, Yoga, Karana,
          Rahu Kaal, and Choghadiya individually per city — because the
          same date&rsquo;s Tithi can differ by minutes between eastern and
          western India.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-[var(--color-vedic)]">
          Methodology
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Our Panchang engine uses the <strong>Drik Ganita</strong> system —
          the observational, real-sky astronomical approach endorsed by
          modern Vedic panchangs and aligned with how ISRO computes
          ephemerides. We do not use the older Vakya (tabular) method,
          which can drift several minutes from the observed sky in the
          current astronomical era.
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          For each city, we compute:
        </p>
        <ul className="mt-3 list-disc pl-6 text-base leading-relaxed text-foreground">
          <li>
            <strong>Sunrise and sunset</strong> using the city&rsquo;s
            latitude, longitude, elevation, and timezone on the requested
            date.
          </li>
          <li>
            <strong>Tithi</strong> from the angular difference between the
            true geocentric positions of the Sun and the Moon (12 degrees per
            Tithi).
          </li>
          <li>
            <strong>Nakshatra</strong> from the Moon&rsquo;s sidereal
            longitude, using Lahiri Ayanamsa (the standard ayanamsa for
            Indian government panchangs and the Rashtriya Panchang).
          </li>
          <li>
            <strong>Yoga and Karana</strong> derived from the combined
            Sun-Moon longitudes and half-Tithi positions.
          </li>
          <li>
            <strong>Rahu Kaal, Yamaganda, Gulika Kaal</strong> as
            day-duration fractions from sunrise to sunset by weekday.
          </li>
          <li>
            <strong>Choghadiya</strong> (eight 90-minute periods) classified
            as Amrit, Shubh, Labh, Char, Rog, Kaal, or Udveg per weekday.
          </li>
          <li>
            <strong>Abhijit Muhurta and Brahma Muhurta</strong> anchored to
            solar noon and pre-sunrise respectively.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-[var(--color-vedic)]">
          Data Freshness
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Every city&rsquo;s Panchang for today is recomputed at local
          sunrise and cached for the day. Past-date URLs are immutable
          (historical Panchang doesn&rsquo;t change), and future-date URLs
          refresh as the target date approaches. Festival and vrat dates
          are verified against authoritative almanacs before each year&rsquo;s
          calendar is published.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-[var(--color-vedic)]">
          The VastuCart Network
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          VastuCart Panchang is one of ten specialised services in the
          VastuCart ecosystem — the others include{" "}
          <a
            href={NETWORK_LINKS.kundali}
            className="text-[var(--color-saffron)] hover:underline"
          >
            Kundali Decoded
          </a>
          ,{" "}
          <a
            href={NETWORK_LINKS.horoscope}
            className="text-[var(--color-saffron)] hover:underline"
          >
            Divine Path horoscopes
          </a>
          ,{" "}
          <a
            href={NETWORK_LINKS.muhurta}
            className="text-[var(--color-saffron)] hover:underline"
          >
            Shubh Muhurta
          </a>
          ,{" "}
          <a
            href={NETWORK_LINKS.stotra}
            className="text-[var(--color-saffron)] hover:underline"
          >
            Stotra library
          </a>
          , and the{" "}
          <a
            href={NETWORK_LINKS.blog}
            className="text-[var(--color-saffron)] hover:underline"
          >
            editorial blog
          </a>
          . All services share a unified entity graph so a Nakshatra
          mentioned on the Panchang links to its detailed profile on the
          horoscope site, the relevant stotra, and the Jyotish blog
          article about its significance.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-[var(--color-vedic)]">
          Accuracy Commitment
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          If you find a Panchang value that looks incorrect for your city
          and date, tell us — corrections ship within 24 hours and we
          backfill the history. All Panchang data here is free, always
          will be, and has no ads inside the main content block. Our
          business model is the VastuCart product ecosystem around it
          (astrology consultations, wedding muhurta services, gemstones,
          and rudraksha), not ad impressions on Panchang pages.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-[var(--color-vedic)]">
          Contact
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          For corrections, feature requests, or media inquiries, visit our{" "}
          <Link
            href="/contact"
            className="text-[var(--color-saffron)] hover:underline"
          >
            contact page
          </Link>
          . For deep Vedic astrology consultation, the{" "}
          <a
            href={NETWORK_LINKS.kundali}
            className="text-[var(--color-saffron)] hover:underline"
          >
            Kundali Decoded
          </a>{" "}
          team handles bookings.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5">
            <ShieldCheck className="h-6 w-6 text-[var(--color-saffron)]" />
            <h3 className="mt-3 text-sm font-bold text-foreground">
              Drik Ganita
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Observational real-sky method aligned with modern Vedic
              panchangs.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <MapPin className="h-6 w-6 text-[var(--color-saffron)]" />
            <h3 className="mt-3 text-sm font-bold text-foreground">
              200+ Cities
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Each with unique lat, lng, and timezone for accurate sunrise
              anchoring.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <Users className="h-6 w-6 text-[var(--color-saffron)]" />
            <h3 className="mt-3 text-sm font-bold text-foreground">
              Free, No Ads
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Panchang pages carry no in-content ads. Always will be free.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #013f47, #004D40)",
            }}
          >
            See today&rsquo;s Panchang
          </Link>
          <Link
            href="/what-is-panchang"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            <BookOpen className="mr-1.5 inline h-4 w-4" />
            What is Panchang?
          </Link>
        </div>
      </article>
    </>
  );
}
