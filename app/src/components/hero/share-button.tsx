"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  cityName: string;
  citySlug: string;
  date: string;
}

export function ShareButton({ cityName, citySlug, date }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  const pageUrl = `https://panchang.vastucart.in/${citySlug}/${date}`;
  const text = `Check today's Panchang for ${cityName} — Tithi, Nakshatra, Rahu Kaal & more`;

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${pageUrl}`)}`,
      "_blank"
    );
    setShowMenu(false);
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setShowMenu(false);
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`,
      "_blank"
    );
    setShowMenu(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch {
      // fallback
    }
    setShowMenu(false);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `Panchang - ${cityName}`, text, url: pageUrl });
      } catch {
        // user cancelled
      }
    }
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (typeof navigator !== "undefined" && "share" in navigator) {
            nativeShare();
          } else {
            setShowMenu(!showMenu);
          }
        }}
        className="flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border bg-card shadow-xl">
            <button
              onClick={shareWhatsApp}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">W</span>
              WhatsApp
            </button>
            <button
              onClick={shareTelegram}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">T</span>
              Telegram
            </button>
            <button
              onClick={shareTwitter}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white">X</span>
              Twitter / X
            </button>
            <button
              onClick={copyLink}
              className="flex w-full items-center gap-3 border-t px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white">L</span>
              Copy Link
            </button>
          </div>
        </>
      )}
    </div>
  );
}
