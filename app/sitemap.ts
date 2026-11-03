import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import {
  directoryCategories,
  directoryCollections,
  getDirectoryListings,
} from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { getResearchDocs } from "@/lib/research";
import { absoluteUrl, audiences, topics } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, research, listings, glossary] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getDirectoryListings(),
    getGlossaryTerms(),
  ]);

  const staticPaths = [
    "/",
    "/blog",
    "/research",
    "/glossary",
    "/directory",
    "/submit",
    "/search",
    "/topics",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/advertise",
    "/trackers/breakthroughs",
    "/trackers/harnesses",
    "/trackers/benchmarks",
    "/verified-revenue",
    ...audiences.map((item) => item.href),
    ...topics.map((item) => item.href),
    ...directoryCategories.map((item) => `/directory/category/${item.slug}`),
    ...directoryCollections.map((item) => `/directory/${item.slug}`),
  ];

  const tags = Array.from(new Set(listings.flatMap((listing) => listing.tags)));

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...research.map((doc) => ({
      url: absoluteUrl(`/research/${doc.slug}`),
      lastModified: new Date(doc.updated ?? doc.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...glossary.map((term) => ({
      url: absoluteUrl(`/glossary/${term.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...listings.map((listing) => ({
      url: absoluteUrl(`/directory/${listing.slug}`),
      lastModified: new Date(listing.lastVerified),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: absoluteUrl(`/directory/tag/${tag}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
