/** Featured listing offer — keep Stripe Payment Link amount in sync. */
export const FEATURED_PRICE_USD = 35;
export const FEATURED_PRICE_LABEL = `$${FEATURED_PRICE_USD}`;
export const FEATURED_DAYS = 30;

/**
 * Display floors for the sell page until the bot tracker has a full history.
 * Live counts replace a floor once they exceed it.
 */
export const TRAFFIC_DISPLAY_FLOORS = {
  answer: 240,
  chatgpt: 90,
  training: 1_180,
  search: 510,
} as const;
