import Link from "next/link";
import type { Metadata } from "next";
import { Moon, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllTithis } from "@/data/tithis";
import { buildTithiHubGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The 16 Tithis of the Hindu Panchang — Complete List & Guide",
  description:
    "All 16 canonical Tithi names — 14 appear in both Shukla and Krishna pakshas, plus Purnima and Amavasya. Category, deity, and major observances per Tithi.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/tithi`,
  },
  openGraph: {
    title: "The 16 Tithis of the Hindu Panchang",
    description: "Complete list of 16 Tithi names with category, deity, and festivals.",
    url: `${SITE_CONFIG.url}/tithi`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function TithiHubPage() {
  const tithis = getAllTithis();
  const graph = buildTithiHubGraph(tithis);

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
          { name: "16 Tithis", url: `${SITE_CONFIG.url}/tithi` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Moon className="mx-auto h-10 w-10 text-[#C4973B]" />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl heading-display">
            The 16 Tithis
          </h1>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Every canonical Tithi of the Hindu calendar — with category, deity, and festivals
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-base leading-relaxed text-foreground">
          There are 30 Tithis in every Hindu lunar month — 15 in Shukla Paksha
          (waxing fortnight, ending at Purnima) and 15 in Krishna Paksha
          (waning fortnight, ending at Amavasya). Of these, 14 Tithis share
          the same name in both pakshas (Pratipada through Chaturdashi), plus
          2 unique names — Purnima (the 15th of Shukla, full moon) and
          Amavasya (the 15th of Krishna, new moon). That gives 16 canonical
          Tithi names — each with its own category, presiding deities (often
          different per paksha), and religious observances. Click any for a
          complete guide:
        </p>

        <Link
          href="/what-is-tithi"
          className="mt-5 inline-block text-sm text-[var(--color-saffron)] hover:underline"
        >
          New to Tithis? Start with our complete explainer →
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tithis.map((t) => (
            <Link
              key={t.slug}
              href={`/tithi/${t.slug}`}
              prefetch={false}
              className="group rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Tithi #{t.number}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: categoryColor(t.category) }}>
                  {t.category}
                </span>
              </div>
              <p className="mt-2 text-lg font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                {t.name}
              </p>
              <p className="mt-0.5 text-sm text-[#C4973B]">{t.devanagari}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-semibold">Shukla deity:</span> {t.shuklaDeity.split(" / ")[0]}
              </p>
              {t.krishnaDeity !== "N/A (only Shukla Paksha has Purnima; Krishna ends at Amavasya)" &&
               t.krishnaDeity !== "Not applicable (Krishna Paksha ends at Amavasya)" && (
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-semibold">Krishna deity:</span> {t.krishnaDeity.split(" / ")[0].split(" (")[0]}
                </p>
              )}
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
              <Link href="/what-is-tithi" className="text-[var(--color-saffron)] hover:underline">
                What is a Tithi? — complete concept guide
              </Link>
            </li>
            <li>
              <Link href="/what-is-panchang" className="text-[var(--color-saffron)] hover:underline">
                What is Panchang? — the Vedic calendar system
              </Link>
            </li>
            <li>
              <Link href="/todays-tithi" className="text-[var(--color-saffron)] hover:underline">
                Today&apos;s Tithi in your city
              </Link>
            </li>
            <li>
              <Link href="/nakshatra" className="text-[var(--color-saffron)] hover:underline">
                The 27 Nakshatras — lunar mansions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function categoryColor(category: "Nanda" | "Bhadra" | "Jaya" | "Rikta" | "Purna"): string {
  switch (category) {
    case "Nanda":
      return "#f59e0b"; // amber — joy
    case "Bhadra":
      return "#16a34a"; // green — welfare
    case "Jaya":
      return "#7c3aed"; // purple — victory
    case "Rikta":
      return "#dc2626"; // red — empty/avoided
    case "Purna":
      return "#0f766e"; // teal — fulfillment
  }
}
