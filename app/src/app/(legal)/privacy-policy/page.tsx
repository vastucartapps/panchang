import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for VastuCart Panchang. Learn how we handle your data, cookies, and browsing information on panchang.vastucart.in.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        VastuCart Panchang (panchang.vastucart.in) is a free, public tool that
        does not require user registration or login. We collect minimal
        information:
      </p>
      <ul>
        <li>
          <strong>Location data:</strong> If you use the &quot;Auto-Detect&quot;
          feature, your browser may share your approximate geolocation. This is
          used solely to show Panchang data for your nearest city and is not
          stored on our servers.
        </li>
        <li>
          <strong>Usage analytics:</strong> We may use privacy-respecting
          analytics to understand page visits and improve the service.
        </li>
        <li>
          <strong>Cookies:</strong> We use localStorage to remember your
          preferred city. No tracking cookies are used.
        </li>
      </ul>

      <h2>2. How We Use Information</h2>
      <p>
        Any information collected is used exclusively to provide accurate,
        location-specific Panchang data and improve the user experience.
      </p>

      <h2>3. Data Sharing</h2>
      <p>
        We do not sell, trade, or share your personal information with third
        parties.
      </p>

      <h2>4. Contact</h2>
      <p>
        For privacy-related inquiries, contact us at{" "}
        <a href="mailto:contact@vastucart.in">contact@vastucart.in</a>.
      </p>
    </article>
  );
}
