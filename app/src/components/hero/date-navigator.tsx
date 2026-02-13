"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { format, addDays, subDays, parseISO } from "date-fns";

interface DateNavigatorProps {
  currentDate: string;
  citySlug: string;
  variant?: "light" | "dark";
}

export function DateNavigator({ currentDate, citySlug }: DateNavigatorProps) {
  const router = useRouter();
  const date = parseISO(currentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday =
    format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

  function navigateToDate(newDate: Date) {
    const dateStr = format(newDate, "yyyy-MM-dd");
    const todayStr = format(today, "yyyy-MM-dd");
    if (dateStr === todayStr) {
      router.push(`/${citySlug}`);
    } else {
      router.push(`/${citySlug}/${dateStr}`);
    }
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 backdrop-blur-sm">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        onClick={() => navigateToDate(subDays(date, 1))}
        aria-label="Previous day"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {!isToday && (
        <button
          className="flex h-8 items-center gap-1 rounded-full px-3 text-xs font-semibold text-amber-300 transition-colors hover:bg-white/10"
          onClick={() => navigateToDate(today)}
        >
          <CalendarDays className="h-3.5 w-3.5" />
          Today
        </button>
      )}

      <span className="min-w-[140px] text-center text-sm font-medium text-white">
        {format(date, "EEE, MMM d, yyyy")}
      </span>

      <button
        className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        onClick={() => navigateToDate(addDays(date, 1))}
        aria-label="Next day"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
