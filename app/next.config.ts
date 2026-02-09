import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
};

export default nextConfig;
