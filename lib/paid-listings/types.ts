export type PaidListingStatus =
  | "pending_payment"
  | "paid"
  | "listed"
  | "abandoned"
  | "refunded"
  | "failed";

export type PaidListingRow = {
  id?: number;
  lead_token: string;
  created_at?: string;
  updated_at?: string;
  email: string;
  tool_name: string;
  tool_url: string;
  tool_notes?: string;
  status?: PaidListingStatus;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  amount_cents?: number | null;
  currency?: string;
  listing_slug?: string;
  listed_at?: string | null;
  notes_internal?: string;
};
