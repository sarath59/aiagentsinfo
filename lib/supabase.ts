/**
 * Server-only. Supabase Data API over fetch. The secret key (sb_secret_...) goes on the
 * apikey header only, because it is not a JWT. Never expose it to the browser.
 */
export type SupabaseConfig = { restUrl: string; key: string };

export function supabaseConfig(): SupabaseConfig | null {
  const rawUrl = process.env.SUPABASE_URL?.trim() ?? "";
  const key = process.env.SUPABASE_SECRET_KEY?.trim() ?? "";
  if (!rawUrl || !key) return null;
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  return { restUrl: `${url.origin}/rest/v1`, key };
}

export function supabaseHeaders(config: SupabaseConfig, extra?: Record<string, string>) {
  return {
    apikey: config.key,
    Accept: "application/json",
    ...extra,
  };
}

/** Removes the key from an error body before it is logged. */
export function redactSupabase(text: string, config: SupabaseConfig) {
  return text.replaceAll(config.key, "[key]").slice(0, 300);
}
