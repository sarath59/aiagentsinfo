import dns from "node:dns";
import http from "node:http";
import https from "node:https";
import { BlockList, isIP } from "node:net";
import zlib from "node:zlib";

const MAX_REDIRECTS = 3;
const MAX_BYTES = 500 * 1024;
const TIMEOUT_MS = 8_000;
const USER_AGENT =
  "aiagentsinfo-robots-checker/1.0 (+https://www.aiagentsinfo.com/tools/ai-crawler-robots-txt-checker)";

const blockList = new BlockList();
blockList.addSubnet("0.0.0.0", 8, "ipv4");
blockList.addSubnet("10.0.0.0", 8, "ipv4");
blockList.addSubnet("100.64.0.0", 10, "ipv4");
blockList.addSubnet("127.0.0.0", 8, "ipv4");
blockList.addSubnet("169.254.0.0", 16, "ipv4");
blockList.addSubnet("172.16.0.0", 12, "ipv4");
blockList.addSubnet("192.0.0.0", 24, "ipv4");
blockList.addSubnet("192.168.0.0", 16, "ipv4");
blockList.addSubnet("198.18.0.0", 15, "ipv4");
blockList.addSubnet("224.0.0.0", 4, "ipv4");
blockList.addAddress("255.255.255.255", "ipv4");
blockList.addAddress("::", "ipv6");
blockList.addAddress("::1", "ipv6");
blockList.addSubnet("fc00::", 7, "ipv6");
blockList.addSubnet("fe80::", 10, "ipv6");
blockList.addSubnet("ff00::", 8, "ipv6");

export class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetchError";
  }
}

export type PublicFetch = {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  redirects: number;
  contentType: string | null;
  body: string;
  truncated: boolean;
  html: boolean;
};

export function rejectionForUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return "That is not a valid URL.";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return "Use an http or https URL.";
  if (url.username || url.password) return "Remove the username and password from the URL.";
  if (url.port && url.port !== "80" && url.port !== "443") {
    return "This checker fetches robots.txt on port 80 or 443 only.";
  }
  const host = url.hostname.toLowerCase().replace(/\.+$/, "");
  if (!host) return "That URL has no host.";
  if (isBlockedHostname(host)) return "That host is not a public website this checker can fetch.";
  if (isBlockedAddress(host)) return "That host is not a public website this checker can fetch.";
  return null;
}

export function robotsUrlFromInput(input: string): URL {
  const raw = input.trim();
  if (!raw || raw.length > 300) throw new FetchError("Enter a domain or a URL.");
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  const reason = rejectionForUrl(withScheme);
  if (reason && !withScheme.startsWith("http")) throw new FetchError(reason);
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    throw new FetchError("That is not a valid URL.");
  }
  const problem = rejectionForUrl(url.toString());
  if (problem) throw new FetchError(problem);
  url.pathname = "/robots.txt";
  url.search = "";
  url.hash = "";
  return url;
}

export function isBlockedAddress(address: string) {
  let ip = address.trim().toLowerCase();
  if (ip.startsWith("[") && ip.endsWith("]")) ip = ip.slice(1, -1);
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) ip = mapped[1];
  const family = isIP(ip);
  if (family === 0) return false;
  if (family === 4) return blockList.check(ip, "ipv4");
  return blockList.check(ip, "ipv6");
}

export async function fetchPublicText(target: URL, method: "GET" | "HEAD" = "GET"): Promise<PublicFetch> {
  return follow(target, method, 0, target.toString());
}

export async function fetchLlms(url: URL): Promise<PublicFetch | null> {
  try {
    const head = await fetchPublicText(url, "HEAD");
    if (head.status === 405 || head.status === 501 || head.status === 400) return fetchPublicText(url, "GET");
    return head;
  } catch {
    try {
      return await fetchPublicText(url, "GET");
    } catch {
      return null;
    }
  }
}

export async function fetchRobotsAndLlms(input: string) {
  const robotsUrl = robotsUrlFromInput(input);
  const llmsUrl = new URL("/llms.txt", robotsUrl);
  const [robots, llms] = await Promise.all([fetchPublicText(robotsUrl, "GET"), fetchLlms(llmsUrl)]);
  return { robots, llms, robotsUrl: robotsUrl.toString() };
}

async function follow(target: URL, method: "GET" | "HEAD", redirects: number, requestedUrl: string): Promise<PublicFetch> {
  const problem = rejectionForUrl(target.toString());
  if (problem) throw new FetchError(problem);
  const pinned = await resolvePublic(target.hostname);
  const response = await requestOnce(target, method, pinned);
  const location = response.headers.location;
  if (response.status >= 300 && response.status < 400 && location) {
    response.stream.resume();
    if (redirects >= MAX_REDIRECTS) throw new FetchError("robots.txt redirected more than 3 times.");
    let next: URL;
    try {
      next = new URL(location, target);
    } catch {
      throw new FetchError("The redirect target was not a valid URL.");
    }
    const nextMethod =
      response.status === 303 || (method === "HEAD" && response.status !== 307 && response.status !== 308) ? "GET" : method;
    return follow(next, nextMethod, redirects + 1, requestedUrl);
  }

  const limited = await readLimited(response.stream, method === "HEAD" ? 0 : MAX_BYTES);
  let buffer = limited.body;
  if (method !== "HEAD" && buffer.length) {
    try {
      buffer = decodeCompressed(buffer, response.headers["content-encoding"]);
    } catch {
      throw new FetchError("The response could not be decoded.");
    }
  }
  const contentType = headerString(response.headers["content-type"]);
  const body = buffer.toString("utf8").replace(/^\uFEFF/, "");
  return {
    requestedUrl,
    finalUrl: target.toString(),
    status: response.status,
    redirects,
    contentType,
    body: method === "HEAD" ? "" : body,
    truncated: limited.truncated,
    html: looksLikeHtml(body, contentType),
  };
}

