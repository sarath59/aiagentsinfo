import { redactSupabase, supabaseConfig, supabaseHeaders } from "@/lib/supabase";
import type { PaidListingRow } from "@/lib/paid-listings/types";

/** Insert a pre-pay lead. You match Stripe payments to these rows by hand. */
export async function insertPaidListingLead(row: {
  lead_token: string;
  email: string;
  tool_name: string;
  tool_url: string;
  tool_notes?: string;
}) {
  const config = supabaseConfig();
  if (!config) return { ok: false as const, reason: "no_supabase" as const };

  try {
    const response = await fetch(`${config.restUrl}/paid_listings`, {
      method: "POST",
      headers: supabaseHeaders(config, {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify({
        lead_token: row.lead_token,
        email: row.email,
        tool_name: row.tool_name,
        tool_url: row.tool_url,
        tool_notes: row.tool_notes || "",
        status: "pending_payment",
        stripe_session_id: "",
        updated_at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.warn(`[paid-listings] insert ${response.status}: ${redactSupabase(body, config)}`);
      return { ok: false as const, reason: "supabase" as const };
    }
    const data = (await response.json().catch(() => [])) as PaidListingRow[];
    return { ok: true as const, row: Array.isArray(data) ? data[0] : undefined };
  } catch {
    return { ok: false as const, reason: "network" as const };
  }
}
