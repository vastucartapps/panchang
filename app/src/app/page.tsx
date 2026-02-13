import type { Metadata } from "next";
import { fetchPanchang } from "@/lib/api";
import { DEFAULT_LOCATION, SITE_CONFIG, NETWORK_LINKS } from "@/lib/constants";
import { getTodayISO, formatDate } from "@/lib/format";
import { getNatureStyle, getScoreLabel } from "@/lib/constants";
import { NetworkHeader } from "@/components/layout/network-header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  ArrowRight,
  Sunrise,
  Sunset,
  ShieldAlert,
  ShieldCheck,
  Star,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { HeroActions } from "@/components/hero/hero-actions";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const today = getTodayISO();
  const ogImage = `${SITE_CONFIG.url}/api/og/${DEFAULT_LOCATION.slug}/${today}`;

  return {
    title: "Panchang Today | Accurate Vedic Calendar for India | VastuCart",
    description:
      "Today's Panchang — Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Choghadiya timings for 200+ Indian cities. Free accurate Vedic calendar updated daily.",
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    openGraph: {
      title: "Panchang Today | Accurate Vedic Calendar | VastuCart",
      description:
        "Today's Panchang with Tithi, Nakshatra, Rahu Kaal, Choghadiya for 200+ Indian cities. Updated daily.",
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Today's Panchang — VastuCart",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Panchang Today | Accurate Vedic Calendar | VastuCart",
      description:
        "Today's Panchang with Tithi, Nakshatra, Rahu Kaal, Choghadiya for 200+ Indian cities.",
      images: [ogImage],
    },
  };
}

