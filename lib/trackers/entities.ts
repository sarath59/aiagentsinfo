import starsSnapshot from "@/data/trackers/stars-snapshot.json";
import {
  NPM_PACKAGES,
  PYPI_PACKAGES,
  STAR_REPOS,
  type TrackedPackage,
  type TrackedRepo,
} from "@/lib/trackers/catalog";

/** Pages published with this change. Data dates on each page are the read time, not this date. */
export const ENTITY_PAGES_PUBLISHED = "2026-11-11";

export const TOP_FRAMEWORK_STAR_PAGES = 10;

/** Coding CLIs. They are not rows on the framework stars or downloads tables. */
export const CLI_STAR_REPOS: TrackedRepo[] = [
  { id: "claude-code", name: "Claude Code", repo: "anthropics/claude-code", directory: "claude-code" },
  { id: "codex", name: "Codex CLI", repo: "openai/codex", directory: "codex" },
  { id: "gemini-cli", name: "Gemini CLI", repo: "google-gemini/gemini-cli", directory: "gemini" },
];

export const CLI_NPM_PACKAGES: TrackedPackage[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    package: "@anthropic-ai/claude-code",
    registry: "npm",
    repo: "anthropics/claude-code",
    directory: "claude-code",
  },
  {
    id: "codex",
    name: "Codex CLI",
    package: "@openai/codex",
    registry: "npm",
    repo: "openai/codex",
    directory: "codex",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    package: "@google/gemini-cli",
    registry: "npm",
    repo: "google-gemini/gemini-cli",
    directory: "gemini",
  },
];

export function frameworkStarPageRepos(): TrackedRepo[] {
  const byId = new Map(STAR_REPOS.map((item) => [item.id, item]));
  const ranked = [...starsSnapshot.rows].sort(
    (a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo),
  );
  const pages: TrackedRepo[] = [];
  for (const row of ranked) {
    const item = byId.get(row.id);
    if (!item) continue;
    pages.push(item);
    if (pages.length === TOP_FRAMEWORK_STAR_PAGES) break;
  }
  return pages;
}

export function starPageRepos(): TrackedRepo[] {
  const frameworks = frameworkStarPageRepos();
  const seen = new Set(frameworks.map((item) => item.id));
  return [...frameworks, ...CLI_STAR_REPOS.filter((item) => !seen.has(item.id))];
}

export function releasePageRepos(): TrackedRepo[] {
  return starPageRepos();
}

export function downloadPagePackages(): TrackedPackage[] {
  const seen = new Set<string>();
  const pages: TrackedPackage[] = [];
  for (const item of [...PYPI_PACKAGES, ...NPM_PACKAGES, ...CLI_NPM_PACKAGES]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    pages.push(item);
  }
  return pages;
}

export function isFrameworkStarPage(slug: string) {
  return frameworkStarPageRepos().some((item) => item.id === slug);
}

export function isCliPackage(slug: string) {
  return CLI_NPM_PACKAGES.some((item) => item.id === slug);
}

export function starPagePath(slug: string) {
  return `/trackers/stars/${slug}`;
}

export function downloadPagePath(slug: string) {
  return `/trackers/downloads/${slug}`;
}

export function releasePagePath(slug: string, month: string) {
  return `/trackers/releases/${slug}/${month}`;
}

export function registryPageUrl(item: Pick<TrackedPackage, "registry" | "package">) {
  if (item.registry === "npm") return `https://www.npmjs.com/package/${item.package}`;
  return `https://pypi.org/project/${item.package}/`;
}

export type EntityLink = { href: string; label: string };

export function crossLinks(input: {
  repo?: string;
  currentPath: string;
  releaseSlug?: string | null;
  releaseMonth?: string | null;
}): EntityLink[] {
  const links: EntityLink[] = [];
  if (input.repo) {
    const star = starPageRepos().find((item) => item.repo === input.repo);
    if (star) {
      const href = starPagePath(star.id);
      if (href !== input.currentPath) links.push({ href, label: `${star.name} GitHub stars` });
    }
    for (const item of downloadPagePackages().filter((entry) => entry.repo === input.repo)) {
      const href = downloadPagePath(item.id);
      if (href !== input.currentPath) links.push({ href, label: `${item.package} downloads` });
    }
  }
  if (input.releaseSlug && input.releaseMonth) {
    const href = releasePagePath(input.releaseSlug, input.releaseMonth);
    if (href !== input.currentPath) {
      const repo = releasePageRepos().find((item) => item.id === input.releaseSlug);
      links.push({ href, label: repo ? `${repo.name} releases` : "Releases" });
    }
  }
  return links;
}
