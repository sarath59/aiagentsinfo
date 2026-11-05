import { adminAuthorized, adminKey } from "@/lib/analytics/auth";
import { loadSummary } from "@/lib/analytics/summary";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const queryKey = url.searchParams.get("key");
  const jar = await cookies();
  const presented = queryKey || jar.get("aai_admin")?.value || "";
  if (!adminKey()) {
    return Response.json(
      { ok: false, error: "ANALYTICS_ADMIN_KEY is not set" },
      { status: 503, headers: privateHeaders() },
    );
  }
  if (!adminAuthorized(presented)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401, headers: privateHeaders() });
  }

  const days = Number(url.searchParams.get("days") || 14);
  try {
    const summary = await loadSummary(days);
    return Response.json(summary, { headers: privateHeaders() });
  } catch (error) {
    console.error("[analytics] summary failed");
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : "summary failed" },
      { status: 500, headers: privateHeaders() },
    );
  }
}

function privateHeaders() {
  return {
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "private, no-store",
  };
}
