import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
