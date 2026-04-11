import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug } from "@/lib/cities";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ city: string }>;
}

function getCurrentWeekId(): string {
  const now = new Date();
  const jan4 = new Date(now.getFullYear(), 0, 4);
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000) + 1;
  const dayOfWeek = jan4.getDay() || 7;
  const weekNum = Math.ceil((dayOfYear + dayOfWeek - 1) / 7);
  return `${now.getFullYear()}-W${String(Math.min(weekNum, 52)).padStart(2, "0")}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    alternates: {
      canonical: `${SITE_CONFIG.url}/${citySlug}/week/${getCurrentWeekId()}`,
    },
  };
}

export default async function WeekRedirect({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  redirect(`/${citySlug}/week/${getCurrentWeekId()}`);
}
