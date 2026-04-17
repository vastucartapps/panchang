import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug } from "@/lib/cities";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ city: string }>;
}

function getCurrentWeekMonday(): string {
  const now = new Date();
  const day = now.getDay() || 7; // ISO: Mon=1, Sun=7
  const monday = new Date(now);
  monday.setDate(now.getDate() - day + 1);
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    alternates: {
      canonical: `${SITE_CONFIG.url}/${citySlug}/week/${getCurrentWeekMonday()}`,
    },
  };
}

export default async function WeekRedirect({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  redirect(`/${citySlug}/week/${getCurrentWeekMonday()}`);
}
