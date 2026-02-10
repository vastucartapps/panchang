import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for VastuCart Panchang. Astrological information is for spiritual guidance only and not a substitute for professional advice.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1>Disclaimer</h1>
      <p className="text-muted-foreground">
        Last updated: February 2026
      </p>

      <h2>Astrological Information</h2>
      <p>
        The Panchang data, auspicious timings, and astrological information
        provided on VastuCart Panchang (panchang.vastucart.in) are based on
        traditional Vedic astrology calculations and are intended for
        informational and spiritual guidance purposes only.
      </p>

      <h2>Not Professional Advice</h2>
      <p>
        This information should not be considered as professional advice for
        medical, legal, financial, or other life decisions. Always consult
        qualified professionals for important decisions.
      </p>

      <h2>Calculation Methodology</h2>
      <p>
        Our calculations use the Chitrapaksha (Lahiri) ayanamsha and are
        computed using Swiss Ephemeris data. While mathematically precise,
        minor variations may exist compared to regional Panchang traditions
        that use different ayanamsha values or local corrections.
      </p>

      <h2>No Guarantee</h2>
      <p>
        VastuCart does not guarantee the accuracy, completeness, or
        reliability of any astrological information provided. Use of this
        service is at your own discretion and risk.
      </p>
    </article>
  );
}
