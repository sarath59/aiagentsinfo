/**
 * Indexing rules for pages that would otherwise be thin, duplicate, or spam.
 * Word count is a mechanical check. The editorial policy describes the standard in prose.
 */

const FUNCTION_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "if",
  "of",
  "to",
  "for",
  "in",
  "on",
  "at",
  "by",
  "with",
  "from",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "it",
  "its",
  "this",
  "that",
  "these",
  "those",
  "we",
  "our",
  "you",
  "your",
  "they",
  "their",
  "can",
  "not",
  "into",
  "than",
  "then",
  "who",
  "what",
  "when",
  "where",
  "which",
  "how",
]);

/** Community descriptions shorter than this stay out of the sitemap and get noindex. */
export const COMMUNITY_INDEX_MIN_WORDS = 80;

export function visibleText(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function wordsOf(value: string) {
  return value.toLowerCase().match(/[a-z']+/g) ?? [];
}

/** Keyboard-mash and token soup. Real product sentences almost always use function words. */
export function isGibberish(value: string) {
  const words = wordsOf(value);
  if (words.length < 4) return false;
  if (/(.)\1{4,}/.test(value)) return true;
  const functionHits = words.filter((word) => FUNCTION_WORDS.has(word)).length;
  const longWords = words.filter((word) => word.length >= 6);
  if (words.length >= 6 && functionHits === 0) return true;
  if (words.length >= 4 && functionHits === 0 && longWords.length >= 3) return true;
  return false;
}

export function isSpamListing(listing: { communitySubmitted?: boolean; summary: string; html: string }) {
  if (!listing.communitySubmitted) return false;
  return isGibberish(listing.summary) || isGibberish(visibleText(listing.html));
}

export function communityListingIsIndexable(listing: {
  communitySubmitted?: boolean;
  summary: string;
  html: string;
}) {
  if (!listing.communitySubmitted) return true;
  if (isSpamListing(listing)) return false;
  const body = visibleText(listing.html);
  const summary = listing.summary.replace(/\s+/g, " ").trim();
  if (!body || !summary) return false;
  if (normalizeCopy(body) === normalizeCopy(summary)) return false;
  return wordCount(body) >= COMMUNITY_INDEX_MIN_WORDS;
}

function normalizeCopy(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function topicIsIndexable(
  slug: string,
  input: {
    posts: { topics: string[] }[];
    research: { topics: string[] }[];
    glossary: { topics?: string[] }[];
    listings: { category: string; useCases: string[]; tags: string[] }[];
  },
) {
  if (input.posts.some((post) => post.topics.includes(slug))) return true;
  if (input.research.some((doc) => doc.topics.includes(slug))) return true;
  if (input.glossary.some((term) => term.topics?.includes(slug))) return true;
  return input.listings.some(
    (listing) =>
      listing.category === slug || listing.useCases.includes(slug) || listing.tags.includes(slug),
  );
}
