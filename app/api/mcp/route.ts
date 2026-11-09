import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import {
  MCP_MAX_BODY_BYTES,
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
  compareAgents,
  getAgent,
  listCategories,
  listComparisons,
  listFreeTools,
  mcpInstructions,
  mcpReadOnlyAnnotations,
  searchAgents,
  searchResearch,
} from "@/lib/mcp";
import { takeMcpLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Authorization, MCP-Protocol-Version, Mcp-Method, Mcp-Name, mcp-session-id, Last-Event-ID",
  "Access-Control-Expose-Headers": "mcp-session-id, MCP-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};

const mcpHandler = createMcpHandler(
  (server) => {
    server.registerTool(
      "search_agents",
      {
        title: "Search agents",
        description:
          "Search the AI Agents Info directory of AI agents and tools. Optional category slug. Each hit includes the canonical listing URL.",
        inputSchema: z.object({
          query: z.string().min(2).max(200).describe("Name, vendor, summary, tag, or use case."),
          category: z
            .string()
            .min(1)
            .max(80)
            .optional()
            .describe("Optional directory category slug or title, such as coding-agents."),
          limit: z.number().int().min(1).max(15).optional().describe("How many listings to return. Default 8."),
        }),
        annotations: mcpReadOnlyAnnotations,
      },
      async (args) => searchAgents(args),
    );

    server.registerTool(
      "get_agent",
      {
        title: "Get agent",
        description:
          "Read one directory listing by slug, including pricing, features, related listings, and the canonical URL.",
        inputSchema: z.object({
          slug: z.string().min(1).max(80).describe("Directory slug, such as claude-code or langchain."),
        }),
        annotations: mcpReadOnlyAnnotations,
      },
      async (args) => getAgent(args),
    );

    server.registerTool(
      "list_categories",
      {
        title: "List categories",
        description: "List directory categories that currently have listings, with counts and category page URLs.",
        inputSchema: z.object({}),
        annotations: mcpReadOnlyAnnotations,
      },
      async () => listCategories(),
    );

    server.registerTool(
      "compare_agents",
      {
        title: "Compare agents",
        description:
          "Place two to five directory listings side by side from fields already on the site. This is not a scored ranking.",
        inputSchema: z.object({
          slugs: z
            .union([
              z.array(z.string().min(1).max(80)).min(2).max(5),
              z.string().min(3).max(400),
            ])
            .describe("Two to five directory slugs, as an array or a comma-separated string."),
        }),
        annotations: mcpReadOnlyAnnotations,
      },
      async (args) => compareAgents(args),
    );

    server.registerTool(
      "search_research",
      {
        title: "Search research",
        description:
          "Search original research notes and paper breakdowns on AI Agents Info. Each hit includes the canonical research URL.",
        inputSchema: z.object({
          query: z.string().min(2).max(200).describe("Title, abstract, or topic."),
          limit: z.number().int().min(1).max(10).optional().describe("How many notes to return. Default 6."),
        }),
        annotations: mcpReadOnlyAnnotations,
      },
      async (args) => searchResearch(args),
    );

    server.registerTool(
      "list_free_tools",
      {
        title: "List free tools",
        description:
          "List directory listings whose pricing includes free or open source, plus the free tools hosted on this site. Each item includes its canonical URL.",
        inputSchema: z.object({
          category: z.string().min(1).max(80).optional().describe("Optional directory category slug or title."),
          limit: z.number().int().min(1).max(50).optional().describe("How many directory listings to return. Default 25."),
        }),
        annotations: mcpReadOnlyAnnotations,
      },
      async (args) => listFreeTools(args),
    );

    server.registerTool(
      "list_comparisons",
      {
        title: "List comparisons",
        description:
          "List the sourced comparison tables on AI Agents Info, such as harnesses, coding agents, and shopping agents.",
        inputSchema: z.object({
          query: z.string().min(1).max(200).optional().describe("Optional filter on the comparison title or summary."),
        }),
        annotations: mcpReadOnlyAnnotations,
      },
      async (args) => listComparisons(args),
    );
  },
  {
    serverInfo: {
      name: MCP_SERVER_NAME,
      version: MCP_SERVER_VERSION,
    },
    instructions: mcpInstructions,
  },
);

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function withCors(response: Response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders)) {
    if (!headers.has(key)) headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonRpcError(status: number, message: string, extra?: Record<string, string>) {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      id: null,
      error: { code: status === 429 ? -32000 : -32600, message },
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        ...corsHeaders,
        ...extra,
      },
    },
  );
}

async function handler(request: Request) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(length) && length > MCP_MAX_BODY_BYTES) {
    return jsonRpcError(413, "Request is too large.");
  }

  const limit = takeMcpLimit(`mcp:${clientIp(request)}`);
  if (!limit.ok) {
    return jsonRpcError(429, "Too many MCP requests from this network. Wait and retry.", {
      "Retry-After": String(limit.retryAfterSec),
    });
  }

  return withCors(await mcpHandler(request));
}

export { handler as GET, handler as POST, handler as DELETE, handler as OPTIONS };
