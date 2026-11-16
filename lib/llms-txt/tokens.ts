import { get_encoding, type Tiktoken } from "tiktoken";

let encoder: Tiktoken | null = null;

export const O200K_METHOD =
  "tiktoken o200k_base, special tokens included, counted on the text kept after the 2 MB cap";

/** Size estimate for a public file. Not a bill from any model vendor. */
export function countO200kTokens(text: string) {
  try {
    encoder ??= get_encoding("o200k_base");
    return { tokens: encoder.encode(text, "all").length, method: O200K_METHOD };
  } catch {
    return {
      tokens: Math.ceil(text.length / 4),
      method: "character count divided by 4, rounded up, because tiktoken o200k_base did not load",
    };
  }
}