function looksLikeHtml(body: string, contentType: string | null) {
  if (contentType && /text\/html|application\/xhtml/i.test(contentType)) return true;
  const start = body.trimStart().slice(0, 200).toLowerCase();
  return start.startsWith("<!doctype html") || start.startsWith("<html") || start.startsWith("<head");
}

async function resolvePublic(hostname: string) {
  const host = hostname.replace(/\.+$/, "");
  if (isIP(host)) {
    if (isBlockedAddress(host)) throw new FetchError("That host is not a public website this checker can fetch.");
    return { address: host, family: isIP(host) as 4 | 6 };
  }
  let records: { address: string; family: number }[];
  try {
    records = await dns.promises.lookup(host, { all: true, verbatim: true });
  } catch {
    throw new FetchError("That host did not resolve.");
  }
  if (!records.length) throw new FetchError("That host did not resolve.");
  for (const record of records) {
    if (isBlockedAddress(record.address)) {
      throw new FetchError("That host is not a public website this checker can fetch.");
    }
  }
  const chosen = records[0];
  return { address: chosen.address, family: chosen.family === 6 ? 6 : 4 } as const;
}

function requestOnce(target: URL, method: "GET" | "HEAD", pinned: { address: string; family: 4 | 6 }) {
  const lib = target.protocol === "https:" ? https : http;
  const port = target.port ? Number(target.port) : target.protocol === "https:" ? 443 : 80;
  return new Promise<{ status: number; headers: http.IncomingHttpHeaders; stream: http.IncomingMessage }>(
    (resolve, reject) => {
      const req = lib.request(
        {
          protocol: target.protocol,
          hostname: target.hostname,
          servername: target.hostname,
          port,
          method,
          path: `${target.pathname}${target.search}`,
          headers: {
            Host: target.host,
            "User-Agent": USER_AGENT,
            Accept: "text/plain,text/html;q=0.1,*/*;q=0.1",
            "Accept-Encoding": "identity",
            Connection: "close",
          },
          lookup: (_hostname, options, callback) => {
            if (options.all) {
              callback(null, [{ address: pinned.address, family: pinned.family }]);
              return;
            }
            callback(null, pinned.address, pinned.family);
          },
          timeout: TIMEOUT_MS,
        },
        (response) => {
          resolve({ status: response.statusCode ?? 0, headers: response.headers, stream: response });
        },
      );
      req.on("timeout", () => {
        req.destroy();
        reject(new FetchError("The site did not answer in time."));
      });
      req.on("error", () => reject(new FetchError("The site could not be reached.")));
      req.end();
    },
  );
}

function readLimited(stream: http.IncomingMessage, max: number) {
  return new Promise<{ body: Buffer; truncated: boolean }>((resolve, reject) => {
    if (max === 0) {
      stream.resume();
      stream.on("error", () => resolve({ body: Buffer.alloc(0), truncated: false }));
      stream.on("end", () => resolve({ body: Buffer.alloc(0), truncated: false }));
      return;
    }
    const chunks: Buffer[] = [];
    let total = 0;
    let truncated = false;
    stream.on("data", (chunk: Buffer) => {
      if (truncated) return;
      total += chunk.length;
      if (total > max) {
        truncated = true;
        const keep = chunk.length - (total - max);
        if (keep > 0) chunks.push(chunk.subarray(0, keep));
        stream.destroy();
        return;
      }
      chunks.push(chunk);
    });
    stream.on("end", () => resolve({ body: Buffer.concat(chunks), truncated }));
    stream.on("error", () => {
      if (truncated) resolve({ body: Buffer.concat(chunks), truncated: true });
      else reject(new FetchError("The response ended early."));
    });
    stream.on("close", () => {
      if (truncated) resolve({ body: Buffer.concat(chunks), truncated: true });
    });
  });
}

function decodeCompressed(buffer: Buffer, encoding: string | string[] | undefined) {
  const label = headerString(encoding)?.toLowerCase() ?? "";
  if (label.includes("br")) return zlib.brotliDecompressSync(buffer);
  if (label.includes("gzip") || (buffer.length > 2 && buffer[0] === 0x1f && buffer[1] === 0x8b)) {
    return zlib.gunzipSync(buffer);
  }
  if (label.includes("deflate")) return zlib.inflateSync(buffer);
  return buffer;
}

function headerString(value: string | string[] | undefined) {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

function isBlockedHostname(host: string) {
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    return true;
  }
  if (host === "metadata.google.internal" || host === "metadata.goog" || host === "0.0.0.0") return true;
  if (/^0x[0-9a-f]+$/i.test(host) || /^\d+$/.test(host)) return true;
  if (/^\d{1,10}(\.\d{1,10}){1,3}$/.test(host) && isIP(host) === 0) return true;
  return false;
}
