import { authorBySlug } from "@/lib/authors";
import { communityListingIsIndexable, isGibberish, isSpamListing } from "@/lib/indexing";
import { site } from "@/lib/site";
import {
  articleJsonLd,
  assertStructuredData,
  breadcrumbJsonLd,
  organizationJsonLd,
  profilePageJsonLd,
  researchArticleJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

const editorial = authorBySlug("editorial");
if (!editorial) throw new Error("Missing editorial author");

assertStructuredData(organizationJsonLd());
assertStructuredData(websiteJsonLd());
assertStructuredData(
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]),
);
assertStructuredData(
  articleJsonLd({
    title: "Example",
    description: "A sourced explainer.",
    path: "/blog/example",
    date: "2026-11-03",
    updated: "2026-11-03",
    byline: site.bylines.editorial,
  }),
);
assertStructuredData(
  researchArticleJsonLd({
    title: "Notes on a paper",
    description: "Editorial notes.",
    path: "/research/example",
    date: "2026-10-18",
    updated: "2026-11-02",
    paperTitle: "ReAct",
    paperAuthors: "Shunyu Yao, Jeffrey Zhao",
    paperYear: 2022,
    paperUrl: "https://arxiv.org/abs/2210.03629",
  }),
);
assertStructuredData(
  profilePageJsonLd({
    name: editorial.name,
    description: editorial.description,
    path: `/authors/${editorial.slug}`,
    kind: editorial.kind,
    published: editorial.published,
    updated: editorial.updated,
  }),
);

function rejects(label: string, data: unknown) {
  try {
    assertStructuredData(data);
  } catch {
    return;
  }
  throw new Error(`Expected ${label} to fail validation`);
}

rejects("FAQPage", { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] });
rejects("SoftwareApplication", {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Example",
  offers: { "@type": "Offer", price: 0 },
});
rejects("Article without author url", {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Example",
  description: "Example",
  datePublished: "2026-11-03",
  dateModified: "2026-11-03",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.aiagentsinfo.com/blog/example" },
  author: { "@type": "Organization", name: "Desk" },
  publisher: { "@type": "Organization", name: "AI Agents Info" },
});

const spam = {
  communitySubmitted: true,
  summary: "cvrydutr yfvyvytvu yftyitgityyt yitvituibty",
  html: "<p>dsggf lhhh uhbuyobuyboy ubuoybnouy ug uogo uog uh ouyo h ouh uo uoy uy uoh uoh uoh</p>",
};
if (!isGibberish(spam.summary) || !isSpamListing(spam)) {
  throw new Error("Gibberish community submission should be treated as spam");
}
const thin = {
  communitySubmitted: true,
  summary: "Postiz is the ultimate agentic social media scheduler tool",
  html: "<p>Postiz is the ultimate agentic social media scheduler tool</p>",
};
if (isSpamListing(thin) || communityListingIsIndexable(thin)) {
  throw new Error("A repeated slogan should stay out of the index without being called spam");
}
const explained = `This product routes requests across model providers and keeps API keys in one place. ${"It explains setup, limits, and pricing in enough detail for a reader to decide whether it fits. ".repeat(6)}`;
if (
  !communityListingIsIndexable({
    communitySubmitted: true,
    summary: "An API gateway for language models.",
    html: `<p>${explained}</p>`,
  })
) {
  throw new Error("A long original community description should be indexable");
}

console.log("structured data ok");
