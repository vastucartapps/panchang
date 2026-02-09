"use client";

import { Sun, Moon } from "lucide-react";
import { getNatureStyle } from "@/lib/constants";
import { formatTime12h, timeToMinutes } from "@/lib/format";
import { useCurrentTime } from "@/hooks/use-current-time";
import type { Choghadiya, ChoghadiyaPeriod } from "@/schemas/panchang";

interface ChoghadiyaTimelineProps {
  choghadiya: Choghadiya;
}

export function ChoghadiyaTimeline({ choghadiya }: ChoghadiyaTimelineProps) {
  const now = useCurrentTime();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const allPeriods = [...choghadiya.day_periods, ...choghadiya.night_periods];
  if (allPeriods.length === 0) return null;

  const firstStart = timeToMinutes(allPeriods[0].start_time);
  const lastEnd = timeToMinutes(allPeriods[allPeriods.length - 1].end_time);
  const totalSpan =
    lastEnd > firstStart ? lastEnd - firstStart : 1440 - firstStart + lastEnd;

  function getPosition(timeStr: string) {
    const mins = timeToMinutes(timeStr);
    const offset = mins >= firstStart ? mins - firstStart : 1440 - firstStart + mins;
    return (offset / totalSpan) * 100;
  }

  const nowPos = getPosition(
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  );

  const isCurrentTimeVisible =
    currentMinutes >= firstStart ||
    (lastEnd < firstStart && currentMinutes <= lastEnd);

  function isCurrent(period: ChoghadiyaPeriod) {
    const start = timeToMinutes(period.start_time);
    const end = timeToMinutes(period.end_time);
    if (end > start) {
      return currentMinutes >= start && currentMinutes < end;
    }
    return currentMinutes >= start || currentMinutes < end;
  }

  return (
    <div className="space-y-4">
      {/* Day periods */}
      <div>
        <div className="mb-2 flex items-center gap-1.5">
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Day Choghadiya
          </span>
        </div>
        <TimelineBar
          periods={choghadiya.day_periods}
          totalSpan={totalSpan}
          firstStart={firstStart}
          currentMinutes={currentMinutes}
          nowPos={nowPos}
          isCurrentTimeVisible={isCurrentTimeVisible}
          isCurrentFn={isCurrent}
        />
        <PeriodList periods={choghadiya.day_periods} isCurrentFn={isCurrent} />
      </div>

      {/* Night periods */}
      <div>
        <div className="mb-2 flex items-center gap-1.5">
          <Moon className="h-3.5 w-3.5 text-[var(--color-vedic)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Night Choghadiya
          </span>
        </div>
        <TimelineBar
          periods={choghadiya.night_periods}
          totalSpan={totalSpan}
          firstStart={firstStart}
          currentMinutes={currentMinutes}
          nowPos={nowPos}
          isCurrentTimeVisible={isCurrentTimeVisible}
          isCurrentFn={isCurrent}
        />
        <PeriodList
          periods={choghadiya.night_periods}
          isCurrentFn={isCurrent}
        />
      </div>
    </div>
  );
}

function TimelineBar({
  periods,
  totalSpan,
  firstStart,
  currentMinutes,
  nowPos,
  isCurrentTimeVisible,
  isCurrentFn,
}: {
  periods: ChoghadiyaPeriod[];
  totalSpan: number;
  firstStart: number;
  currentMinutes: number;
  nowPos: number;
  isCurrentTimeVisible: boolean;
  isCurrentFn: (p: ChoghadiyaPeriod) => boolean;
}) {
  // Calculate local span for this set of periods
  if (periods.length === 0) return null;
  const localFirst = timeToMinutes(periods[0].start_time);
  const localLast = timeToMinutes(periods[periods.length - 1].end_time);
  const localSpan =
    localLast > localFirst
      ? localLast - localFirst
      : 1440 - localFirst + localLast;

  const hasCurrentInSet = periods.some(isCurrentFn);

  function getLocalPosition(timeStr: string) {
    const mins = timeToMinutes(timeStr);
    const offset =
      mins >= localFirst ? mins - localFirst : 1440 - localFirst + mins;
    return (offset / localSpan) * 100;
  }

  const localNowPos = getLocalPosition(
    `${String(Math.floor(currentMinutes / 60))
      .padStart(2, "0")}:${String(currentMinutes % 60).padStart(2, "0")}`
  );

  return (
    <div className="relative">
      <div className="flex h-10 overflow-hidden rounded-lg border border-border">
        {periods.map((period, i) => {
          const style = getNatureStyle(period.nature);
          const startMins = timeToMinutes(period.start_time);
          const endMins = timeToMinutes(period.end_time);
          const duration =
            endMins > startMins
              ? endMins - startMins
              : 1440 - startMins + endMins;
          const widthPct = (duration / localSpan) * 100;
          const current = isCurrentFn(period);

          return (
            <div
              key={i}
              className={`relative flex items-center justify-center border-r border-white/30 last:border-r-0 ${
                current
                  ? "ring-2 ring-[var(--color-saffron)] ring-inset z-10"
                  : ""
              }`}
              style={{
                width: `${widthPct}%`,
                backgroundColor: style.fill,
                opacity: 0.75,
              }}
              title={`${period.name} (${period.nature}) — ${formatTime12h(period.start_time)} to ${formatTime12h(period.end_time)}`}
            >
              {widthPct > 6 && (
                <span className="text-[10px] font-bold text-white drop-shadow-sm truncate px-0.5">
                  {period.name}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Current time marker */}
      {hasCurrentInSet && (
        <div
          className="absolute top-0 h-full w-0.5 bg-[var(--color-saffron)] z-20"
          style={{ left: `${localNowPos}%` }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-[var(--color-saffron)] border-2 border-white shadow-sm" />
        </div>
      )}
    </div>
  );
}

function PeriodList({
  periods,
  isCurrentFn,
}: {
  periods: ChoghadiyaPeriod[];
  isCurrentFn: (p: ChoghadiyaPeriod) => boolean;
}) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4">
      {periods.map((period, i) => {
        const style = getNatureStyle(period.nature);
        const current = isCurrentFn(period);

        return (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs ${
              current ? "bg-[var(--color-saffron)]/10 font-semibold" : ""
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full shrink-0 ${style.dot}`}
            />
            <span className="truncate">{period.name}</span>
            <span className="text-muted-foreground ml-auto whitespace-nowrap">
              {formatTime12h(period.start_time)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
