import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface WidgetCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  accentColor: string;
}

export function WidgetCard({
  title,
  description,
  icon,
  href,
  accentColor,
}: WidgetCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-[var(--color-saffron)]/30"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: accentColor + "15", color: accentColor }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-foreground group-hover:text-[var(--color-saffron)] transition-colors">
          {title}
        </h3>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-saffron)]" />
    </a>
  );
}
