import snapshot from "@/data/framework-github-stats/2026-11.json";

const stars = new Map(snapshot.repos.map((repo) => [repo.repo, repo.stars]));

/** Star field from the November 5, 2026 GitHub snapshot. Null when that repo is not in the file. */
export function starsForRepo(repo: string): number | null {
  const value = stars.get(repo);
  return typeof value === "number" ? value : null;
}

export const FRAMEWORK_STARS_READ = snapshot.retrieved_at.slice(0, 10);
