import { Sparkles, BookOpen, Heart, ShoppingBag } from "lucide-react";
import { WidgetCard } from "./widget-card";
import { NETWORK_LINKS } from "@/lib/constants";

export function WidgetSidebar() {
  return (
    <aside className="space-y-4">
      <h2 className="text-lg font-bold text-[var(--color-vedic)]">
        Explore VastuCart
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <WidgetCard
          title="Free Kundali"
          description="Generate your personalized Vedic birth chart with detailed planetary analysis and dasha predictions."
          icon={<Sparkles className="h-5 w-5" />}
          href={NETWORK_LINKS.kundali}
          accentColor="#e36414"
        />
        <WidgetCard
          title="Sacred Stotra"
          description="Access a curated collection of powerful mantras, stotras, and chalisas for daily spiritual practice."
          icon={<BookOpen className="h-5 w-5" />}
          href={NETWORK_LINKS.stotra}
          accentColor="#003636"
        />
        <WidgetCard
          title="Muhurta Finder"
          description="Find the most auspicious date and time for weddings, griha pravesh, and important ceremonies."
          icon={<Heart className="h-5 w-5" />}
          href={NETWORK_LINKS.muhurta}
          accentColor="#22c55e"
        />
        <WidgetCard
          title="VastuCart Store"
          description="Discover authentic Vastu remedies, yantras, and spiritual products curated by Vedic experts."
          icon={<ShoppingBag className="h-5 w-5" />}
          href={NETWORK_LINKS.store}
          accentColor="#8B6914"
        />
      </div>
    </aside>
  );
}
