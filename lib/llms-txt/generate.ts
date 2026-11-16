import { FetchError, fetchPublic, originFromInput, rejectionForLlmsUrl } from "@/lib/llms-txt/fetch";
import {
  CHECK_BUDGET_MS,
  FILE_TIMEOUT_MS,
  PAGE_BYTES,
  PAGE_CAP,
  PAGE_CONCURRENCY,
  PAGE_TIMEOUT_MS,
  SITEMAP_CHILD_CAP,
  SITEMAP_URL_CAP,
} from "@/lib/llms-txt/limits";
import { mapLimit } from "@/lib/llms-txt/pool";
import { countO200kTokens } from "@/lib/llms-txt/tokens";

export type GeneratedSection = { heading: string; links: number };

export type GenerateResult = {
  host: string;
  sitemapUrl: string;
  draft: string;
  urlsFound: number;
  urlsUsed: number;
  pagesRead: number;
  sitemapTruncated: boolean;
  childSitemapsFetched: number;
  childSitemapsSkipped: number;
  notes: string[];
  tokens: number;
  tokenMethod: string;
  sections: GeneratedSection[];
};

const SKIP_EXT = /\.(?:pdf|png|jpe?g|gif|webp|svg|zip|gz|mp4|mp3|css|js|xml|json)$/i;

export async function generateLlmsTxt(input: string): Promise<GenerateResult> {
  const origin = originFromInput(input);
  const deadline = Date.now() + CHECK_BUDGET_MS;
  const sitemapUrl = new URL("/sitemap.xml", origin);
  const root = await fetchPublic(sitemapUrl, { deadline, timeoutMs: FILE_TIMEOUT_MS, maxBytes: PAGE_BYTES * 10 });
  if (root.status === 404 || root.status === 410) {
    throw new FetchError(`HTTP ${root.status} for /sitemap.xml. This generator needs a sitemap before it can draft llms.txt.`);
  }
  if (root.status < 200 || root.status >= 300) {
    throw new FetchError(`HTTP ${root.status} for /sitemap.xml. The draft was not written.`);
  }
  if (looksLikeHtml(root.body, root.contentType)) {
    throw new FetchError("sitemap.xml returned HTML. Publish an XML sitemap, then run the generator again.");
  }

  const notes: string[] = [];
  const collected: string[] = [];
  let truncated = root.truncated;
  let childrenFetched = 0;
  let childrenSkipped = 0;
  const index = /<sitemapindex[\s>]/i.test(root.body);
  const locs = extractLocs(root.body);

  if (index) {
    const children = locs.filter((loc) => sameHost(loc, origin));
    childrenSkipped += locs.length - children.length;
    const queue = children.slice(0, SITEMAP_CHILD_CAP);
    childrenSkipped += Math.max(0, children.length - queue.length);
    if (children.length > queue.length) truncated = true;
    const docs = await mapLimit(queue, 3, async (loc) => {
      if (Date.now() > deadline - 500) return null;
      let url: URL;
      try {
        url = new URL(loc);
      } catch {
        return null;
      }
      try {
        return await fetchPublic(url, {
          deadline,
          timeoutMs: FILE_TIMEOUT_MS,
          maxBytes: PAGE_BYTES * 10,
        });
      } catch {
        return null;
      }
    });
    for (const doc of docs) {
      if (!doc || doc.status < 200 || doc.status >= 300 || looksLikeHtml(doc.body, doc.contentType)) {
        childrenSkipped += 1;
        continue;
      }
      childrenFetched += 1;
      if (doc.truncated) truncated = true;
      for (const loc of extractLocs(doc.body)) {
        if (collected.length >= SITEMAP_URL_CAP) {
          truncated = true;
          break;
        }
        if (sameHost(loc, origin)) collected.push(loc);
      }
    }
    if (childrenSkipped) notes.push(`${childrenSkipped} sitemap URL${childrenSkipped === 1 ? "" : "s"} were skipped by the cap or the host check.`);
  } else {
    for (const loc of locs) {
      if (collected.length >= SITEMAP_URL_CAP) {
        truncated = true;
        break;
      }
      if (sameHost(loc, origin)) collected.push(loc);
      else childrenSkipped += 1;
    }
  }

  const unique = [...new Set(collected)];
  const groups = new Map<string, string[]>();
  for (const loc of unique) {
    let url: URL;
    try {
      url = new URL(loc);
    } catch {
      continue;
    }
    if (SKIP_EXT.test(url.pathname)) continue;
    const heading = sectionHeading(url);
    const list = groups.get(heading) ?? [];
    list.push(url.toString());
    groups.set(heading, list);
  }

  const picked = spread(groups, PAGE_CAP);
  const pages = await mapLimit(picked, PAGE_CONCURRENCY, async (item) => {
    if (Date.now() > deadline - 400) return { ...item, title: "", description: "", read: false };
    try {
      const page = await fetchPublic(new URL(item.url), {
        deadline,
        timeoutMs: PAGE_TIMEOUT_MS,
        maxBytes: PAGE_BYTES,
      });
      const html = looksLikeHtml(page.body, page.contentType) || page.body.includes("<title");
      if (page.status < 200 || page.status >= 300 || !html) {
        return { ...item, title: "", description: "", read: false };
      }
      const meta = extractMeta(page.body);
      return { ...item, title: meta.title, description: meta.description, read: true };
    } catch {
      return { ...item, title: "", description: "", read: false };
    }
  });

  const pagesRead = pages.filter((page) => page.read && (page.title || page.description)).length;
  const missed = pages.length - pagesRead;
  if (missed) notes.push(`${missed} of ${pages.length} page fetches had no title. Those links use the URL path as the name.`);
  if (truncated) {
    notes.push(`The sitemap sample stopped at ${SITEMAP_URL_CAP} URLs or ${SITEMAP_CHILD_CAP} child sitemaps.`);
  }
  notes.push(`${unique.length} sitemap URL${unique.length === 1 ? "" : "s"} were in range. This draft names ${pages.length}.`);

  const bySection = new Map<string, { url: string; title: string; description: string }[]>();
  for (const page of pages) {
    const list = bySection.get(page.heading) ?? [];
    list.push(page);
    bySection.set(page.heading, list);
  }
  const headings = [...bySection.keys()].sort((a, b) => {
    if (a === "Home") return -1;
    if (b === "Home") return 1;
    return a.localeCompare(b);
  });

  const day = new Date().toISOString().slice(0, 10);
  const lines = [
    `# ${origin.host}`,
    "",
    `> Draft llms.txt for ${origin.host}, built ${day} from ${root.finalUrl}. ${pages.length} of ${unique.length} sitemap URLs include a title or description read from the HTML. Review every line before you publish. Google's AI optimization guide says Google Search ignores llms.txt.`,
    "",
    "The links below are a sample grouped by the first path segment. Pages past the cap stay in the sitemap.",
    "",
  ];
  const sections: GeneratedSection[] = [];
  for (const heading of headings) {
    const list = bySection.get(heading) ?? [];
    lines.push(`## ${heading}`, "");
    for (const page of list) {
      lines.push(linkLine(page.title || pathName(page.url), page.url, page.description));
    }
    lines.push("");
    sections.push({ heading, links: list.length });
  }
  lines.push("## Optional", "");
  lines.push(
    linkLine(
      "Sitemap",
      root.finalUrl,
      `Source list of ${unique.length} URLs. URLs past this draft's cap are not copied here.`,
    ),
  );
  lines.push("");
  sections.push({ heading: "Optional", links: 1 });

  const draft = lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
  const counted = countO200kTokens(draft);
  return {
    host: origin.host,
    sitemapUrl: root.finalUrl,
    draft,
    urlsFound: unique.length,
    urlsUsed: pages.length,
    pagesRead,
    sitemapTruncated: truncated,
    childSitemapsFetched: childrenFetched,
    childSitemapsSkipped: childrenSkipped,
    notes,
    tokens: counted.tokens,
    tokenMethod: counted.method,
    sections,
  };
}

