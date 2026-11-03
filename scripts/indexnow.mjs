#!/usr/bin/env node
/**
 * Submit URLs to IndexNow so Bing (and engines that read IndexNow, including
 * ChatGPT search, Copilot, and DuckDuckGo) recrawl them.
 *
 * The key is public on purpose. It lives at public/<key>.txt and is served
 * from https://www.aiagentsinfo.com/<key>.txt. Do not put anything else in
 * that file.
 *
 * Usage:
 *   node scripts/indexnow.mjs --all
 *   node scripts/indexnow.mjs --changed [--wait]
 *   node scripts/indexnow.mjs --urls https://www.aiagentsinfo.com/blog ...
 *
 * --all     Every URL currently in the live sitemap.
 * --changed URLs touched by the latest push. On GitHub Actions this is
 *           GITHUB_EVENT_BEFORE..GITHUB_SHA. Locally it is HEAD~1..HEAD.
 *           Layout, component, or library edits submit the full sitemap.
 * --wait    Poll the key file until it returns the key (use right after deploy).
 * --dry-run Print the URL list and do not POST.
 */

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const HOST = "www.aiagentsinfo.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];
const MAX_URLS_PER_REQUEST = 10_000;
const KEY_FILE_RE = /^[A-Za-z0-9-]{8,128}\.txt$/;
const WAIT_MS = Number(process.env.INDEXNOW_WAIT_MS || 12 * 60 * 1000);
const WAIT_INTERVAL_MS = 10_000;

const SITEWIDE_FILES = new Set([
  "app/layout.tsx",
  "app/globals.css",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/not-found.tsx",
  "app/manifest.ts",
  "app/opengraph-image.tsx",
  "app/twitter-image.tsx",
  "next.config.ts",
  "package.json",
  "package-lock.json",
]);

const SITEWIDE_PREFIXES = ["components/", "lib/"];

const DYNAMIC_PREFIXES = [
  [/^app\/blog\/\[slug\]\/page\.tsx$/, "/blog/"],
  [/^app\/research\/\[slug\]\/page\.tsx$/, "/research/"],
  [/^app\/glossary\/\[slug\]\/page\.tsx$/, "/glossary/"],
  [/^app\/directory\/\[slug\]\/page\.tsx$/, "/directory/"],
  [/^app\/directory\/category\/\[slug\]\/page\.tsx$/, "/directory/category/"],
  [/^app\/directory\/tag\/\[slug\]\/page\.tsx$/, "/directory/tag/"],
  [/^app\/for\/\[slug\]\/page\.tsx$/, "/for/"],
  [/^app\/topics\/\[slug\]\/page\.tsx$/, "/topics/"],
];

const CONTENT_PATHS = [
  [/^content\/blog\/([^/]+)\.md$/, (slug) => [`/blog/${slug}`, "/blog"]],
  [/^content\/research\/([^/]+)\.md$/, (slug) => [`/research/${slug}`, "/research"]],
  [/^content\/glossary\/([^/]+)\.md$/, (slug) => [`/glossary/${slug}`, "/glossary"]],
  [/^content\/directory\/([^/]+)\.md$/, (slug) => [`/directory/${slug}`, "/directory"]],
  [/^data\/submissions\/([^/]+)\.json$/, (slug) => [`/directory/${slug}`, "/directory"]],
  [/^data\/verified-revenue\.json$/, () => ["/verified-revenue"]],
];

function findKey() {
  const publicDir = join(process.cwd(), "public");
  const matches = readdirSync(publicDir).filter((file) => KEY_FILE_RE.test(file));
  const keys = [];
  for (const file of matches) {
    const key = file.slice(0, -".txt".length);
    const body = readFileSync(join(publicDir, file), "utf8").trim();
    if (body === key) keys.push(key);
  }
  if (keys.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file in public/<key>.txt (found ${keys.length}). The file name and its contents must both be the key.`,
    );
  }
  const key = keys[0];
  return { key, keyLocation: `${ORIGIN}/${key}.txt` };
}

function toAbsolute(pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl === "/") return ORIGIN;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${ORIGIN}${path}`;
}

function sameHost(url) {
  try {
    return new URL(url).hostname === HOST;
  } catch {
    return false;
  }
}

async function fetchSitemapUrls() {
  const response = await fetch(`${ORIGIN}/sitemap.xml`, {
    headers: { "user-agent": "aiagentsinfo-indexnow" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`GET ${ORIGIN}/sitemap.xml returned ${response.status}`);
  }
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) =>
    decodeXml(match[1]),
  );
  const unique = [...new Set(urls)].filter(sameHost);
  if (unique.length === 0) {
    throw new Error("Sitemap did not contain any URLs for www.aiagentsinfo.com.");
  }
  return unique;
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    cwd: process.cwd(),
  }).trim();
}

