import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">
        Last updated: February 2026
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing VastuCart Panchang (panchang.vastucart.in), you agree to
        these Terms of Service. If you do not agree, please discontinue use.
      </p>

      <h2>2. Service Description</h2>
      <p>
        VastuCart Panchang provides daily Vedic calendar information including
        Tithi, Nakshatra, Yoga, Karana, planetary timings, and related
        astrological data. This is a free, publicly accessible tool.
      </p>

      <h2>3. Accuracy</h2>
      <p>
        While we strive for mathematical accuracy in all astronomical and
        astrological calculations, Panchang data is provided &quot;as is&quot;
        for informational purposes. Calculations are based on standard Vedic
        algorithms and may vary slightly from other sources.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        The VastuCart brand, logos, design, and presentation are the
        intellectual property of VastuCart. The underlying astrological data
        and algorithms are based on traditional Vedic systems.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        VastuCart shall not be held liable for any decisions made based on the
        Panchang data provided. Users should exercise their own judgment.
      </p>

      <h2>6. Contact</h2>
      <p>
        For questions regarding these terms, contact us at{" "}
        <a href="mailto:contact@vastucart.in">contact@vastucart.in</a>.
      </p>
    </article>
  );
}
