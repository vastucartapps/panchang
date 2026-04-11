import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug } from "@/lib/cities";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ city: string }>;
}

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    alternates: {
      canonical: `${SITE_CONFIG.url}/${citySlug}/calendar/${getCurrentMonth()}`,
    },
  };
}

export default async function CalendarRedirect({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  redirect(`/${citySlug}/calendar/${getCurrentMonth()}`);
}
