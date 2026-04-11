import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
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
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noai, noimageai",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
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
        ],
      },
    ];
  },
};

export default nextConfig;
