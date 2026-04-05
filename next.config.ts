import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.logo.dev" },
      { protocol: "https", hostname: "logo.clearbit.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Old /companies/:slug → new French /entreprises/:slug
      {
        source: "/companies/:slug",
        destination: "/entreprises/:slug",
        permanent: true,
      },
      // Old /job/:slug → French job listings (expired jobs)
      {
        source: "/job/:slug",
        destination: "/emplois",
        permanent: true,
      },
      // Old /growth-jobs/:slug → French job listings
      {
        source: "/growth-jobs/:slug",
        destination: "/emplois",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
