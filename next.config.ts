import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Image Optimization ───
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  // ─── Vercel-friendly headers for glass/blur effects ───
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // ─── Compression ───
  compress: true,

  // ─── Trailing slash (Vercel handles both, but explicit is clean) ───
  trailingSlash: false,
};

export default nextConfig;
