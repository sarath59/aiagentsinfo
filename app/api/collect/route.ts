import { BadEvent, recordClientEvent } from "@/lib/analytics/record";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const noIndex = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store",
};

export async function POST(request: Request) {
  const site = request.headers.get("sec-fetch-site");
  if (site === "cross-site") return new Response(null, { status: 403, headers: noIndex });
  const claimed = Number(request.headers.get("content-length") || 0);
  if (claimed > 4096) return new Response(null, { status: 413, headers: noIndex });

  const raw = await request.text();
  if (!raw || raw.length > 4096) return new Response(null, { status: raw ? 413 : 400, headers: noIndex });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400, headers: noIndex });
  }

  try {
    await recordClientEvent(request, body);
    return new Response(null, { status: 204, headers: noIndex });
  } catch (error) {
    if (error instanceof BadEvent) return new Response(null, { status: 400, headers: noIndex });
    console.error("[analytics] collect failed");
    return new Response(null, { status: 500, headers: noIndex });
  }
}
