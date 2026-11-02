import { site, absoluteUrl } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> | unknown[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: absoluteUrl("/"),
    email: site.email,
    description: site.description,
    logo: absoluteUrl("/brand/mark-dark.svg"),
    image: absoluteUrl("/opengraph-image"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    publisher: { "@type": "Organization", name: site.name },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  byline: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.updated ?? input.date,
    mainEntityOfPage: absoluteUrl(input.path),
    author: { "@type": "Organization", name: input.byline },
    publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
  };
}

export function scholarlyArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  paperUrl?: string;
  paperAuthors?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.updated ?? input.date,
    url: absoluteUrl(input.path),
    author: { "@type": "Organization", name: site.bylines.research },
    publisher: { "@type": "Organization", name: site.name },
    ...(input.paperUrl ? { sameAs: input.paperUrl } : {}),
    ...(input.paperAuthors ? { about: input.paperAuthors } : {}),
  };
}

export function softwareJsonLd(input: {
  name: string;
  description: string;
  path: string;
  website: string;
  category: string;
  pricingSummary: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: input.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      url: input.website,
      description: input.pricingSummary,
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function defaultMetadata(title: string, description: string, path = "/") {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: "website" as const,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} · ${site.name}`,
      description,
    },
  };
}
