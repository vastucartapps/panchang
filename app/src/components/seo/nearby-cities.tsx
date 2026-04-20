import Link from "next/link";
import { MapPin } from "lucide-react";
import type { City } from "@/schemas/city";

interface NearbyCitiesBlockProps {
  cities: City[];
  currentDate?: string; // YYYY-MM-DD; when present, links point to /{city}/{date}; else /{city}
  heading?: string;
  subheading?: string;
}

/**
 * Geo-ranked cross-link cluster. Renders 6-8 closest cities as anchor
 * links. Tight local clusters strengthen entity-graph coherence more
 * than random alphabetical lists — neighbor cities share user intent
 * (a user looking up Delhi panchang is more likely to need Gurugram
 * than Guwahati). Reference Files/05 §9 internal linking matrix.
 */
export function NearbyCitiesBlock({
  cities,
  currentDate,
  heading = "Nearby Cities",
  subheading = "Panchang for cities closest to yours",
}: NearbyCitiesBlockProps) {
  if (!cities.length) return null;

  return (
    <section className="mt-10 rounded-2xl border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-[var(--color-saffron)]" />
        <h2 className="text-base font-bold text-[var(--color-vedic)]">
          {heading}
        </h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{subheading}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {cities.map((c) => {
          const href = currentDate
            ? `/${c.slug}/${currentDate}`
            : `/${c.slug}`;
          return (
            <Link
              key={c.slug}
              href={href}
              prefetch={false}
              className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-saffron)]/30 hover:shadow-md"
            >
              <MapPin className="h-3 w-3 shrink-0 text-[var(--color-saffron)]" />
              <span className="truncate">{c.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
