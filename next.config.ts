import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content is file-based and SEO-first. Keep the classic App Router
  // model so filter/search params and markdown pages stay straightforward.
  cacheComponents: false,
  // tiktoken loads a WASM file from its package. Keep it on Node's loader.
  serverExternalPackages: ["tiktoken", "@modelcontextprotocol/server", "mcp-handler"],
  async redirects() {
    return [
      {
        source: "/for/kids",
        destination: "/blog",
        statusCode: 301,
      },
      {
        source: "/directory/tag/kids",
        destination: "/topics/education",
        statusCode: 301,
      },
      {
        source: "/directory/submit",
        destination: "/submit",
        permanent: true,
      },
      {
        source: "/reports/YWktc2hvcH",
        destination: "/reports/ai-shopping-agents-next-6-months",
        statusCode: 308,
      },
      {
        source: "/directory/stalkr-ai",
        destination: "/directory/stalkr",
        statusCode: 308,
      },
      {
        source: "/newsletter",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/newsletter/:path*",
        destination: "/",
        statusCode: 308,
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
