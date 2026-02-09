"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NETWORK_LINKS } from "@/lib/constants";

const ribbonLinks = [
  { label: "Home", href: "/", internal: true },
  { label: "Muhurta", href: NETWORK_LINKS.muhurta },
  { label: "Stotras", href: NETWORK_LINKS.stotra },
  { label: "Full Panchang", href: "/new-delhi", internal: true },
  { label: "Blog", href: NETWORK_LINKS.blog },
];

export function NetworkHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Row 1: Brand Bar */}
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6" style={{ maxWidth: "92%" }}>
          {/* Left: Logo + Brand Pill */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/vastucart-logo.png"
              alt="VastuCart"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span
                className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #8B6914, #C4973B)",
                }}
              >
                Panchang
              </span>
              <span className="mt-0.5 text-[10px] font-medium tracking-wide text-[var(--color-foreground)]/50">
                By VastuCart&reg;
              </span>
            </div>
          </Link>

          {/* Right: Store + Kundali Buttons */}
          <div className="hidden items-center gap-3 sm:flex">
            <a
              href={NETWORK_LINKS.store}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-[var(--color-saffron)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--color-saffron-light)] hover:shadow-md"
            >
              Store
            </a>
            <a
              href={NETWORK_LINKS.kundali}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-[var(--color-saffron)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--color-saffron-light)] hover:shadow-md"
            >
              Kundali
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-vedic)] hover:bg-[var(--color-vedic)]/5 sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Row 2: Navigation Ribbon */}
      <nav className="bg-[#003636] shadow-[0_4px_20px_rgba(0,54,54,0.4)]" style={{ backgroundImage: "none" }}>
        <div
          className="mx-auto hidden items-center gap-1 px-4 sm:flex sm:px-6"
          style={{ maxWidth: "92%" }}
        >
          {ribbonLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white hover:bg-white/10"
              {...(!item.internal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="bg-white border-b border-[var(--color-border)] px-4 pb-4 pt-2 sm:hidden">
          {/* Mobile buttons */}
          <div className="mb-3 flex gap-2">
            <a
              href={NETWORK_LINKS.store}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-[var(--color-saffron)] py-2.5 text-center text-sm font-semibold text-white"
            >
              Store
            </a>
            <a
              href={NETWORK_LINKS.kundali}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-[var(--color-saffron)] py-2.5 text-center text-sm font-semibold text-white"
            >
              Kundali
            </a>
          </div>
          {/* Mobile ribbon links */}
          <div className="rounded-lg bg-[#003636]" style={{ backgroundImage: "none" }}>
            {ribbonLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:text-white hover:bg-white/10"
                {...(!item.internal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
