import type { ReactNode } from "react";
import { getNatureStyle } from "@/lib/constants";

interface PanchangCardProps {
  title: string;
  icon: ReactNode;
  watermarkIcon?: ReactNode;
  name: string;
  nature: string;
  children?: ReactNode;
}

export function PanchangCard({
  title,
  icon,
  watermarkIcon,
  name,
  nature,
  children,
}: PanchangCardProps) {
  const style = getNatureStyle(nature);

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 shadow-lg" style={{ backgroundColor: "#003636" }}>
      {watermarkIcon && (
        <div className="absolute -bottom-3 -right-3 pointer-events-none" style={{ color: "#004a4a" }}>
          {watermarkIcon}
        </div>
      )}
      <div className="relative flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-white/70">{icon}</span>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/90">{title}</p>
        </div>
        <div className="mt-2 h-px w-8 bg-white/20" />
        <p className="mt-3 text-xl font-bold text-white">{name}</p>
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