export default async function HomePage() {
  const city = DEFAULT_LOCATION;
  const targetDate = getTodayISO();
  const today = formatDate(targetDate);

  let data;
  try {
    data = await fetchPanchang({
      targetDate,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
  } catch {
    return (
      <div className="flex min-h-screen flex-col">
        <NetworkHeader />
        <main className="flex-1">
          <div className="mx-auto px-4 py-16 text-center" style={{ maxWidth: "92%" }}>
            <h1 className="mb-4 text-2xl font-bold text-[var(--color-vedic)]">
              Unable to Load Panchang
            </h1>
            <p className="text-muted-foreground">Please try again shortly.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const scoreLabel = getScoreLabel(data.day_quality.score);
  const scoreStyle = getNatureStyle(scoreLabel.toLowerCase());
  const tithiStyle = getNatureStyle(data.panchang.tithi.nature);
  const nakshatraStyle = getNatureStyle(data.panchang.nakshatra.nature);

  return (
    <div className="flex min-h-screen flex-col">
      <NetworkHeader />
      <main className="flex-1 overflow-hidden">
        <JsonLd
          city={city.name}
          breadcrumbs={[{ name: "Home", url: SITE_CONFIG.url }]}
        />

        {/* Hero Banner */}
        <section
          className="py-14 sm:py-20"
          style={{ background: "linear-gradient(165deg, #003636 0%, #004D40 40%, #1B3A2D 70%, #2C1810 100%)" }}
        >
          <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "92%" }}>
            <div className="flex flex-col items-center text-center">
              <h1 className="animate-fade-in-up heading-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Today&apos;s Panchang
              </h1>
              <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
              <p className="animate-fade-in-up-delay mt-4 text-lg tracking-wide text-white/60">
                {today} &middot; {city.name}, {city.state}
              </p>
              <HeroActions citySlug={city.slug} cityName={city.name} />
            </div>
          </div>
        </section>

        {/* At-a-Glance Strip */}
        <section className="mx-auto px-4 pt-10 pb-4 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Day Score — hero card */}
            <div
              className="relative overflow-hidden rounded-3xl p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:col-span-2 lg:col-span-1"
              style={{ background: "linear-gradient(135deg, #003636 0%, #003636 60%, rgba(196,151,59,0.12) 100%)" }}
            >
              <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.04]">
                <Star className="h-24 w-24 text-white" />
              </div>
              <div className="relative flex flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">Today&apos;s Vibe</p>
                <div className="mt-2 h-px w-10 bg-gradient-to-r from-[#C4973B]/60 to-transparent" />
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-6xl font-bold tracking-tight text-white">{Math.round(data.day_quality.score)}</span>
                  <span className="text-lg text-white/40">/100</span>
                </div>
                <span className={`mt-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-bold ${scoreStyle.bg} ${scoreStyle.text}`}>
                  {scoreLabel} Day
                </span>
              </div>
            </div>

            {/* Tithi */}
            <div
              className="relative overflow-hidden rounded-3xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7"
              style={{ background: "linear-gradient(135deg, #003636 0%, #003636 60%, rgba(196,151,59,0.08) 100%)" }}
            >
              <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.04]">
                <Moon className="h-24 w-24 text-white" />
              </div>
              <div className="relative flex flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">Tithi</p>
                <div className="mt-2 h-px w-10 bg-gradient-to-r from-[#C4973B]/60 to-transparent" />
                <p className="mt-4 text-2xl font-bold tracking-tight text-white">
                  {data.panchang.tithi.tithi.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                </p>
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs text-white/80">
                    <span className="text-white/40">Paksha:</span> {data.panchang.tithi.paksha}
                  </p>
                  <p className="text-xs text-white/80">
                    <span className="text-white/40">Deity:</span> {data.panchang.tithi.deity}
                  </p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tithiStyle.bg} ${tithiStyle.text}`}>
                    {data.panchang.tithi.nature}
                  </span>
                </div>
              </div>
            </div>

            {/* Nakshatra */}
            <div
              className="relative overflow-hidden rounded-3xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7"
              style={{ background: "linear-gradient(135deg, #003636 0%, #003636 60%, rgba(34,197,94,0.08) 100%)" }}
            >
              <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.04]">
                <Sparkles className="h-24 w-24 text-white" />
              </div>
              <div className="relative flex flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">Nakshatra</p>
                <div className="mt-2 h-px w-10 bg-gradient-to-r from-[#C4973B]/60 to-transparent" />
                <p className="mt-4 text-2xl font-bold tracking-tight text-white">
                  {data.panchang.nakshatra.nakshatra.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                </p>
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs text-white/80">
                    <span className="text-white/40">Deity:</span> {data.panchang.nakshatra.deity}
                  </p>
                  <p className="text-xs text-white/80">
                    <span className="text-white/40">Lord:</span> {data.panchang.nakshatra.lord}
                  </p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${nakshatraStyle.bg} ${nakshatraStyle.text}`}>
                    {nakshatraStyle.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Sun */}
            <div
              className="relative overflow-hidden rounded-3xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7"
              style={{ background: "linear-gradient(135deg, #003636 0%, #003636 60%, rgba(227,100,20,0.08) 100%)" }}
            >
              <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.04]">
                <Sun className="h-24 w-24 text-white" />
              </div>
              <div className="relative flex flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">Sun Today</p>
                <div className="mt-2 h-px w-10 bg-gradient-to-r from-[#C4973B]/60 to-transparent" />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-1 items-center gap-2.5">
                    <Sunrise className="h-5 w-5 shrink-0 text-amber-400" />
                    <div>
                      <p className="text-2xl font-bold tracking-tight text-white">{data.timing.sunrise}</p>
                      <p className="text-[10px] font-medium tracking-wider text-white/40">SUNRISE</p>
                    </div>
                  </div>
                  <div className="mx-3 h-10 w-px bg-white/10" />
                  <div className="flex flex-1 items-center gap-2.5">
                    <Sunset className="h-5 w-5 shrink-0 text-rose-400" />
                    <div>
                      <p className="text-2xl font-bold tracking-tight text-white">{data.timing.sunset}</p>
                      <p className="text-[10px] font-medium tracking-wider text-white/40">SUNSET</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avoid These Times */}
        <section className="mx-auto px-4 pt-6 pb-3 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="overflow-hidden rounded-3xl border border-white/[0.06] shadow-lg">
            <div
              className="flex items-center gap-3 px-5 py-3.5 sm:px-6"
              style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)" }}
            >
              <ShieldAlert className="h-5 w-5 shrink-0 text-white" />
              <h2 className="text-sm font-bold text-white sm:text-base">Avoid These Times</h2>
            </div>
            <div
              className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-3 sm:gap-4 sm:p-4"
              style={{ backgroundColor: "#fef2f2" }}
            >
              {[
                { label: "Rahu Kalam", start: data.timing.rahu_kalam.start_time, end: data.timing.rahu_kalam.end_time },
                { label: "Yamagandam", start: data.timing.yamagandam.start_time, end: data.timing.yamagandam.end_time },
                { label: "Gulika Kalam", start: data.timing.gulika_kalam.start_time, end: data.timing.gulika_kalam.end_time },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] p-4 sm:p-5"
                  style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)" }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 sm:text-xs">{t.label}</p>
                  <div className="mt-2 h-px w-10 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                  <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{t.start} – {t.end}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Times Today */}
        <section className="mx-auto px-4 pt-3 pb-6 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="overflow-hidden rounded-3xl border border-white/[0.06] shadow-lg">
            <div
              className="flex items-center gap-3 px-5 py-3.5 sm:px-6"
              style={{ background: "linear-gradient(135deg, #14532d, #0A3D1F)" }}
            >
              <ShieldCheck className="h-5 w-5 shrink-0 text-white" />
              <h2 className="text-sm font-bold text-white sm:text-base">Best Times Today</h2>
            </div>
            <div
              className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4"
              style={{ backgroundColor: "#f0fdf4" }}
            >
              {[
                ...(data.timing.abhijit_muhurta ? [{ label: "Abhijit Muhurta", start: data.timing.abhijit_muhurta.start_time, end: data.timing.abhijit_muhurta.end_time }] : []),
                { label: "Brahma Muhurta", start: data.timing.brahma_muhurta.start_time, end: data.timing.brahma_muhurta.end_time },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] p-4 sm:p-5"
                  style={{ background: "linear-gradient(135deg, #14532d, #0A3D1F)" }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 sm:text-xs">{t.label}</p>
                  <div className="mt-2 h-px w-10 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                  <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{t.start} – {t.end}</p>
                </div>
              ))}
            </div>
            <div className="p-3 sm:p-4" style={{ backgroundColor: "#f0fdf4" }}>
              <Link
                href={`/${city.slug}`}
                className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #003636, #004D40)" }}
              >
                See All Timings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Discover More */}
        <section className="mx-auto px-4 pt-8 pb-12 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[var(--color-vedic)] heading-display">
              Discover More
            </h2>
            <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-[#C4973B] to-transparent" />
            <p className="mt-3 text-sm text-[var(--color-foreground)]/50">
              Your spiritual toolkit, all in one place
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {[
              {
                title: "Your Kundali",
                tagline: "Know your stars",
                desc: "Free personalized birth chart, instantly.",
                href: NETWORK_LINKS.kundali,
                gradient: "linear-gradient(135deg, #003636 0%, #003636 60%, rgba(196,151,59,0.15) 100%)",
              },
              {
                title: "Sacred Stotras",
                tagline: "Daily devotion",
                desc: "Powerful mantras and chalisas for every day.",
                href: NETWORK_LINKS.stotra,
                gradient: "linear-gradient(135deg, #8B1A1A 0%, #8B1A1A 60%, rgba(196,151,59,0.12) 100%)",
              },
              {
                title: "Find Muhurta",
                tagline: "Perfect timing",
                desc: "Pick the most auspicious date for anything.",
                href: NETWORK_LINKS.muhurta,
                gradient: "linear-gradient(135deg, #14532d 0%, #14532d 60%, rgba(196,151,59,0.12) 100%)",
              },
              {
                title: "VastuCart Store",
                tagline: "Shop spiritual",
                desc: "Authentic Vastu remedies and essentials.",
                href: NETWORK_LINKS.store,
                gradient: "linear-gradient(135deg, #92400e 0%, #92400e 60%, rgba(196,151,59,0.12) 100%)",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-white/[0.06] p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-6"
                style={{ background: item.gradient }}
              >
                <div className="relative">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 sm:text-[10px]">{item.tagline}</p>
                  <h3 className="mt-1 text-base font-bold text-white sm:text-xl">{item.title}</h3>
                  <div className="mt-2 h-px w-8 bg-gradient-to-r from-[#C4973B]/40 to-transparent" />
                  <p className="mt-2 hidden text-sm leading-relaxed text-white/70 sm:block">{item.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 sm:mt-4 sm:text-xs">
                    Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