function extractLocs(xml: string) {
  const locs: string[] = [];
  const pattern = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  for (const match of xml.matchAll(pattern)) {
    const value = decodeXml(match[1] ?? "").trim();
    if (value) locs.push(value);
  }
  return locs;
}

function decodeXml(value: string) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'");
}

function sameHost(raw: string, origin: URL) {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (rejectionForLlmsUrl(url.toString())) return false;
  return hostKey(url.hostname) === hostKey(origin.hostname);
}

function hostKey(hostname: string) {
  return hostname.replace(/\.$/, "").replace(/^www\./, "").toLowerCase();
}

function sectionHeading(url: URL) {
  const segment = url.pathname.split("/").filter(Boolean)[0];
  if (!segment) return "Home";
  let name = segment;
  try {
    name = decodeURIComponent(segment);
  } catch {
    name = segment;
  }
  name = name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!name || /^optional$/i.test(name)) return name ? "Optional pages" : "Pages";
  return (name.charAt(0).toUpperCase() + name.slice(1)).slice(0, 80);
}

function spread(groups: Map<string, string[]>, max: number) {
  const keys = [...groups.keys()].sort((a, b) => {
    if (a === "Home") return -1;
    if (b === "Home") return 1;
    return a.localeCompare(b);
  });
  const indexes = new Map(keys.map((key) => [key, 0]));
  const picked: { heading: string; url: string }[] = [];
  while (picked.length < max) {
    let added = false;
    for (const key of keys) {
      const list = groups.get(key) ?? [];
      const index = indexes.get(key) ?? 0;
      if (index >= list.length) continue;
      picked.push({ heading: key, url: list[index] as string });
      indexes.set(key, index + 1);
      added = true;
      if (picked.length >= max) break;
    }
    if (!added) break;
  }
  return picked;
}

function extractMeta(html: string) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? cleanText(titleMatch[1] ?? "") : "";
  const description = readMeta(html, "description") || readMeta(html, "og:description");
  return { title: title.slice(0, 180), description: description.slice(0, 240) };
}

function readMeta(html: string, key: string) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${escaped}["'][^>]*>`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return cleanText(match[1]);
  }
  return "";
}

function cleanText(value: string) {
  return decodeXml(value.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function pathName(raw: string) {
  try {
    const url = new URL(raw);
    const last = url.pathname.split("/").filter(Boolean).at(-1);
    return last ? last.replace(/[-_]+/g, " ") : url.host;
  } catch {
    return raw;
  }
}

function linkLine(name: string, url: string, notes: string) {
  const safeName = name.replace(/[\[\]]/g, "").replace(/\s+/g, " ").trim() || url;
  const safeNotes = notes.replace(/\s+/g, " ").trim();
  return safeNotes ? `- [${safeName}](${url}): ${safeNotes}` : `- [${safeName}](${url})`;
}

function looksLikeHtml(body: string, contentType: string | null) {
  if (contentType && /text\/html|application\/xhtml/i.test(contentType)) return true;
  const start = body.trimStart().slice(0, 200).toLowerCase();
  return start.startsWith("<!doctype html") || start.startsWith("<html");
}
