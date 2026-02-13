import { BookOpen } from "lucide-react";
import { generateDailySummary } from "@/lib/daily-summary";
import { formatDateLong } from "@/lib/format";
import type { PanchangResponse } from "@/schemas/panchang";

interface DailySummaryProps {
  data: PanchangResponse;
  cityName: string;
  date?: string;
}

export function DailySummary({ data, cityName, date }: DailySummaryProps) {
  const summary = generateDailySummary(data, cityName);
  const dateSuffix = date ? ` — ${cityName} | ${formatDateLong(date)}` : ` — ${cityName}`;

  return (
    <section className="rounded-2xl border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-[#C4973B]" />
        <h2 className="text-base font-bold text-[var(--color-vedic)]">
          {`Panchang Summary${dateSuffix}`}
        </h2>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {summary}
      </p>
    </section>
  );
}
