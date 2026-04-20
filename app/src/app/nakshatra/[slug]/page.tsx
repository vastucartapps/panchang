import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Star, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAllNakshatras,
  getNakshatraBySlug,
} from "@/data/nakshatras";
import { buildNakshatraPageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNakshatras().map((n) => ({ slug: n.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const n = getNakshatraBySlug(slug);
  if (!n) return {};

  return {
    title: `${n.name} Nakshatra (${n.devanagari}) — Meaning, Deity, Pada & Characteristics`,
    description: `${n.name} Nakshatra complete guide — ${n.lord}-ruled, presided by ${n.deity}. Symbol: ${n.symbol}. Gana: ${n.gana}. Full details on padas, activity type, shakti, and Jyotish significance.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/nakshatra/${n.slug}`,
    },
    openGraph: {
      title: `${n.name} Nakshatra — Complete Vedic Guide`,
      description: `Ruled by ${n.lord}, presided by ${n.deity}. Symbol: ${n.symbol}.`,
      url: `${SITE_CONFIG.url}/nakshatra/${n.slug}`,
      siteName: SITE_CONFIG.name,
      type: "article",
    },
  };
}

export default async function NakshatraDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const n = getNakshatraBySlug(slug);
  if (!n) notFound();

  const all = getAllNakshatras();
  const prev = all[n.number - 2] ?? all[all.length - 1];
  const next = all[n.number] ?? all[0];
  const graph = buildNakshatraPageGraph(n);

  return (
    <>
      {graph && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <JsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "27 Nakshatras", url: `${SITE_CONFIG.url}/nakshatra` },
          { name: n.name, url: `${SITE_CONFIG.url}/nakshatra/${n.slug}` },
        ]}
      />

      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(165deg, #013f47 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Star className="mx-auto h-10 w-10 text-[#C4973B]" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Nakshatra {n.number} of 27
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl lg:text-6xl heading-display">
            {n.name}
          </h1>
          <p className="mt-2 text-2xl text-[#C4973B]">{n.devanagari}</p>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Ruled by <strong className="text-white">{n.lord}</strong> · Presided by{" "}
            <strong className="text-white">{n.deity.split(" ")[0]}</strong>
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 prose prose-neutral">
        <section className="rounded-3xl border bg-card p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground text-center">
            Quick reference
          </p>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
            <Fact label="Number" value={`${n.number} / 27`} />
            <Fact label="Degrees" value={`${formatDegrees(n.degreesStart)} – ${formatDegrees(n.degreesEnd)}`} />
            <Fact label="Rashi" value={n.rashis.join(" + ")} />
            <Fact label="Lord (Dasha)" value={n.lord} />
            <Fact label="Deity" value={n.deity} />
            <Fact label="Symbol" value={n.symbol} />
            <Fact label="Gana" value={n.gana} />
            <Fact label="Activity" value={n.activity} />
            <Fact label="Nature" value={n.nature} />
          </div>
        </section>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          About {n.name} Nakshatra
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          {n.body}
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Shakti ({n.name}&apos;s innate power)
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          {n.shakti}
        </p>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Four Padas of {n.name}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Each Nakshatra divides into four padas (quarters) of 3°20&apos; each.
          Each pada falls in a specific navamsa rashi that further colors the
          energy:
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {n.padas.map((rashi, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Pada {i + 1}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">{rashi}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">navamsa</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-green-200 bg-green-50/30 p-5">
            <h2 className="text-base font-bold text-green-800">Favorable activities</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground">
              {n.favorable.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-red-200 bg-red-50/30 p-5">
            <h2 className="text-base font-bold text-red-800">Activities to avoid</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground">
              {n.avoid.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        </div>

        <h2 className="mt-10 text-xl font-bold text-[var(--color-vedic)]">
          Role in Jyotish (Vedic astrology)
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          If {n.name} is your <strong>Janma Nakshatra</strong> (the Nakshatra
          the Moon occupied at your birth), it shapes your emotional
          architecture, personality tendencies, and the unfolding of your{" "}
          <strong>Vimshottari Dasha</strong> — the 120-year planetary period
          cycle. The first Dasha of your life will be ruled by {n.lord}, the
          lord of {n.name}, with the balance determined by how far into the
          Nakshatra the Moon had travelled at your birth moment.
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          In daily activity-selection (muhurta), the Moon&apos;s transit
          through {n.name} flavors the quality of that time for activities.
          Check{" "}
          <Link href="/todays-nakshatra" className="text-[var(--color-saffron)] hover:underline">
            today&apos;s Nakshatra for your city
          </Link>{" "}
          — if it is {n.name}, the activity patterns described above apply.
        </p>

        <nav className="mt-12 flex items-center justify-between border-t pt-6">
          <Link
            href={`/nakshatra/${prev.slug}`}
            prefetch={false}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--color-saffron)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>
              <span className="block text-[10px] uppercase tracking-wider">Previous</span>
              <span className="font-bold">{prev.name}</span>
            </span>
          </Link>
          <Link
            href={`/nakshatra/${next.slug}`}
            prefetch={false}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--color-saffron)]"
          >
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-wider">Next</span>
              <span className="font-bold">{next.name}</span>
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/nakshatra"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #013f47, #004D40)" }}
          >
            All 27 Nakshatras
            <BookOpen className="ml-1.5 inline h-4 w-4" />
          </Link>
          <Link
            href="/what-is-nakshatra"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            What is a Nakshatra?
          </Link>
          <Link
            href="/todays-nakshatra"
            className="rounded-full border border-[var(--color-saffron)]/40 px-5 py-2.5 text-sm font-bold text-[var(--color-saffron)] transition-all hover:bg-[var(--color-saffron)]/5"
          >
            Today&apos;s Nakshatra
          </Link>
        </div>
      </article>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}

function formatDegrees(deg: number): string {
  const whole = Math.floor(deg);
  const minutes = Math.round((deg - whole) * 60);
  return `${whole}°${String(minutes).padStart(2, "0")}'`;
}
