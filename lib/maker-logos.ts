import fs from "node:fs";
import path from "node:path";

export type MakerLogoThumb = {
  source: string;
  file: string;
  width: number;
  height: number;
  bytes: number;
};

const manifestPath = path.join(process.cwd(), "public", "logos", "makers", "manifest.json");
const resolved = new Map<string, string>();
let manifest: Record<string, MakerLogoThumb> | null = null;

function readManifest() {
  if (manifest) return manifest;
  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as Record<string, MakerLogoThumb>;
    manifest = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    manifest = {};
  }
  return manifest;
}

/**
 * Local brand files pass through. Remote maker logos are served only from the
 * sized thumbnail cache. A miss returns an empty string so the initial badge
 * shows instead of the original file.
 */
export function cachedMakerLogo(slug: string, source: string | undefined) {
  const logo = source?.trim() ?? "";
  const key = `${slug}\n${logo}`;
  const hit = resolved.get(key);
  if (hit !== undefined) return hit;

  let value = "";
  if (logo.startsWith("/")) {
    value = logo;
  } else if (/^https?:\/\//i.test(logo)) {
    const row = readManifest()[slug];
    if (row && row.source === logo && row.file.startsWith("/logos/makers/")) {
      const absolute = path.join(process.cwd(), "public", row.file.replace(/^\//, ""));
      if (fs.existsSync(absolute)) value = row.file;
    }
  }
  resolved.set(key, value);
  return value;
}
