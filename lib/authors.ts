import { site } from "@/lib/site";

export const trustDates = {
  published: "2026-11-03",
  updated: "2026-11-03",
} as const;

export type DeskAuthor = {
  slug: string;
  name: string;
  kind: "Organization";
  description: string;
  knowsAbout: string[];
  published: string;
  updated: string;
};

export const authors = [
  {
    slug: "editorial",
    name: site.bylines.editorial,
    kind: "Organization",
    description:
      "The editorial desk of AI Agents Info. It writes explainers, news, and guides under one desk name. It is not a fictional person.",
    knowsAbout: ["AI agents", "AI tools", "agent harnesses"],
    published: trustDates.published,
    updated: trustDates.updated,
  },
  {
    slug: "research",
    name: site.bylines.research,
    kind: "Organization",
    description:
      "The research desk of AI Agents Info. It writes paper notes and cites the paper's own authors. It does not claim to be those authors.",
    knowsAbout: ["AI research", "language-model agents", "benchmarks"],
    published: trustDates.published,
    updated: trustDates.updated,
  },
] as const satisfies readonly DeskAuthor[];

export type AuthorSlug = (typeof authors)[number]["slug"];

export function authorBySlug(slug: string) {
  return authors.find((author) => author.slug === slug);
}

export function authorByName(name: string) {
  return authors.find((author) => author.name === name);
}

export function authorPath(slug: string) {
  return `/authors/${slug}`;
}
