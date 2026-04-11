import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug } from "@/lib/cities";
import { getTodayISO } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    alternates: {
      canonical: `${SITE_CONFIG.url}/${citySlug}/todays-tithi/${getTodayISO()}`,
    },
  };
}

export default async function TithiRedirect({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  redirect(`/${citySlug}/todays-tithi/${getTodayISO()}`);
}
