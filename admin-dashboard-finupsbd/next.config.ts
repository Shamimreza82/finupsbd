import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.finupsbd.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "finupsbd-backend-development.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
  // ── Dev performance optimizations ──
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "framer-motion",
    ],
  },
  logging: {
    fetches: { fullUrl: false },
  },
  devIndicators: false,
};

export default nextConfig;
