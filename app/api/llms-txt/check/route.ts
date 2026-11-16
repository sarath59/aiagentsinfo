import { checkAbsoluteLinks, checkLlmsHost } from "@/lib/llms-txt/check";
import { FetchError } from "@/lib/llms-txt/fetch";
import { readToolPost, toolJson } from "@/lib/llms-txt/guard";
import { MAX_LINK_CHECKS } from "@/lib/llms-txt/limits";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const MAX_BODY = 80_000;

export async function POST(request: Request) {
  const read = await readToolPost(request, MAX_BODY);
  if (!read.ok) return read.response;
  const body = read.body as { target?: unknown; checkLinks?: unknown; urls?: unknown };

  if (Array.isArray(body.urls)) {
    const urls = body.urls.filter((url): url is string => typeof url === "string").slice(0, MAX_LINK_CHECKS + 5);
    if (!urls.length) return toolJson({ error: "Paste a file with at least one absolute https link." }, 400);
    try {
      const links = await checkAbsoluteLinks(urls);
      return toolJson({ links });
    } catch (error) {
      const message = error instanceof FetchError ? error.message : "Those links could not be checked.";
      return toolJson({ error: message }, 400);
    }
  }

  if (typeof body.target !== "string") return toolJson({ error: "Enter a domain or a URL." }, 400);
  try {
    const result = await checkLlmsHost(body.target, { checkLinks: body.checkLinks !== false });
    return toolJson(result);
  } catch (error) {
    const message = error instanceof FetchError ? error.message : "That site could not be checked.";
    return toolJson({ error: message }, 400);
  }
}
