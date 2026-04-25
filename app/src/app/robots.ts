import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in";

const DISALLOW_API = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search engines — full access except APIs
      { userAgent: "Googlebot", allow: "/", disallow: DISALLOW_API },
      { userAgent: "Googlebot-Image", allow: "/", disallow: DISALLOW_API },
      { userAgent: "Googlebot-News", allow: "/", disallow: DISALLOW_API },
      { userAgent: "Google-InspectionTool", allow: "/", disallow: DISALLOW_API },
      { userAgent: "Bingbot", allow: "/", disallow: DISALLOW_API },

      // AI assistants fetching pages for users (these cite back, drive traffic)
      { userAgent: "ChatGPT-User", allow: "/", disallow: DISALLOW_API },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: DISALLOW_API },
      { userAgent: "PerplexityBot", allow: "/", disallow: DISALLOW_API },
      { userAgent: "Claude-User", allow: "/", disallow: DISALLOW_API },
      { userAgent: "Claude-Web", allow: "/", disallow: DISALLOW_API },

      // AI training crawlers — block (no benefit to you)
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
      { userAgent: "Meta-ExternalAgent", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Diffbot", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },

      // SEO crawlers — block (free intel for competitors)
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "serpstatbot", disallow: "/" },

      // Search engines you don't serve
      { userAgent: "Yandex", disallow: "/" },
      { userAgent: "Baiduspider", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },

      // Everything else — pages allowed, APIs blocked
      { userAgent: "*", allow: "/", disallow: DISALLOW_API },
    ],
    sitemap: "https://panchang.vastucart.in/sitemap.xml",
  };
}
