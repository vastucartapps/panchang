"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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

  // Sync state from cookie on mount and after navigation
  useEffect(() => {
    setLocale(readCookie());
  }, []);

  // Also re-sync when the component becomes visible (tab switch, mobile menu reopen)
  useEffect(() => {
    const sync = () => setLocale(readCookie());
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const toggle = useCallback(() => {
    // Always read the ACTUAL cookie value, never trust stale React state
    const current = readCookie();
    const next: Locale = current === "en" ? "hi" : "en";
    setCookie(next);
    setLocale(next);
    router.refresh();
  }, [router]);

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
