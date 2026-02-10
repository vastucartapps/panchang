"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { format, addDays, subDays, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

interface DateNavigatorProps {
  currentDate: string;
  citySlug: string;
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
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-[var(--color-vedic)]"
        onClick={() => navigateToDate(subDays(date, 1))}
        aria-label="Previous day"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {!isToday && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-xs text-[var(--color-saffron)]"
          onClick={() => navigateToDate(today)}
        >
          <CalendarDays className="h-3.5 w-3.5" />
          Today
        </Button>
      )}

      <span className="min-w-[140px] text-center text-sm font-medium">
        {format(date, "EEE, MMM d, yyyy")}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-[var(--color-vedic)]"
        onClick={() => navigateToDate(addDays(date, 1))}
        aria-label="Next day"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
