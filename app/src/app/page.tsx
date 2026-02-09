import { fetchPanchang } from "@/lib/api";
import { DEFAULT_LOCATION, SITE_CONFIG, NETWORK_LINKS } from "@/lib/constants";
import { getTodayISO, formatDate } from "@/lib/format";
import { getNatureStyle, getScoreLabel } from "@/lib/constants";
import { NetworkHeader } from "@/components/layout/network-header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Sun,
  Moon,
  Star,
  ArrowRight,
  Sparkles,
  BookOpen,
  Heart,
  ShoppingBag,
  Sunrise,
  Sunset,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { HeroActions } from "@/components/hero/hero-actions";

export const dynamic = "force-dynamic";
export const revalidate = 300;

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
      <main className="flex-1">
        <JsonLd
          city={city.name}
          breadcrumbs={[{ name: "Home", url: SITE_CONFIG.url }]}
        />

        {/* Hero Banner */}
        <section className="py-10" style={{ backgroundColor: "#D9C2A6", backgroundImage: "none" }}>
          <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "92%" }}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold text-[#3B2512] sm:text-4xl">
                Today&apos;s Panchang
              </h1>
              <p className="mt-2 text-base text-[#5C3D1E]/70">
                {today} &middot; {city.name}, {city.state}
              </p>
              <HeroActions citySlug={city.slug} cityName={city.name} />
            </div>
          </div>
        </section>

        {/* At-a-Glance Strip */}
        <section className="mx-auto px-4 pt-8 pb-4 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Day Score */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 shadow-lg"
              style={{ backgroundColor: "#003636" }}
            >
              <div className="absolute top-3 right-3 text-white/15">
                <Star className="h-16 w-16" />
              </div>
              <div className="relative flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/90">Today&apos;s Vibe</p>
                <div className="mt-2 h-px w-8 bg-white/20" />
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-5xl font-bold text-white">{Math.round(data.day_quality.score)}</span>
                  <span className="text-base text-white/70">/100</span>
                </div>
                <span className={`mt-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-bold ${scoreStyle.bg} ${scoreStyle.text}`}>
                  {scoreLabel} Day
                </span>
              </div>
            </div>

            {/* Tithi */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 shadow-lg"
              style={{ backgroundColor: "#003636" }}
            >
              <div className="absolute top-3 right-3 text-white/10">
                <Moon className="h-14 w-14" />
              </div>
              <div className="relative flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/90">Tithi</p>
                <div className="mt-2 h-px w-8 bg-white/20" />
                <p className="mt-3 text-xl font-bold text-white">
                  {data.panchang.tithi.tithi.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-white">
                    <span className="text-white/60">Paksha:</span> {data.panchang.tithi.paksha}
                  </p>
                  <p className="text-xs text-white">
                    <span className="text-white/60">Deity:</span> {data.panchang.tithi.deity}
                  </p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tithiStyle.bg} ${tithiStyle.text}`}>
                    {data.panchang.tithi.nature}
                  </span>
                </div>
              </div>
            </div>

            {/* Nakshatra */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 shadow-lg"
              style={{ backgroundColor: "#003636" }}
            >
              <div className="absolute top-3 right-3 text-white/10">
                <Sparkles className="h-14 w-14" />
              </div>
              <div className="relative flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/90">Nakshatra</p>
                <div className="mt-2 h-px w-8 bg-white/20" />
                <p className="mt-3 text-xl font-bold text-white">
                  {data.panchang.nakshatra.nakshatra.replace(/_/g, " ").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-white">
                    <span className="text-white/60">Deity:</span> {data.panchang.nakshatra.deity}
                  </p>
                  <p className="text-xs text-white">
                    <span className="text-white/60">Lord:</span> {data.panchang.nakshatra.lord}
                  </p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${nakshatraStyle.bg} ${nakshatraStyle.text}`}>
                    {nakshatraStyle.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Sun */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 shadow-lg"
              style={{ backgroundColor: "#003636" }}
            >
              <div className="absolute top-3 right-3 text-white/10">
                <Sun className="h-14 w-14" />
              </div>
              <div className="relative flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/90">Sun Today</p>
                <div className="mt-2 h-px w-8 bg-white/20" />
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-1 items-center gap-2.5">
                    <Sunrise className="h-5 w-5 shrink-0 text-orange-400" />
                    <div>
                      <p className="text-xl font-bold text-white">{data.timing.sunrise}</p>
                      <p className="text-[10px] font-medium text-white/40">Sunrise</p>
                    </div>
                  </div>
                  <div className="mx-3 h-10 w-px bg-white/15" />
                  <div className="flex flex-1 items-center gap-2.5">
                    <Sunset className="h-5 w-5 shrink-0 text-rose-400" />
                    <div>
                      <p className="text-xl font-bold text-white">{data.timing.sunset}</p>
                      <p className="text-[10px] font-medium text-white/40">Sunset</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avoid These Times */}
        <section className="mx-auto px-4 pt-6 pb-3 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 px-6 py-3" style={{ backgroundColor: "#8B1A1A" }}>
              <ShieldAlert className="h-5 w-5 text-white" />
              <h2 className="text-base font-bold text-white">Avoid These Times</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto p-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-visible" style={{ backgroundColor: "#fef2f2" }}>
              {[
                { label: "Rahu Kalam", start: data.timing.rahu_kalam.start_time, end: data.timing.rahu_kalam.end_time },
                { label: "Yamagandam", start: data.timing.yamagandam.start_time, end: data.timing.yamagandam.end_time },
                { label: "Gulika Kalam", start: data.timing.gulika_kalam.start_time, end: data.timing.gulika_kalam.end_time },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex min-w-[200px] shrink-0 snap-center flex-col items-center justify-center rounded-2xl p-5 sm:min-w-0"
                  style={{ backgroundColor: "#8B1A1A" }}
                >
                  <p className="text-lg font-bold text-amber-300">{t.label}</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="h-2 w-2 rounded-full bg-amber-300" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                  <p className="mt-2.5 text-2xl font-bold text-white">{t.start} – {t.end}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Times Today */}
        <section className="mx-auto px-4 pt-3 pb-6 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 px-6 py-3" style={{ backgroundColor: "#003636" }}>
              <ShieldCheck className="h-5 w-5 text-white" />
              <h2 className="text-base font-bold text-white">Best Times Today</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto p-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible" style={{ backgroundColor: "#f0fdf4" }}>
              {[
                { label: "Abhijit Muhurta", start: data.timing.abhijit_muhurta.start_time, end: data.timing.abhijit_muhurta.end_time },
                { label: "Brahma Muhurta", start: data.timing.brahma_muhurta.start_time, end: data.timing.brahma_muhurta.end_time },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex min-w-[200px] shrink-0 snap-center flex-col items-center justify-center rounded-2xl p-5 sm:min-w-0"
                  style={{ backgroundColor: "#14532d" }}
                >
                  <p className="text-lg font-bold text-amber-300">{t.label}</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="h-2 w-2 rounded-full bg-amber-300" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                  <p className="mt-2.5 text-2xl font-bold text-white">{t.start} – {t.end}</p>
                </div>
              ))}
            </div>
            <div className="p-4" style={{ backgroundColor: "#f0fdf4" }}>
              <Link
                href={`/${city.slug}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#003636] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-vedic-light)] hover:shadow-md"
              >
                See All Timings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Discover More */}
        <section className="mx-auto px-4 pt-8 pb-12 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-vedic)]">
              Discover More
            </h2>
            <p className="mt-1 text-sm text-[var(--color-foreground)]/50">
              Your spiritual toolkit, all in one place
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Your Kundali",
                tagline: "Know your stars",
                desc: "Free personalized birth chart, instantly.",
                icon: <Sparkles className="h-7 w-7" />,
                href: NETWORK_LINKS.kundali,
                bg: "#003636",
              },
              {
                title: "Sacred Stotras",
                tagline: "Daily devotion",
                desc: "Powerful mantras and chalisas for every day.",
                icon: <BookOpen className="h-7 w-7" />,
                href: NETWORK_LINKS.stotra,
                bg: "#8B1A1A",
              },
              {
                title: "Find Muhurta",
                tagline: "Perfect timing",
                desc: "Pick the most auspicious date for anything.",
                icon: <Heart className="h-7 w-7" />,
                href: NETWORK_LINKS.muhurta,
                bg: "#14532d",
              },
              {
                title: "VastuCart Store",
                tagline: "Shop spiritual",
                desc: "Authentic Vastu remedies and essentials.",
                icon: <ShoppingBag className="h-7 w-7" />,
                href: NETWORK_LINKS.store,
                bg: "#92400e",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: item.bg }}
              >
                <div className="absolute top-4 right-4 text-white/10">
                  {item.icon}
                </div>
                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">{item.tagline}</p>
                  <h3 className="mt-1 text-xl font-bold text-white">{item.title}</h3>
                  <div className="mt-2 h-px w-8 bg-white/20" />
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-300">
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
