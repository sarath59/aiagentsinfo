import { generateLlmsTxt } from "@/lib/llms-txt/generate";
import { FetchError } from "@/lib/llms-txt/fetch";
import { readToolPost, toolJson } from "@/lib/llms-txt/guard";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const read = await readToolPost(request, 20_000);
  if (!read.ok) return read.response;
  const body = read.body as { target?: unknown };
  if (typeof body.target !== "string") return toolJson({ error: "Enter a domain or a URL." }, 400);
  try {
    const result = await generateLlmsTxt(body.target);
    return toolJson(result);
  } catch (error) {
    const message = error instanceof FetchError ? error.message : "A draft could not be generated.";
    return toolJson({ error: message }, 400);
  }
}
