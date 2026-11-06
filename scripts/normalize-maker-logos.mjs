/**
 * Downloads maker-submitted logo URLs and writes small WebP thumbnails
 * to public/logos/makers. A failed fetch keeps the previous thumbnail when
 * the source URL has not changed, and otherwise leaves the listing on the
 * initial-letter fallback. Never aborts the build.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "public", "logos", "makers");
const manifestPath = path.join(outDir, "manifest.json");
const SIZE = 128;
const CONCURRENCY = 4;

function loadManifest() {
  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function submissions() {
  const directory = path.join(root, "data", "submissions");
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json") && !file.startsWith(".") && !file.startsWith("_"))
    .map((file) => {
      const data = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
      const slug = String(data.slug || file.replace(/\.json$/, ""))
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "");
      const logoUrl = typeof data.logoUrl === "string" ? data.logoUrl.trim() : "";
      return { slug, logoUrl };
    })
    .filter((item) => item.slug && /^https?:\/\//i.test(item.logoUrl));
}

async function fetchLogo(url) {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
    headers: {
      accept: "image/avif,image/webp,image/png,image/jpeg,image/svg+xml,image/*;q=0.8,*/*;q=0.5",
      "user-agent": "Mozilla/5.0 (compatible; AIAgentsInfoLogoCache/1.0; +https://www.aiagentsinfo.com/)",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 32) throw new Error("response too small");
  if (buffer.length > 5_000_000) throw new Error(`response too large (${buffer.length} bytes)`);
  return buffer;
}

async function toThumb(buffer) {
  const head = buffer.subarray(0, 256).toString("utf8").toLowerCase();
  const image = sharp(buffer, {
    animated: false,
    density: head.includes("<svg") ? 192 : undefined,
    limitInputPixels: 20_000_000,
    failOn: "none",
  }).rotate();
  return image
    .resize(SIZE, SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: false,
    })
    .webp({ quality: 76, alphaQuality: 80, effort: 4 })
    .toBuffer();
}

async function normalizeOne(item, current) {
  const filename = `${item.slug}.webp`;
  const file = `/logos/makers/${filename}`;
  try {
    const source = await fetchLogo(item.logoUrl);
    const head = source.subarray(0, 256).toString("utf8").toLowerCase();
    const thumb = await toThumb(source);
    if (thumb.length < 32) throw new Error("thumbnail too small");
    // A tiny SVG is already smaller than a raster thumbnail. Cache the SVG itself.
    if (head.includes("<svg") && source.length < thumb.length && source.length <= 8_192) {
      const svgName = `${item.slug}.svg`;
      const svgFile = `/logos/makers/${svgName}`;
      fs.writeFileSync(path.join(outDir, svgName), source);
      const webpPath = path.join(outDir, filename);
      if (fs.existsSync(webpPath)) fs.unlinkSync(webpPath);
      console.log(`${item.slug}: kept SVG (${source.length} bytes, raster would be ${thumb.length})`);
      return {
        slug: item.slug,
        row: { source: item.logoUrl, file: svgFile, width: SIZE, height: SIZE, bytes: source.length },
      };
    }
    fs.writeFileSync(path.join(outDir, filename), thumb);
    console.log(`${item.slug}: ${source.length} bytes -> ${thumb.length} bytes`);
    return {
      slug: item.slug,
      row: { source: item.logoUrl, file, width: SIZE, height: SIZE, bytes: thumb.length },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const previous = current[item.slug];
    if (previous && previous.source === item.logoUrl && previous.file === file) {
      console.warn(`${item.slug}: kept cached thumbnail (${message})`);
      return { slug: item.slug, row: previous };
    }
    console.warn(`${item.slug}: fallback badge (${message})`);
    return { slug: item.slug, row: null };
  }
}

async function mapPool(items, worker) {
  const results = new Array(items.length);
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current]);
    }
  }
  const workers = Math.min(CONCURRENCY, items.length);
  await Promise.all(Array.from({ length: workers }, () => run()));
  return results;
}

const items = submissions();
fs.mkdirSync(outDir, { recursive: true });
const current = loadManifest();
const results = items.length ? await mapPool(items, (item) => normalizeOne(item, current)) : [];
const next = {};
for (const result of results) {
  if (result?.row) next[result.slug] = result.row;
}
fs.writeFileSync(manifestPath, `${JSON.stringify(next, null, 2)}\n`);
console.log(`maker logos: ${Object.keys(next).length} thumbnails, ${items.length - Object.keys(next).length} fallbacks`);
