import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActivityPillsProps {
  suitable: string[];
  avoid: string[];
}

export function ActivityPills({ suitable, avoid }: ActivityPillsProps) {
  return (
    <div className="space-y-3">
      {/* Suitable Activities */}
      {suitable.length > 0 && (
        <div>
          <div className="mb-1.5 flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400">
              Favorable For
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suitable.map((activity) => (
              <Badge
                key={activity}
                variant="outline"
                className="border-green-400/30 bg-green-400/10 text-green-300 capitalize hover:bg-green-400/10"
              >
                {activity}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Avoid Activities */}
      {avoid.length > 0 && (
        <div>
          <div className="mb-1.5 flex items-center gap-1.5">
            <X className="h-3.5 w-3.5 text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Avoid
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {avoid.map((activity) => (
              <Badge
                key={activity}
                variant="outline"
                className="border-red-400/30 bg-red-400/10 text-red-300 capitalize hover:bg-red-400/10"
              >
                {activity}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
