import type { ReactNode } from "react";
import { getNatureStyle } from "@/lib/constants";

interface PanchangCardProps {
  title: string;
  icon: ReactNode;
  watermarkIcon?: ReactNode;
  name: string;
  nature: string;
  gradientAccent?: string;
  children?: ReactNode;
}

export function PanchangCard({
  title,
  icon,
  watermarkIcon,
  name,
  nature,
  gradientAccent = "rgba(196,151,59,0.12)",
  children,
}: PanchangCardProps) {
  const style = getNatureStyle(nature);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-4 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl sm:p-6"
      style={{ background: `linear-gradient(135deg, #003636 0%, #003636 60%, ${gradientAccent} 100%)` }}
    >
      {watermarkIcon && (
        <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.04]">
          <span className="text-white">{watermarkIcon}</span>
        </div>
      )}
      <div className="relative flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-white/70">{icon}</span>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/90">{title}</p>
        </div>
        <div className="mt-2 h-px w-10 bg-gradient-to-r from-[#C4973B]/60 to-transparent" />
        <p className="mt-3 text-2xl font-bold tracking-tight text-white">{name}</p>
        <span
          className={`mt-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold ${style.bg} ${style.text}`}
        >
          {style.label}
        </span>
        {children && (
          <div className="mt-3 space-y-1">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
