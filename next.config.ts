import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content is file-based and SEO-first. Keep the classic App Router
  // model so filter/search params and markdown pages stay straightforward.
  cacheComponents: false,
  async redirects() {
    return [
      {
        source: "/directory/submit",
        destination: "/submit",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "aiagentsinfo.com" }],
        destination: "https://www.aiagentsinfo.com/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
