import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { isBlockedHostname } from "@/lib/submissions";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/** A live host that refuses the checker still counts. A missing host does not. */
const PRESENT_STATUSES = new Set([401, 403, 405, 406, 429]);

type LookupFn = typeof lookup;
type FetchFn = typeof fetch;

export async function assertPublicUrlReachable(
  rawUrl: string,
  deps?: { fetch?: FetchFn; lookup?: LookupFn },
): Promise<{ ok: true } | { ok: false; message: string }> {
  const fetchImpl = deps?.fetch ?? fetch;
  const lookupImpl = deps?.lookup ?? lookup;
  let current = rawUrl;

  for (let hop = 0; hop < 5; hop += 1) {
    let url: URL;
    try {
      url = new URL(current);
    } catch {
      return { ok: false, message: "Enter a public website URL starting with http:// or https://." };
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return { ok: false, message: "Enter a public website URL starting with http:// or https://." };
    }
    if (url.username || url.password || isPrivateHost(url.hostname)) {
      return { ok: false, message: "Enter a public website URL." };
    }
    const resolved = await addressesFor(url.hostname, lookupImpl);
    if (!resolved.ok) return resolved;
    if (resolved.addresses.some((address) => isPrivateAddress(address))) {
      return { ok: false, message: "Enter a public website URL." };
    }

    let response: Response;
    try {
      response = await fetchImpl(url.href, {
        method: "GET",
        redirect: "manual",
        signal: AbortSignal.timeout(8000),
        headers: { Accept: "text/html,*/*;q=0.8", "User-Agent": USER_AGENT },
      });
    } catch {
      return { ok: false, message: "We couldn't open that website. Check the URL and try again." };
    }
    await response.body?.cancel().catch(() => undefined);

    if (response.status >= 200 && response.status < 300) return { ok: true };
    if (PRESENT_STATUSES.has(response.status)) return { ok: true };
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        return { ok: false, message: "That website redirected without a destination." };
      }
      try {
        current = new URL(location, url).href;
      } catch {
        return { ok: false, message: "That website redirected to an invalid address." };
      }
      continue;
    }
    return {
      ok: false,
      message: "That website did not respond successfully. Check the URL and try again.",
    };
  }

  return { ok: false, message: "That website redirected too many times." };
}

async function addressesFor(
  hostname: string,
  lookupImpl: LookupFn,
): Promise<{ ok: true; addresses: string[] } | { ok: false; message: string }> {
  if (isIP(hostname)) return { ok: true, addresses: [hostname] };
  try {
    const records = await lookupImpl(hostname, { all: true, verbatim: true });
    const addresses = records.map((record) => record.address);
    if (!addresses.length) {
      return { ok: false, message: "We couldn't find that website." };
    }
    return { ok: true, addresses };
  } catch {
    return { ok: false, message: "We couldn't find that website." };
  }
}

function isPrivateHost(hostname: string) {
  return isBlockedHostname(hostname) || (isIP(hostname) !== 0 && isPrivateAddress(hostname));
}

export function isPrivateAddress(address: string) {
  const host = address.toLowerCase().replace(/^\[|\]$/g, "");
  if (isBlockedHostname(host)) return true;
  if (host === "::" || host === "::1") return true;
  if (host.startsWith("fe80:") || host.startsWith("fc") || host.startsWith("fd")) return true;
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/.exec(host);
  if (mapped) return isBlockedHostname(mapped[1]);
  return false;
}
