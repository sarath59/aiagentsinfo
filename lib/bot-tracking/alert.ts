type NewAgentAlert = {
  bot_token: string;
  operator: string;
  purpose: string;
  sample_path: string;
  sample_ua: string;
};

/** Optional webhook when a bot_token is seen for the first time. */
export async function deliverNewAgentAlert(alert: NewAgentAlert) {
  const url = process.env.BOT_TRACKING_ALERT_WEBHOOK?.trim();
  if (!url) return { delivered: false as const, reason: "no_webhook" as const };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "bot_tracking.new_agent",
        ...alert,
        at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(2000),
    });
    await response.body?.cancel().catch(() => undefined);
    return { delivered: response.ok, status: response.status };
  } catch {
    return { delivered: false as const, reason: "network" as const };
  }
}
