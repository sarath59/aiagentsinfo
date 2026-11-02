import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content is file-based and SEO-first. Keep the classic App Router
  // model so filter/search params and markdown pages stay straightforward.
  cacheComponents: false,
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
