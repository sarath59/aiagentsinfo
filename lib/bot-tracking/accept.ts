export type AcceptFlags = {
  accept: string;
  accept_html: boolean;
  accept_markdown: boolean;
  accept_json: boolean;
};

/** Parse Accept for study: HTML vs Markdown vs JSON negotiation. */
export function parseAccept(header: string | null | undefined): AcceptFlags {
  const accept = (header ?? "").replace(/[<>'"&]/g, "").trim().slice(0, 120);
  const lower = accept.toLowerCase();
  if (!lower) {
    return { accept: "", accept_html: false, accept_markdown: false, accept_json: false };
  }
  return {
    accept,
    accept_html: /text\/html|\*\/\*/.test(lower),
    accept_markdown: /text\/markdown|text\/x-markdown|text\/plain/.test(lower),
    accept_json: /application\/json|application\/ld\+json/.test(lower),
  };
}
