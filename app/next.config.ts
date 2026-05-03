import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // Upstream api.vastucart.in's 2-concurrent limit + 11 Next.js build workers
  // means some fetches queue for 30s+. With retries (3 attempts × 30s + 3s
  // backoff = 93s max per URL in lib/api.ts), the default 60s static-gen
  // timeout would trip. 180s gives the retry budget + render overhead room.
  staticPageGenerationTimeout: 180,
  async redirects() {
    return [
      // ─── Rahu Kaal spelling variants (308 permanent) ─────
      { source: "/rahu-kalam-today", destination: "/rahu-kaal-today", permanent: true },
      { source: "/rahu-kala-today", destination: "/rahu-kaal-today", permanent: true },
      { source: "/rahu-kal-today", destination: "/rahu-kaal-today", permanent: true },
      { source: "/rahukalam-today", destination: "/rahu-kaal-today", permanent: true },
      // City-level rahu kaal variants
      { source: "/:city/rahu-kalam-today", destination: "/:city/rahu-kaal-today", permanent: true },
      { source: "/:city/rahu-kalam-today/:date", destination: "/:city/rahu-kaal-today/:date", permanent: true },
      { source: "/:city/rahu-kala-today", destination: "/:city/rahu-kaal-today", permanent: true },
      { source: "/:city/rahu-kala-today/:date", destination: "/:city/rahu-kaal-today/:date", permanent: true },

      // ─── Choghadiya spelling variants (308 permanent) ─────
      { source: "/chogadiya-today", destination: "/choghadiya-today", permanent: true },
      { source: "/chogdiya-today", destination: "/choghadiya-today", permanent: true },
      // City-level choghadiya variants
      { source: "/:city/chogadiya-today", destination: "/:city/choghadiya-today", permanent: true },
      { source: "/:city/chogadiya-today/:date", destination: "/:city/choghadiya-today/:date", permanent: true },

      // ─── Panchangam variants (308 permanent) ─────
      { source: "/panchangam", destination: "/", permanent: true },
      { source: "/panchangam/:city", destination: "/:city", permanent: true },
      { source: "/:city/panchangam", destination: "/:city", permanent: true },

      // Legacy /{city}?date=YYYY-MM-DD → /{city}/YYYY-MM-DD.
      // Handled at the redirect layer (not in the page) so [city]/page.tsx
      // stays statically renderable — reading searchParams in the page opts
      // the whole route into dynamic rendering, which breaks ISR + emits
      // `Cache-Control: private, no-store` and sinks SEO.
      {
        source: "/:city",
        has: [{ type: "query", key: "date", value: "(?<date>\\d{4}-\\d{2}-\\d{2})" }],
        destination: "/:city/:date",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/sitemap/:id(\\d+).xml",
        destination: "/sitemap/:id",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.vastucart.in",
      },
      {
        protocol: "https",
        hostname: "vastucart.in",
      },
    ],
  },
  async headers() {
    // Security headers apply to every response (HTML, XML, JS, JSON).
    // X-Robots-Tag is HTML-only — Google has been observed treating
    // unrecognised X-Robots-Tag directives on /sitemap.xml conservatively,
    // so we never attach `noai, noimageai` to non-HTML responses.
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "geolocation=(self), camera=(), microphone=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https://api.vastucart.in https://vastucart.in https://www.google-analytics.com https://www.googletagmanager.com",
          "connect-src 'self' https://api.vastucart.in https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://stats.g.doubleclick.net",
          "font-src 'self'",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      },
    ];

    return [
      {
        // X-Robots-Tag — exclude XML feeds (sitemap, RSS), JS (sw.js),
        // JSON, and any /api/* response. Effectively HTML-only.
        source:
          "/((?!api/|sitemap\\.xml|sitemap/|robots\\.txt|sw\\.js|feed/|.*\\.(?:xml|json|js|css|png|jpg|jpeg|svg|webp|ico|woff|woff2|ttf|otf|map|txt)).*)",
        headers: [{ key: "X-Robots-Tag", value: "noai, noimageai" }],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
