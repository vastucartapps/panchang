import { CalendarDays } from "lucide-react";
import { PanchangCard } from "./panchang-card";
import type { Vara } from "@/schemas/panchang";

interface VaraCardProps {
  vara: Vara;
}

export function VaraCard({ vara }: VaraCardProps) {
  return (
    <PanchangCard
      title="Vara (Day)"
      icon={<CalendarDays className="h-4 w-4" />}
      name={`${vara.name} (${vara.day})`}
      nature={vara.nature}
    >
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Lord:</span> {vara.lord}
        </p>
      </div>
    </PanchangCard>
  );
}
