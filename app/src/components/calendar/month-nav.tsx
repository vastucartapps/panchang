import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CAL_COLORS, hinduMonthSpanLabel, vikramSamvatYear } from "@/lib/panchang-helpers";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function MonthNav({
  citySlug,
  month,
  prev,
  next,
}: {
  citySlug: string;
  month: string;
  prev: string;
  next: string;
}) {
  const [y, m] = month.split("-").map(Number);
  const [py, pm] = prev.split("-").map(Number);
  const [ny, nm] = next.split("-").map(Number);
  const title = `${MONTH_NAMES[m - 1]} ${y}`;
  const hinduSpan = hinduMonthSpanLabel(m);
  const vs = vikramSamvatYear(y, m);

  return (
    <div className="flex items-center justify-between gap-2">
      <Link
        href={`/${citySlug}/calendar/${prev}`}
        className="group inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all hover:-translate-y-0.5"
        style={{
          color: CAL_COLORS.text.primary,
          border: `1px solid ${CAL_COLORS.text.secondary}33`,
          background: "#ffffff",
        }}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{SHORT_MONTHS[pm - 1]} {py}</span>
        <span className="sm:hidden">Prev</span>
      </Link>

      <div className="flex flex-col items-center text-center">
        <h2 className="font-heading text-[28px] font-medium leading-none sm:text-[30px]" style={{ color: CAL_COLORS.teal.border }}>
          {title}
        </h2>
        <p
          className="mt-1.5 text-[10.5px] font-medium uppercase"
          style={{ letterSpacing: "1.2px", color: CAL_COLORS.text.secondary }}
        >
          {hinduSpan} · Vikram Samvat {vs}
        </p>
      </div>

      <Link
        href={`/${citySlug}/calendar/${next}`}
        className="group inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all hover:-translate-y-0.5"
        style={{
          color: CAL_COLORS.text.primary,
          border: `1px solid ${CAL_COLORS.text.secondary}33`,
          background: "#ffffff",
        }}
      >
        <span className="hidden sm:inline">{SHORT_MONTHS[nm - 1]} {ny}</span>
        <span className="sm:hidden">Next</span>
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
