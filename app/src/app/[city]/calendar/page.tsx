import { redirect, notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/cities";

interface PageProps {
  params: Promise<{ city: string }>;
}

export default async function CalendarRedirect({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  redirect(`/${citySlug}/calendar/${month}`);
}
