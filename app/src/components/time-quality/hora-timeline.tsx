"use client";

import { Sun, Moon } from "lucide-react";
import { getNatureStyle } from "@/lib/constants";
import { formatTime12h, timeToMinutes } from "@/lib/format";
import { useCurrentTime } from "@/hooks/use-current-time";
import type { Hora, HoraEntry } from "@/schemas/panchang";

interface HoraTimelineProps {
  hora: Hora;
}

function getHoraIcon(planet: string) {
  const icons: Record<string, string> = {
    Sun: "Su",
    Moon: "Mo",
    Mars: "Ma",
    Mercury: "Me",
    Jupiter: "Ju",
    Venus: "Ve",
    Saturn: "Sa",
  };
  return icons[planet] || planet.slice(0, 2);
}

export function HoraTimeline({ hora }: HoraTimelineProps) {
  const now = useCurrentTime();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const allHoras = hora.all_horas;
  if (allHoras.length === 0) return null;

  const firstStart = timeToMinutes(allHoras[0].start_time);
  const lastEnd = timeToMinutes(allHoras[allHoras.length - 1].end_time);
  const totalSpan = lastEnd > firstStart ? lastEnd - firstStart : 1440 - firstStart + lastEnd;

  function getPosition(timeStr: string) {
    const mins = timeToMinutes(timeStr);
    const offset = mins >= firstStart ? mins - firstStart : 1440 - firstStart + mins;
    return (offset / totalSpan) * 100;
  }

  const sunrisePos = getPosition(hora.sunrise);
  const sunsetPos = getPosition(hora.sunset);
  const nowPos = getPosition(
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  );

  const isCurrentTimeVisible =
    currentMinutes >= firstStart && currentMinutes <= lastEnd;

  return (
    <div className="space-y-4">
      {/* Day/Night labels */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span>Sunrise: {formatTime12h(hora.sunrise)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Moon className="h-3.5 w-3.5 text-[var(--color-vedic)]" />
          <span>Sunset: {formatTime12h(hora.sunset)}</span>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="relative">
        <div className="flex h-10 overflow-hidden rounded-lg border border-border">
          {allHoras.map((entry, i) => {
            const style = getNatureStyle(entry.nature);
            const startMins = timeToMinutes(entry.start_time);
            const endMins = timeToMinutes(entry.end_time);
            const duration =
              endMins > startMins ? endMins - startMins : 1440 - startMins + endMins;
            const widthPct = (duration / totalSpan) * 100;

            const isCurrent =
              currentMinutes >= startMins && currentMinutes < endMins;

            return (
              <div
                key={i}
                className={`relative flex items-center justify-center border-r border-white/30 last:border-r-0 transition-opacity ${
                  isCurrent ? "ring-2 ring-[var(--color-saffron)] ring-inset z-10" : ""
                }`}
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: style.fill,
                  opacity: entry.is_day ? 0.8 : 0.6,
                }}
                title={`${entry.ruling_planet} (${entry.nature}) — ${formatTime12h(entry.start_time)} to ${formatTime12h(entry.end_time)}`}
              >
                {widthPct > 3 && (
                  <span className="text-[10px] font-bold text-white drop-shadow-sm">
                    {getHoraIcon(entry.ruling_planet)}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Current time marker */}
        {isCurrentTimeVisible && (
          <div
            className="absolute top-0 h-full w-0.5 bg-[var(--color-saffron)] z-20"
            style={{ left: `${nowPos}%` }}
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-[var(--color-saffron)] border-2 border-white shadow-sm" />
          </div>
        )}
      </div>

      {/* Legend / detail list */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-4">
        {allHoras.map((entry, i) => {
          const style = getNatureStyle(entry.nature);
          const isCurrent =
            currentMinutes >= timeToMinutes(entry.start_time) &&
            currentMinutes < timeToMinutes(entry.end_time);

          return (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs ${
                isCurrent
                  ? "bg-[var(--color-saffron)]/10 font-semibold"
                  : ""
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full shrink-0 ${style.dot}`}
              />
              <span className="truncate">
                {entry.ruling_planet}
              </span>
              <span className="text-muted-foreground ml-auto whitespace-nowrap">
                {formatTime12h(entry.start_time)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
