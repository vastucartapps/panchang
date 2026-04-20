import Link from "next/link";
import { ShieldAlert, Clock, Moon, Star, Sunrise, Calendar } from "lucide-react";

interface TopicHubLinksProps {
  citySlug: string;
  cityName: string;
  date: string; // YYYY-MM-DD
}

const TOPICS = [
  {
    key: "rahu-kaal-today",
    label: "Rahu Kaal",
    icon: ShieldAlert,
    description: "Inauspicious 90-min window",
    color: "#ef4444",
  },
  {
    key: "choghadiya-today",
    label: "Choghadiya",
    icon: Clock,
    description: "Shubh & Ashubh muhurat",
    color: "#C4973B",
  },
  {
    key: "todays-tithi",
    label: "Tithi",
    icon: Moon,
    description: "Lunar day, Paksha & deity",
    color: "#0F6E56",
  },
  {
    key: "todays-nakshatra",
    label: "Nakshatra",
    icon: Star,
    description: "Lunar mansion with Pada",
    color: "#7c3aed",
  },
  {
    key: "sunrise-sunset",
    label: "Sunrise & Sunset",
    icon: Sunrise,
    description: "Day duration, muhurtas",
    color: "#f59e0b",
  },
  {
    key: "moon-phase-today",
    label: "Moon Phase",
    icon: Moon,
    description: "Illumination & lunar age",
    color: "#3b82f6",
  },
] as const;

/**
 * Six topic-hub cross-links for a given city/date. Each anchor points to
 * a /{city}/{topic}/{date} page that carries its own QAPage schema and
 * nearby-cities cluster. This pattern lets Google discover all six
 * topic-specific sub-pages from the city landing page in one crawl and
 * tightens the intra-city topical cluster.
 */
export function TopicHubLinks({ citySlug, cityName, date }: TopicHubLinksProps) {
  return (
    <section className="mt-10 rounded-2xl border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-[var(--color-saffron)]" />
        <h2 className="text-base font-bold text-[var(--color-vedic)]">
          Explore Panchang topics for {cityName}
        </h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Each topic has a dedicated page with detail, FAQs, and nearby-city
        comparisons.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map(({ key, label, icon: Icon, description, color }) => (
          <Link
            key={key}
            href={`/${citySlug}/${key}/${date}`}
            prefetch={false}
            className="group flex items-start gap-3 rounded-xl border bg-card px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
          >
            <Icon
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)]">
                {label} in {cityName}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                {description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
