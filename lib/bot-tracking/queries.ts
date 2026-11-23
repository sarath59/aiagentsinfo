import { redactSupabase, supabaseConfig, supabaseHeaders, type SupabaseConfig } from "@/lib/supabase";

export async function supabaseSelect(pathAndQuery: string) {
  const config = supabaseConfig();
  if (!config) throw new Error("Supabase is not configured.");
  return select(config, pathAndQuery);
}

async function select(config: SupabaseConfig, pathAndQuery: string) {
  const response = await fetch(`${config.restUrl}/${pathAndQuery}`, {
    headers: supabaseHeaders(config),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Supabase read failed (HTTP ${response.status}): ${redactSupabase(body, config)}`);
  }
  return response.json();
}

export function daysAgoIso(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString();
}
