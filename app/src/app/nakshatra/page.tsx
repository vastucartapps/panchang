import Link from "next/link";
import type { Metadata } from "next";
import { Star, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllNakshatras } from "@/data/nakshatras";
import { buildNakshatraHubGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The 27 Nakshatras — Complete List with Lord, Deity, Pada",
  description:
    "All 27 Nakshatras of Vedic astrology with ruling planet, presiding deity, symbol, Gana, and key characteristics. Click any for a detailed guide.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/nakshatra`,
  },
  openGraph: {
    title: "The 27 Nakshatras — Vedic Lunar Mansions",
    description: "Complete list of 27 Nakshatras with deity, lord, and characteristics.",
    url: `${SITE_CONFIG.url}/nakshatra`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function NakshatraHubPage() {
  const nakshatras = getAllNakshatras();
  const graph = buildNakshatraHubGraph(nakshatras);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
        }}
      />
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "27 Nakshatras", url: `${SITE_CONFIG.url}/nakshatra` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Star className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            The 27 Nakshatras
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            The lunar mansions of Vedic astrology — complete guide
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-base leading-relaxed text-foreground">
          The Nakshatras are 27 equal segments of the ecliptic — each 13°20&apos;
          wide — through which the Moon travels on its ~27.3-day journey
          around Earth. Each Nakshatra has a presiding deity, a ruling planet
          (Dasha lord), a Gana classification (Deva, Manushya, Rakshasa), and
          a characteristic nature that colors the quality of any time the
          Moon spends there. Click any Nakshatra below for the complete
          guide:
        </p>

        <Link
          href="/what-is-nakshatra"
          className="mt-5 inline-block text-sm text-[var(--color-saffron)] hover:underline"
        >
          New to Nakshatras? Start with our complete explainer →
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nakshatras.map((n) => (
            <Link
              key={n.slug}
              href={`/nakshatra/${n.slug}`}
              prefetch={false}
              className="group rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  #{n.number}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: ganaColor(n.gana) }}>
                  {n.gana}
                </span>
              </div>
              <p className="mt-2 text-lg font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                {n.name}
              </p>
              <p className="mt-0.5 text-sm text-[#C4973B]">{n.devanagari}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-semibold">Lord:</span> {n.lord}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="font-semibold">Symbol:</span> {n.symbol}
              </p>
              <p className="mt-3 text-xs text-[var(--color-saffron)] opacity-0 group-hover:opacity-100 transition-opacity">
                Read full guide <ArrowRight className="inline h-3 w-3" />
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border bg-muted/30 p-6">
          <h2 className="text-base font-bold text-foreground">
            Related reading
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/what-is-nakshatra" className="text-[var(--color-saffron)] hover:underline">
                What is a Nakshatra? — complete concept guide
              </Link>
            </li>
            <li>
              <Link href="/what-is-panchang" className="text-[var(--color-saffron)] hover:underline">
                What is Panchang? — the Vedic calendar system
              </Link>
            </li>
            <li>
              <Link href="/todays-nakshatra" className="text-[var(--color-saffron)] hover:underline">
                Today&apos;s Nakshatra in your city
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function ganaColor(gana: "Deva" | "Manushya" | "Rakshasa"): string {
  switch (gana) {
    case "Deva":
      return "#16a34a";
    case "Manushya":
      return "#C4973B";
    case "Rakshasa":
      return "#dc2626";
  }
}
