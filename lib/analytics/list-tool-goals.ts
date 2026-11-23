/** Goals for the paid list-your-tool funnel. No emails or free-text PII in metadata. */

export const LIST_TOOL_CTA = "list_tool_cta";
export const LIST_TOOL_PAGE_VIEW = "list_tool_page_view";
export const LIST_TOOL_DWELL_15 = "list_tool_dwell_15";
export const LIST_TOOL_DWELL_30 = "list_tool_dwell_30";
export const LIST_TOOL_DWELL_60 = "list_tool_dwell_60";
export const LIST_TOOL_DWELL_120 = "list_tool_dwell_120";
export const LIST_TOOL_SCROLL_50 = "list_tool_scroll_50";
export const LIST_TOOL_SCROLL_90 = "list_tool_scroll_90";
export const LIST_TOOL_SECTION = "list_tool_section";
export const LIST_TOOL_BUY_CLICK = "list_tool_buy_click";
export const LIST_TOOL_BUY_VISIBLE = "list_tool_buy_visible";
export const LIST_TOOL_FREE_CLICK = "list_tool_free_click";
export const LIST_TOOL_EXIT = "list_tool_exit";
export const HERO_DIRECTORY_CLICK = "hero_directory_click";
export const HERO_TOOL_LOGO_CLICK = "hero_tool_logo_click";

export const LIST_TOOL_STRIPE_URL = "https://buy.stripe.com/eVq4gA0jj90K7prd0JbMQ03";
export const LIST_TOOL_PATH = "/list-your-tool";

export function listToolMeta(input: {
  placement?: string;
  section?: string;
  dwell_sec?: string;
  scroll_pct?: string;
  listing_slug?: string;
  cta?: string;
  code?: string;
}) {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(input)) {
    if (!value || typeof value !== "string") continue;
    const clean = value.replace(/[<>'"&]/g, "").trim().slice(0, 64);
    if (!clean || clean.includes("@")) continue;
    out[key] = clean;
  }
  return out;
}
