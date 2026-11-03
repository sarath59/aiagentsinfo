import data from "@/data/verified-revenue.json";
import { absoluteUrl } from "@/lib/site";

export type Money = {
  amount: number;
  currency: "USD";
  display: string;
};

export type VerifiedEntry = {
  name: string;
  url: string;
  maker: string | null;
  summary: string;
  mrr: Money;
  revenue30d: Money | null;
  allTime: Money;
  activeSubscriptions: number;
  revenue: {
    sourceName: string;
    sourceUrl: string;
    verification: string;
    sourceUpdated: string;
    checked: string;
  };
  pricing: {
    summary: string;
    url: string;
    checked: string;
  };
};

export type OmittedEntry = {
  name: string;
  reason: string;
  sourceUrl: string;
};

const file = data as {
  checked: string;
  entries: VerifiedEntry[];
  omitted: OmittedEntry[];
};

export const verifiedRevenueChecked = file.checked;

export const verifiedRevenueEntries: VerifiedEntry[] = [...file.entries].sort(
  (a, b) => b.mrr.amount - a.mrr.amount,
);

export const omittedRevenueEntries: OmittedEntry[] = file.omitted;

export function verifiedRevenueJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Verified AI tool revenue",
    description:
      "AI tools and SaaS with payment-processor-verified revenue and a live public price, each with a source and a checked date.",
    url: absoluteUrl("/verified-revenue"),
    numberOfItems: verifiedRevenueEntries.length,
    itemListElement: verifiedRevenueEntries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: entry.url,
      description: entry.summary,
    })),
  };
}
