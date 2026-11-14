/**
 * Desk checks layered on a community submission.
 * Facts here are copied from the product's own site. Prices that were not on
 * those pages are not filled in.
 */

export type ListingSource = {
  href: string;
  label: string;
};

export type ListingFaq = {
  question: string;
  answer: string;
  sources: ListingSource[];
};

export type ListingSupplement = {
  checkedOn: string;
  introNote: string;
  pricingNote: string;
  faq: ListingFaq[];
  relatedSlugs: string[];
};

const HOME = "https://freegen.video/";
const TERMS = "https://freegen.video/terms";
const PRIVACY = "https://freegen.video/privacy";

const supplements: Record<string, ListingSupplement> = {
  freegenvideo: {
    checkedOn: "2026-11-14",
    introNote:
      "Community submission. The description was checked against the official site on November 14, 2026, using the homepage, the terms, and the privacy policy. This desk has not scored it.",
    pricingNote:
      "The one-video daily allowance was read on the homepage on November 14, 2026. freegen.video/pricing returned HTTP 404 that day. The terms describe credits and subscriptions and do not list a dollar price.",
    relatedSlugs: ["runway", "pika", "revid", "storyshort", "heygen", "speel", "motionfly"],
    faq: [
      {
        question: "What is FreeGenVideo?",
        answer:
          "FreeGenVideo is a browser AI video generator. Its homepage says it creates a video from a written prompt, or from a starting image plus a prompt, and that you can use it online with no sign-up and no app to install.",
        sources: [{ href: HOME, label: "FreeGenVideo homepage" }],
      },
      {
        question: "Is FreeGenVideo free?",
        answer:
          "The homepage says you can generate one free video per day, and that the allowance resets at 00:00 UTC. When free guest generation is available, that page says you can create without registering or logging in. The generator markup on November 14, 2026 showed Collart Video General, 540P or 720P, and 5 seconds. freegen.video/pricing returned HTTP 404. The terms describe credits and subscriptions, with prices shown before checkout, and do not print a dollar amount.",
        sources: [
          { href: HOME, label: "FreeGenVideo homepage" },
          { href: TERMS, label: "Terms of Service" },
          { href: PRIVACY, label: "Privacy Policy" },
        ],
      },
      {
        question: "What does FreeGenVideo do?",
        answer:
          "You describe a scene and the motion, or you upload a PNG, JPG, or WebP image up to 5 MB as a start frame and describe how it should move. A second image can be an end frame; the page labels that option 540P and 5 seconds. You then preview and download. The homepage lists social clips, story and animation ideas, and product concepts. Output options follow the current model. The example clips are credited to Seedance 2.0. The FAQ says a result will not always match the prompt, and that generated videos are private by default.",
        sources: [{ href: HOME, label: "FreeGenVideo homepage" }],
      },
    ],
  },
};

export function listingSupplement(slug: string) {
  return supplements[slug] ?? null;
}

/** Plain answer for FAQPage JSON-LD. The visible FAQ links the same sources. */
export function listingFaqText(item: ListingFaq) {
  if (!item.sources.length) return item.answer;
  const sources = item.sources.map((source) => `${source.label} (${source.href})`).join("; ");
  return `${item.answer} Source: ${sources}.`;
}