function changedFiles() {
  const before = process.env.GITHUB_EVENT_BEFORE?.trim();
  const head = process.env.GITHUB_SHA?.trim() || "HEAD";
  if (before && !/^0+$/.test(before)) {
    return git([
      "diff",
      "--name-only",
      "--diff-filter=ACDMRTUX",
      `${before}..${head}`,
    ])
      .split("\n")
      .filter(Boolean);
  }
  try {
    git(["rev-parse", "--verify", "HEAD~1"]);
  } catch {
    return git(["ls-tree", "-r", "--name-only", "HEAD"]).split("\n").filter(Boolean);
  }
  return git(["diff", "--name-only", "--diff-filter=ACDMRTUX", "HEAD~1..HEAD"])
    .split("\n")
    .filter(Boolean);
}

function staticAppPath(file) {
  if (file === "app/page.tsx") return "/";
  const page = file.match(/^app\/(.+)\/page\.tsx$/);
  if (page && !page[1].includes("[")) return `/${page[1]}`;
  const route = file.match(/^app\/(.+)\/route\.tsx?$/);
  if (route && !route[1].startsWith("api/") && !route[1].includes("[")) {
    return `/${route[1]}`;
  }
  return null;
}

function classifyChanges(files) {
  const paths = new Set();
  const prefixes = [];
  const shared = [];

  for (const file of files) {
    if (SITEWIDE_FILES.has(file) || SITEWIDE_PREFIXES.some((prefix) => file.startsWith(prefix))) {
      shared.push(file);
      continue;
    }
    const dynamic = DYNAMIC_PREFIXES.find(([pattern]) => pattern.test(file));
    if (dynamic) {
      prefixes.push(dynamic[1]);
      continue;
    }
    const content = CONTENT_PATHS.find(([pattern]) => pattern.test(file));
    if (content) {
      const slug = file.match(content[0])[1];
      for (const path of content[1](slug)) paths.add(path);
      continue;
    }
    const page = staticAppPath(file);
    if (page) paths.add(page);
  }

  if (shared.length > 0) {
    return {
      mode: "all",
      reason: `Shared files changed (${shared.slice(0, 6).join(", ")}).`,
    };
  }
  if (paths.size === 0 && prefixes.length === 0) return { mode: "none" };
  return { mode: "list", paths: [...paths], prefixes };
}

function pathMatchesPrefix(pathname, prefix) {
  if (prefix === "/directory/") {
    const rest = pathname.slice(prefix.length);
    return rest.length > 0 && !rest.includes("/");
  }
  const index = prefix.slice(0, -1);
  return pathname === index || pathname.startsWith(prefix);
}

async function urlsForPlan(plan) {
  if (plan.mode === "all") return fetchSitemapUrls();
  const urls = new Set(plan.paths.map(toAbsolute));
  if (plan.prefixes.length > 0) {
    const sitemapUrls = await fetchSitemapUrls();
    for (const url of sitemapUrls) {
      const pathname = new URL(url).pathname;
      if (plan.prefixes.some((prefix) => pathMatchesPrefix(pathname, prefix))) {
        urls.add(url);
      }
    }
  }
  return [...urls];
}

