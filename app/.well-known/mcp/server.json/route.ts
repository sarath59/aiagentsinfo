import { mcpServerJson } from "@/lib/mcp";

export const runtime = "nodejs";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Access-Control-Allow-Origin": "*",
};

export function GET() {
  return Response.json(mcpServerJson, { headers });
}
