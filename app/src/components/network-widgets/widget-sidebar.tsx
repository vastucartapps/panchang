import {
  Sparkles,
  BookOpen,
  Heart,
  ShoppingBag,
  Gem,
  Moon,
  Briefcase,
  Hash,
  Users,
  Star,
} from "lucide-react";
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
          title="Kundali"
          description="Get your personalized Vedic birth chart with detailed planetary analysis and dasha predictions."
          icon={<Sparkles className="h-5 w-5" />}
          href={NETWORK_LINKS.kundali}
          accentColor="#e36414"
        />
        <WidgetCard
          title="Marriage Matching"
          description="Check Kundli Milan compatibility with Ashtakoot Guna matching for marriage prospects."
          icon={<Users className="h-5 w-5" />}
          href="https://www.vastucart.in/en/tools/marriage-matching"
          accentColor="#e11d48"
        />
        <WidgetCard
          title="Gemstone Recommender"
          description="Discover the ideal gemstone based on your birth chart for prosperity, health, and harmony."
          icon={<Gem className="h-5 w-5" />}
          href="https://www.vastucart.in/en/tools/gemstone-recommender"
          accentColor="#7c3aed"
        />
        <WidgetCard
          title="Sacred Stotra"
          description="Access a curated collection of powerful mantras, stotras, and chalisas for daily spiritual practice."
          icon={<BookOpen className="h-5 w-5" />}
          href={NETWORK_LINKS.stotra}
          accentColor="#013f47"
        />
        <WidgetCard
          title="Career Predictor"
          description="Get career insights and professional guidance based on your Vedic birth chart analysis."
          icon={<Briefcase className="h-5 w-5" />}
          href="https://www.vastucart.in/en/tools/career-predictor"
          accentColor="#0369a1"
        />
        <WidgetCard
          title="Moon Sign Calculator"
          description="Find your Vedic Moon Sign (Rashi) and understand its influence on your personality and emotions."
          icon={<Moon className="h-5 w-5" />}
          href="https://www.vastucart.in/en/tools/moon-sign-calculator"
          accentColor="#6366f1"
        />
        <WidgetCard
          title="Muhurta Finder"
          description="Find the most auspicious date and time for weddings, griha pravesh, and important ceremonies."
          icon={<Heart className="h-5 w-5" />}
          href={NETWORK_LINKS.muhurta}
          accentColor="#22c55e"
        />
        <WidgetCard
          title="Daily Horoscope"
          description="Read your daily, weekly, and monthly Vedic horoscope predictions for all zodiac signs."
          icon={<Star className="h-5 w-5" />}
          href={NETWORK_LINKS.horoscope}
          accentColor="#f59e0b"
        />
        <WidgetCard
          title="Lucky Number"
          description="Calculate your personal lucky numbers using Vedic numerology for important decisions."
          icon={<Hash className="h-5 w-5" />}
          href="https://www.vastucart.in/en/tools/lucky-number-calculator"
          accentColor="#14b8a6"
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
