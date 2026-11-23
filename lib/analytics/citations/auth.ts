import { authorizeBotTracking, botTrackingApiKey } from "@/lib/bot-tracking/auth";

/** Citation run endpoints use the same key as analytics reports. */
export function authorizeCronOrAnalytics(request: Request): {
  ok: true;
} | { ok: false; status: number; message: string } {
  const analytics = authorizeBotTracking(request);
  if (analytics.ok) return { ok: true };
  if (!botTrackingApiKey()) {
    return { ok: false, status: 503, message: "BOT_TRACKING_API_KEY is not configured." };
  }
  return { ok: false, status: 401, message: "Unauthorized." };
}
