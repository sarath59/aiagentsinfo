import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";
import { assertStructuredData } from "@/lib/structured-data";

export {
  articleJsonLd,
  authorNode,
  breadcrumbJsonLd,
  datasetJsonLd,
  datasetLicenseUrl,
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
  /**
   * Open Graph object type. `article` is only for pages that already emit Article JSON-LD.
   * Reports stay `website`; their structured data is Dataset, not Article.
   */
  openGraphType?: "website" | "article";
};

/** File route from `app/opengraph-image.tsx`. Same image the homepage already emits. */
const DEFAULT_SOCIAL_IMAGE_PATH = "/opengraph-image";

/** Changes the image URL when the tagline changes, so crawlers do not keep the previous card. */
function cardVersion(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function defaultSocialImage() {
  return {
    url: absoluteUrl(`${DEFAULT_SOCIAL_IMAGE_PATH}?v=${cardVersion(site.tagline)}`),
    type: "image/png" as const,
    width: 1200,
    height: 630,
    alt: `${site.name} — ${site.tagline}`,
  };
}

export function defaultMetadata(title: string, description: string, path = "/", options: MetaOptions = {}) {
  const index = options.index !== false;
  const canonical = absoluteUrl(options.canonicalPath ?? path);
  const openGraphType = options.openGraphType ?? "website";
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: canonical,
      siteName: site.name,
      type: openGraphType,
      locale: site.locale,
      images: [defaultSocialImage()],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} · ${site.name}`,
      description,
      images: [defaultSocialImage()],
    },
    robots: index ? indexRobots : noindexRobots,
  };
}
