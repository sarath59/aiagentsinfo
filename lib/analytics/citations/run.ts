import { redactSupabase, supabaseConfig, supabaseHeaders } from "@/lib/supabase";
import {
  askEngine,
  configuredEngines,
  type CitationEngine,
} from "@/lib/analytics/citations/engines";

export type CitationPrompt = {
  id: string;
  prompt: string;
  topic: string;
};

export type CitationRunSummary = {
  engines: CitationEngine[];
  prompts: number;
  checks: number;
  cited: number;
  skipped: string[];
  errors: string[];
};

export async function runCitationSweep(options?: {
  limitPrompts?: number;
  engines?: CitationEngine[];
}): Promise<CitationRunSummary> {
  const config = supabaseConfig();
  if (!config) throw new Error("Supabase is not configured.");

  const engines = options?.engines?.length ? options.engines : configuredEngines();
  const skipped: string[] = [];
  if (!engines.length) {
    return {
      engines: [],
      prompts: 0,
      checks: 0,
      cited: 0,
      skipped: ["No citation API keys set (OPENAI_API_KEY, PERPLEXITY_API_KEY, GEMINI_API_KEY, ANTHROPIC_API_KEY)."],
      errors: [],
    };
  }

  const available = new Set(configuredEngines());
  const useEngines = engines.filter((engine) => {
    if (available.has(engine)) return true;
    skipped.push(`${engine}: API key missing`);
    return false;
  });

  const limit = Math.max(1, Math.min(options?.limitPrompts ?? 20, 50));
  const prompts = await loadPrompts(config.restUrl, config.key, limit);
  const errors: string[] = [];
  let checks = 0;
  let cited = 0;

  for (const prompt of prompts) {
    for (const engine of useEngines) {
      const result = await askEngine(engine, prompt.prompt);
      if (!result.ok) {
        errors.push(`${engine}/${prompt.id}: ${result.error || "failed"}`);
        continue;
      }
      const saved = await insertCheck(config.restUrl, config.key, {
        prompt_id: prompt.id,
        engine,
        cited: result.cited,
        position: result.position,
        snippet: result.snippet,
        competitors: result.competitors,
        raw_ref: result.raw_ref.slice(0, 500),
      });
      if (!saved) {
        errors.push(`${engine}/${prompt.id}: insert failed`);
        continue;
      }
      checks += 1;
      if (result.cited) cited += 1;
    }
  }

  return {
    engines: useEngines,
    prompts: prompts.length,
    checks,
    cited,
    skipped,
    errors: errors.slice(0, 20),
  };
}

async function loadPrompts(restUrl: string, key: string, limit: number): Promise<CitationPrompt[]> {
  const response = await fetch(
    `${restUrl}/ai_citation_prompts?active=eq.true&select=id,prompt,topic&order=id.asc&limit=${limit}`,
    {
      headers: supabaseHeaders({ restUrl, key }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    },
  );
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`prompt read failed: ${redactSupabase(body, { restUrl, key })}`);
  }
  const rows = (await response.json()) as CitationPrompt[];
  return Array.isArray(rows) ? rows : [];
}

async function insertCheck(
  restUrl: string,
  key: string,
  row: {
    prompt_id: string;
    engine: string;
    cited: boolean;
    position: number | null;
    snippet: string;
    competitors: string;
    raw_ref: string;
  },
) {
  const response = await fetch(`${restUrl}/ai_citation_checks`, {
    method: "POST",
    headers: supabaseHeaders(
      { restUrl, key },
      { "Content-Type": "application/json", Prefer: "return=minimal" },
    ),
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.warn(`[citations] insert ${response.status}: ${redactSupabase(body, { restUrl, key })}`);
    return false;
  }
  await response.body?.cancel().catch(() => undefined);
  return true;
}
