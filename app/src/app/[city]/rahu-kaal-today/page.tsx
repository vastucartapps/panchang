import { redirect, notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/cities";
import { getTodayISO } from "@/lib/format";

interface PageProps {
  params: Promise<{ city: string }>;
}

export default async function RahuKaalRedirect({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  redirect(`/${citySlug}/rahu-kaal-today/${getTodayISO()}`);
}
