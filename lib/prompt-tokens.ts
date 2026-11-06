import {
  get_encoding,
  get_encoding_name_for_model,
  type Tiktoken,
  type TiktokenEncoding,
  type TiktokenModel,
} from "tiktoken";

const encoders = new Map<TiktokenEncoding, Tiktoken>();

function encoder(name: TiktokenEncoding) {
  const cached = encoders.get(name);
  if (cached) return cached;
  const created = get_encoding(name);
  encoders.set(name, created);
  return created;
}

/** Count pasted text with tiktoken. Does not call a provider and does not keep the text. */
export function countTextTokens(text: string, modelId: string) {
  let encoding: TiktokenEncoding = "o200k_base";
  let exact = false;
  try {
    encoding = get_encoding_name_for_model(modelId as TiktokenModel);
    exact = true;
  } catch {
    encoding = "o200k_base";
    exact = false;
  }
  const tokens = encoder(encoding).encode(text, "all").length;
  return { tokens, encoding, exact };
}
