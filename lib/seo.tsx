import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";
import { assertStructuredData } from "@/lib/structured-data";

export {
  articleJsonLd,
  authorNode,
  breadcrumbJsonLd,
  definedTermJsonLd,
  organizationJsonLd,
  profilePageJsonLd,
  researchArticleJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

export const indexRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const noindexRobots: Metadata["robots"] = {
  index: false,
  follow: true,
};

export function JsonLd({ data }: { data: Record<string, unknown> | unknown[] }) {
  assertStructuredData(data);
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

type MetaOptions = {
  index?: boolean;
  /** Clean URL when this response is a filtered or paginated variant. */
  canonicalPath?: string;
};

export function defaultMetadata(title: string, description: string, path = "/", options: MetaOptions = {}) {
  const index = options.index !== false;
  const canonical = absoluteUrl(options.canonicalPath ?? path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: canonical,
      siteName: site.name,
      type: "website" as const,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} · ${site.name}`,
      description,
    },
    robots: index ? indexRobots : noindexRobots,
  };
}