function chunks(items, size) {
  const batches = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

async function waitForKey(keyLocation, key) {
  const started = Date.now();
  let last = "no response";
  while (Date.now() - started < WAIT_MS) {
    try {
      const response = await fetch(keyLocation, {
        redirect: "follow",
        cache: "no-store",
        headers: { "user-agent": "aiagentsinfo-indexnow" },
      });
      const text = (await response.text()).trim();
      if (response.status === 200 && text === key) {
        console.log(`IndexNow: key file is live (${keyLocation}).`);
        return true;
      }
      last =
        response.status === 200
          ? "HTTP 200 but the body was not the key"
          : `HTTP ${response.status}`;
    } catch (error) {
      last = error instanceof Error ? error.message : String(error);
    }
    const elapsed = Math.round((Date.now() - started) / 1000);
    console.log(`IndexNow: waiting for ${keyLocation} (${elapsed}s, last: ${last}).`);
    await new Promise((resolve) => setTimeout(resolve, WAIT_INTERVAL_MS));
  }
  console.error(`IndexNow: timed out waiting for the key file. Last: ${last}.`);
  return false;
}

async function submit(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "user-agent": "aiagentsinfo-indexnow",
    },
    body: JSON.stringify(payload),
  });
  const text = (await response.text()).trim();
  return { status: response.status, body: text.slice(0, 500) };
}

function parseArgs(argv) {
  const args = { all: false, changed: false, wait: false, dryRun: false, urls: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--all") args.all = true;
    else if (token === "--changed") args.changed = true;
    else if (token === "--wait") args.wait = true;
    else if (token === "--dry-run") args.dryRun = true;
    else if (token === "--urls") {
      while (argv[index + 1] && !argv[index + 1].startsWith("--")) {
        index += 1;
        args.urls.push(argv[index]);
      }
    } else if (token === "--help" || token === "-h") {
      console.log(
        "Usage: node scripts/indexnow.mjs (--all | --changed | --urls <url...>) [--wait] [--dry-run]",
      );
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }
  const modes = [args.all, args.changed, args.urls.length > 0].filter(Boolean).length;
  if (modes !== 1) {
    throw new Error("Specify exactly one of --all, --changed, or --urls <url...>.");
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { key, keyLocation } = findKey();

  let urls;
  if (args.urls.length > 0) {
    urls = args.urls.map(toAbsolute);
  } else if (args.all) {
    urls = await fetchSitemapUrls();
  } else {
    let files;
    try {
      files = changedFiles();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`IndexNow: git diff failed (${message}). Submitting the full sitemap.`);
      files = null;
    }
    if (files === null) {
      urls = await fetchSitemapUrls();
    } else {
      const plan = classifyChanges(files);
      if (plan.mode === "none") {
        console.log("IndexNow: no indexable URL changes in this push. Skipping.");
        return;
      }
      if (plan.mode === "all") {
        console.log(`IndexNow: ${plan.reason} Submitting the full sitemap.`);
      } else {
        console.log(
          `IndexNow: ${plan.paths.length} path(s) from the diff${
            plan.prefixes.length ? `, plus sitemap URLs under ${plan.prefixes.join(", ")}` : ""
          }.`,
        );
      }
      urls = await urlsForPlan(plan);
    }
  }

  urls = [...new Set(urls)].filter(sameHost);
  if (urls.length === 0) {
    console.log("IndexNow: nothing to submit.");
    return;
  }

  if (args.dryRun) {
    console.log(`IndexNow: dry run, ${urls.length} URL(s), no request sent.`);
    console.log(`keyLocation: ${keyLocation}`);
    for (const url of urls) console.log(url);
    return;
  }

  if (args.wait) {
    const live = await waitForKey(keyLocation, key);
    if (!live) process.exit(1);
  }

  console.log(`IndexNow: submitting ${urls.length} URL(s).`);
  console.log(`host: ${HOST}`);
  console.log(`keyLocation: ${keyLocation}`);

  let failed = false;
  for (const urlList of chunks(urls, MAX_URLS_PER_REQUEST)) {
    const payload = { host: HOST, key, keyLocation, urlList };
    for (const endpoint of ENDPOINTS) {
      try {
        const result = await submit(endpoint, payload);
        const detail = result.body ? ` ${result.body}` : "";
        console.log(`${endpoint} ${result.status}${detail}`);
        if (result.status !== 200 && result.status !== 202) failed = true;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`${endpoint} ERROR ${message}`);
        failed = true;
      }
    }
  }

  if (failed) process.exit(1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
