import type { ReactNode } from "react";
import { formatTime12h, formatDuration } from "@/lib/format";
import type { TimingEntry } from "@/schemas/panchang";

interface TimingCardProps {
  icon: ReactNode;
  entry: TimingEntry;
  variant?: "warn" | "good" | "neutral";
}

const variantStyles = {
  warn: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    time: "text-red-600",
  },
  good: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    time: "text-green-600",
  },
  neutral: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    time: "text-amber-600",
  },
} as const;

export function TimingCard({ icon, entry, variant = "neutral" }: TimingCardProps) {
  const style = variantStyles[variant];

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-4 ${style.bg} ${style.border}`}
    >
      <span className={style.text}>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-bold ${style.text}`}>{entry.name}</p>
        <p className={`text-lg font-bold ${style.time}`}>
          {formatTime12h(entry.start_time)} &ndash;{" "}
          {formatTime12h(entry.end_time)}
        </p>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${style.text} ${style.border} border bg-white/60`}
      >
        {formatDuration(entry.duration_minutes)}
      </span>
    </div>
  );
}
