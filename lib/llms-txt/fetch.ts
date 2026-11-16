import dns from "node:dns";
import http from "node:http";
import https from "node:https";
import { isIP } from "node:net";
import zlib from "node:zlib";
import { isBlockedAddress } from "@/lib/robots/fetch-robots";
import { FILE_TIMEOUT_MS, MAX_BYTES, MAX_REDIRECTS } from "@/lib/llms-txt/limits";

const USER_AGENT = "aiagentsinfo-llms-checker/1.0 (+https://www.aiagentsinfo.com/tools/llms-txt-checker)";

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
  bytes: number;
  truncated: boolean;
};

export function rejectionForLlmsUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return "That is not a valid URL.";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return "Use an http or https URL.";
  if (url.username || url.password) return "Remove the username and password from the URL.";
  if (url.port && url.port !== "80" && url.port !== "443") return "This checker fetches port 80 or 443 only.";
  const host = url.hostname.toLowerCase().replace(/\.+$/, "");
  if (!host) return "That URL has no host.";
  if (blockedHostname(host) || isBlockedAddress(host)) {
    return "That host is not a public website this checker can fetch.";
  }
  return null;
}

export function originFromInput(input: string): URL {
  const raw = input.trim();
  if (!raw || raw.length > 300) throw new FetchError("Enter a domain or a URL.");
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    throw new FetchError("That is not a valid URL.");
  }
  const problem = rejectionForLlmsUrl(url.toString());
  if (problem) throw new FetchError(problem);
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

export async function fetchPublic(
  target: URL,
  options?: { method?: "GET" | "HEAD"; maxBytes?: number; timeoutMs?: number; deadline?: number; readBody?: boolean },
): Promise<PublicFetch> {
  const method = options?.method ?? "GET";
  const timeoutMs = budgetTimeout(options?.timeoutMs ?? FILE_TIMEOUT_MS, options?.deadline);
  return follow(target, method, 0, target.toString(), {
    maxBytes: options?.maxBytes ?? MAX_BYTES,
    timeoutMs,
    readBody: options?.readBody ?? method === "GET",
    deadline: options?.deadline,
  });
}

/** HEAD, then GET when HEAD is missing or refused. Does not keep the body. */
export async function fetchStatus(target: URL, deadline: number): Promise<PublicFetch> {
  const problem = rejectionForLlmsUrl(target.toString());
  if (problem) throw new FetchError(problem);
  try {
    const head = await fetchPublic(target, { method: "HEAD", readBody: false, deadline, timeoutMs: FILE_TIMEOUT_MS });
    if (head.status !== 400 && head.status !== 403 && head.status !== 405 && head.status !== 501 && head.status !== 0) {
      return head;
    }
  } catch {
    // GET below covers servers that reject HEAD.
  }
  return fetchPublic(target, { method: "GET", readBody: false, deadline, timeoutMs: FILE_TIMEOUT_MS });
}

function budgetTimeout(cap: number, deadline?: number) {
  if (!deadline) return cap;
  const left = deadline - Date.now();
  if (left < 250) throw new FetchError("The check ran out of time.");
  return Math.min(cap, left);
}

async function follow(
  target: URL,
  method: "GET" | "HEAD",
  redirects: number,
  requestedUrl: string,
  options: { maxBytes: number; timeoutMs: number; readBody: boolean; deadline?: number },
): Promise<PublicFetch> {
  const problem = rejectionForLlmsUrl(target.toString());
  if (problem) throw new FetchError(problem);
  const pinned = await resolvePublic(target.hostname);
  const response = await requestOnce(target, method, pinned, options.timeoutMs);
  const location = response.headers.location;
  if (response.status >= 300 && response.status < 400 && location) {
    response.stream.destroy();
    if (redirects >= MAX_REDIRECTS) throw new FetchError("The URL redirected more than 3 times.");
    let next: URL;
    try {
      next = new URL(location, target);
    } catch {
      throw new FetchError("The redirect target was not a valid URL.");
    }
    const nextMethod =
      response.status === 303 || (method === "HEAD" && response.status !== 307 && response.status !== 308)
        ? "GET"
        : method;
    return follow(next, nextMethod, redirects + 1, requestedUrl, options);
  }
  if (!options.readBody) {
    response.stream.destroy();
    return {
      requestedUrl,
      finalUrl: target.toString(),
      status: response.status,
      redirects,
      contentType: headerString(response.headers["content-type"]),
      body: "",
      bytes: 0,
      truncated: false,
    };
  }

  const limited = await readLimited(response.stream, options.maxBytes);
  let buffer = limited.body;
  let truncated = limited.truncated;
  try {
    buffer = decodeCompressed(buffer, response.headers["content-encoding"]);
  } catch {
    if (truncated) {
      throw new FetchError("The response was larger than 2 MB and the compressed body could not be decoded.");
    }
    throw new FetchError("The response could not be decoded.");
  }
  if (buffer.length > options.maxBytes) {
    buffer = buffer.subarray(0, options.maxBytes);
    truncated = true;
  }
  const body = buffer.toString("utf8").replace(/^\uFEFF/, "");
  return {
    requestedUrl,
    finalUrl: target.toString(),
    status: response.status,
    redirects,
    contentType: headerString(response.headers["content-type"]),
    body,
    bytes: buffer.length,
    truncated,
  };
}

async function resolvePublic(hostname: string) {
  const host = hostname.replace(/\.+$/, "");
  if (isIP(host)) {
    if (isBlockedAddress(host) || blockedHostname(host)) {
      throw new FetchError("That host is not a public website this checker can fetch.");
    }
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
  if (!chosen) throw new FetchError("That host did not resolve.");
  return { address: chosen.address, family: chosen.family === 6 ? 6 : 4 } as const;
}

function requestOnce(
  target: URL,
  method: "GET" | "HEAD",
  pinned: { address: string; family: 4 | 6 },
  timeoutMs: number,
) {
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
            Accept: "text/plain, text/markdown, application/xml, text/xml, text/html;q=0.1, */*;q=0.1",
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
          timeout: timeoutMs,
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
    let settled = false;
    const finish = (value: { body: Buffer; truncated: boolean }) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };
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
    stream.on("end", () => finish({ body: Buffer.concat(chunks), truncated }));
    stream.on("error", () => {
      if (truncated) finish({ body: Buffer.concat(chunks), truncated: true });
      else fail(new FetchError("The response ended early."));
    });
    stream.on("close", () => {
      if (truncated) finish({ body: Buffer.concat(chunks), truncated: true });
    });
  });
}

function decodeCompressed(buffer: Buffer, encoding: string | string[] | undefined) {
  const label = headerString(encoding)?.toLowerCase() ?? "";
  if (!buffer.length) return buffer;
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

function blockedHostname(host: string) {
  const name = host.toLowerCase().replace(/\.+$/, "");
  if (
    name === "localhost" ||
    name.endsWith(".localhost") ||
    name.endsWith(".local") ||
    name.endsWith(".internal")
  ) {
    return true;
  }
  if (name === "metadata.google.internal" || name === "metadata.goog") return true;
  if (/^0x[0-9a-f]+$/i.test(name) || /^\d+$/.test(name)) return true;
  if (/^\d{1,10}(\.\d{1,10}){1,3}$/.test(name) && isIP(name) === 0) return true;
  return false;
}
