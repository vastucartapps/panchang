"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const COOKIE_NAME = "panchang_lang";

function readCookie(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return (match?.[1] as Locale) || "en";
}

function setCookie(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
}

export function LanguageToggle() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(readCookie());
  }, []);

  const toggle = () => {
    const next: Locale = locale === "en" ? "hi" : "en";
    setCookie(next);
    setLocale(next);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-xs font-semibold text-white/70 transition-all hover:bg-white/10 hover:text-white"
      aria-label={locale === "en" ? "Switch to Hindi" : "Switch to English"}
      title={locale === "en" ? "हिन्दी में देखें" : "View in English"}
    >
      <Languages className="h-3.5 w-3.5" />
      {locale === "en" ? "हि" : "EN"}
    </button>
  );
}
