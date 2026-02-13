import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { NETWORK_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

const panchangLinks = [
  { label: "Today's Panchang", href: "/new-delhi" },
  { label: "Rahu Kaal Today", href: "/rahu-kaal-today" },
  { label: "Choghadiya Today", href: "/choghadiya-today" },
  { label: "Today's Tithi", href: "/todays-tithi" },
  { label: "Today's Nakshatra", href: "/todays-nakshatra" },
  { label: "Moon Phase Today", href: "/moon-phase-today" },
  { label: "Hindu Festivals", href: "/hindu-festivals" },
  { label: "What is Panchang?", href: "/what-is-panchang" },
];

const currentYear = new Date().getFullYear();
const festivalLinks = [
  { name: "Diwali", slug: "diwali" },
  { name: "Holi", slug: "holi" },
  { name: "Navratri", slug: "sharad-navratri" },
  { name: "Janmashtami", slug: "janmashtami" },
  { name: "Ganesh Chaturthi", slug: "ganesh-chaturthi" },
].map((f) => ({
  label: `${f.name} ${currentYear}`,
  href: `/hindu-festivals/${f.slug}-${currentYear}`,
}));

const toolsLinks = [
  { label: "Kundali", href: NETWORK_LINKS.kundali },
  { label: "Gemstone Store", href: NETWORK_LINKS.store },
  { label: "Vedic Tools", href: NETWORK_LINKS.tools },
  { label: "Match Making", href: "https://www.vastucart.in/en/tools/marriage-matching" },
];

const networkLinks = [
  { label: "VastuCart\u00AE Happy Homes", href: NETWORK_LINKS.main },
  { label: "Horoscope", href: NETWORK_LINKS.horoscope },
  { label: "Muhurta", href: NETWORK_LINKS.muhurta },
  { label: "Stotra", href: NETWORK_LINKS.stotra },
  { label: "Blog", href: NETWORK_LINKS.blog },
  { label: "Store", href: NETWORK_LINKS.store },
  { label: "Wedding", href: NETWORK_LINKS.wedding },
];

const socialIcons = [
  { label: "Facebook", href: SOCIAL_LINKS.facebook, initial: "f" },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, initial: "in" },
  { label: "Threads", href: SOCIAL_LINKS.threads, initial: "t" },
  { label: "Pinterest", href: SOCIAL_LINKS.pinterest, initial: "p" },
  { label: "X", href: SOCIAL_LINKS.x, initial: "x" },
];

export function Footer() {
  return (
    <footer className="relative z-[60]">
      {/* Gold gradient top border */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C4973B, transparent)" }}
      />

      <div
        style={{ background: "linear-gradient(180deg, #013f47 0%, #002828 100%)" }}
      >
        <div className="mx-auto px-4 py-16 sm:px-6" style={{ maxWidth: "92%" }}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/vastucart-logo.png"
                  alt="VastuCart"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">VastuCart</span>
                  <span className="text-[10px] tracking-wide text-white/50">
                    Divinely Perfect
                  </span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-white/50">
                Accurate Vedic Panchang for 200+ Indian cities. Tithi, Nakshatra,
                Rahu Kaal, Choghadiya, and more — updated daily.
              </p>
              {/* Social icons as circles */}
              <div className="flex gap-3">
                {socialIcons.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-bold uppercase text-white/60 transition-all hover:bg-white/10 hover:text-white"
                  >
                    {s.initial}
                  </a>
                ))}
              </div>
            </div>

            {/* Panchang Links */}
            <div>
              <h3 className="mb-4 text-sm font-bold text-[#C4973B]/80">Panchang</h3>
              <ul className="space-y-2.5">
                {panchangLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="mb-3 mt-6 text-sm font-bold text-[#C4973B]/80">
                Festivals {currentYear}
              </h3>
              <ul className="space-y-2.5">
                {festivalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Services */}
            <div>
              <h3 className="mb-4 text-sm font-bold text-[#C4973B]/80">
                Tools & Services
              </h3>
              <ul className="space-y-2.5">
                {toolsLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="mb-3 mt-6 text-sm font-bold text-[#C4973B]/80">
                Legal
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* The Network */}
            <div>
              <h3 className="mb-4 text-sm font-bold text-[#C4973B]/80">
                The Network
              </h3>
              <ul className="space-y-2.5">
                {networkLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/5">
          <div className="mx-auto px-4 py-4 sm:px-6" style={{ maxWidth: "92%" }}>
            <p className="mb-3 text-center text-xs text-white/30">
              For informational and educational purposes only. Not professional
              advice.
            </p>
            <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
              <p className="text-xs text-white/30">
                &copy; {new Date().getFullYear()}{" "}
                <a
                  href="https://www.vastucart.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 transition-colors hover:text-white/70"
                >
                  {SITE_CONFIG.brandName}&reg;
                </a>
                . All rights reserved
              </p>
              <p className="flex items-center gap-1 text-xs text-white/30">
                Made with{" "}
                <Heart className="h-3 w-3 fill-red-500 text-red-500" /> in India
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
