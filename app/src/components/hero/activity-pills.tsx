import { Check, X } from "lucide-react";

interface ActivityPillsProps {
  suitable: string[];
  avoid: string[];
}

export function ActivityPills({ suitable, avoid }: ActivityPillsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Suitable Activities */}
      {suitable.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-400" />
            <span className="text-sm font-semibold uppercase tracking-wider text-green-400">
              Favorable For
            </span>
          </div>
          <div className="space-y-1.5">
            {suitable.map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-2 rounded-lg border border-green-400/15 bg-green-400/[0.08] px-3 py-2"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                <span className="text-sm font-medium capitalize text-green-300">
                  {activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avoid Activities */}
      {avoid.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <X className="h-5 w-5 text-red-400" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-400">
              Avoid
            </span>
          </div>
          <div className="space-y-1.5">
            {avoid.map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-2 rounded-lg border border-red-400/15 bg-red-400/[0.08] px-3 py-2"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <span className="text-sm font-medium capitalize text-red-300">
                  {activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
