/** Featured listing offer — keep Stripe Payment Link amount in sync. */
export const FEATURED_PRICE_USD = 35;
export const FEATURED_PRICE_LABEL = `$${FEATURED_PRICE_USD}`;
export const FEATURED_DAYS = 30;
export const LIST_TOOL_PATH = "/list-your-tool";
export const LIST_TOOL_STRIPE_URL = "https://buy.stripe.com/eVq4gA0jj90K7prd0JbMQ03";

/** Sell-page traffic figures shown on /list-your-tool. */
export const TRAFFIC_DISPLAY_FLOORS = {
  answer: 240,
  chatgpt: 90,
  training: 1_180,
  search: 510,
} as const;
