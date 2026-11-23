export type HitKind = "view" | "interact" | "discover";

const DISCOVER_PATHS = new Set([
  "/robots.txt",
  "/llms.txt",
  "/llms-full.txt",
  "/sitemap.xml",
  "/rss.xml",
  "/manifest.webmanifest",
  "/favicon.ico",
]);

const INTERACT_PREFIXES = [
  "/api/",
  "/mcp",
  "/.well-known/mcp",
];

/** Classify a request: discovery files, interactive endpoints, or a page view. */
export function hitKind(method: string, pathname: string): HitKind {
  const path = normalizePath(pathname);
  const verb = method.toUpperCase();

  if (verb !== "GET" && verb !== "HEAD") return "interact";

  if (DISCOVER_PATHS.has(path) || path.endsWith("/sitemap.xml") || path.endsWith("/robots.txt")) {
    return "discover";
  }

  for (const prefix of INTERACT_PREFIXES) {
    if (path === prefix.replace(/\/$/, "") || path.startsWith(prefix)) return "interact";
  }

  // Tool checkers and generators that bots may POST to are under /api; GETs on tool pages are views.
  return "view";
}

export function normalizePath(pathname: string) {
  if (!pathname) return "/";
  let path = pathname.split("?")[0] ?? "/";
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path.slice(0, 500) || "/";
}

/** Static / framework noise we never log, even for bots. */
export function shouldIgnorePath(pathname: string) {
  const path = normalizePath(pathname);
  if (path.startsWith("/_next/")) return true;
  if (path === "/api/bot-tracking" || path.startsWith("/api/bot-tracking/")) return true;
  if (path === "/api/analytics" || path.startsWith("/api/analytics/")) return true;
  if (path.startsWith("/badge/") && path.endsWith(".svg")) return true;
  if (/\.(?:css|js|map|woff2?|ttf|eot|png|jpe?g|gif|webp|avif|ico|svg)$/i.test(path)) {
    // Keep crawler-facing text/xml files.
    if (
      path === "/robots.txt" ||
      path === "/llms.txt" ||
      path === "/llms-full.txt" ||
      path.endsWith(".xml") ||
      path.endsWith(".txt")
    ) {
      return false;
    }
    return true;
  }
  return false;
}
