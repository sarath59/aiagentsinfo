import { authorByName } from "@/lib/authors";
import { absoluteUrl, organizationSameAs, site } from "@/lib/site";

const ISO_DATE = /^\d{4}(-\d{2}-\d{2})?$/;

export function schemaDate(value: string) {
  if (ISO_DATE.test(value)) return value;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value.slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: absoluteUrl("/"),
    email: site.email,
    description: site.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/icon-512.png"),
      width: 512,
      height: 512,
    },
    sameAs: [...organizationSameAs],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}`,
      },
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

/** CC BY 4.0. Google Search Console expects this URL on every Dataset node. */
export const datasetLicenseUrl = "https://creativecommons.org/licenses/by/4.0/";

function publisherNode() {
  return {
    "@type": "Organization",
    name: site.name,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/icon-512.png"),
      width: 512,
      height: 512,
    },
    sameAs: [...organizationSameAs],
  };
}

export function authorNode(name: string) {
  const author = authorByName(name);
  if (!author) {
    return { "@type": "Organization" as const, name, url: absoluteUrl("/about") };
  }
  return {
    "@type": author.kind,
    name: author.name,
    url: absoluteUrl(`/authors/${author.slug}`),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  byline: string;
  about?: Record<string, unknown>;
  /** Our article. The paper, when `about` is set, keeps its own license. */
  license?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: schemaDate(input.date),
    dateModified: schemaDate(input.updated ?? input.date),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.path) },
    author: authorNode(input.byline),
    publisher: publisherNode(),
    ...(input.license ? { license: datasetLicenseUrl } : {}),
    ...(input.about ? { about: input.about } : {}),
  };
}

export function paperAuthors(value: string) {
  return value
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({ "@type": "Person" as const, name }));
}

/** The page is our article. The paper, when there is one, is `about`, with the paper's own authors. */
export function researchArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  paperUrl?: string;
  paperTitle?: string;
  paperAuthors?: string;
  paperYear?: number;
  license?: boolean;
}) {
  const about =
    input.paperUrl && input.paperTitle
      ? {
          "@type": "ScholarlyArticle",
          name: input.paperTitle,
          headline: input.paperTitle,
          url: input.paperUrl,
          ...(input.paperAuthors ? { author: paperAuthors(input.paperAuthors) } : {}),
          ...(input.paperYear ? { datePublished: String(input.paperYear) } : {}),
        }
      : undefined;
  return articleJsonLd({
    title: input.title,
    description: input.description,
    path: input.path,
    date: input.date,
    updated: input.updated,
    byline: site.bylines.research,
    about,
    license: input.license,
  });
}

function datasetOrganization() {
  return {
    "@type": "Organization" as const,
    name: site.name,
    url: absoluteUrl("/"),
  };
}

export function datasetJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  distributionPath?: string;
  isBasedOn?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    license: datasetLicenseUrl,
    datePublished: schemaDate(input.datePublished),
    dateModified: schemaDate(input.dateModified ?? input.datePublished),
    creator: datasetOrganization(),
    publisher: datasetOrganization(),
    ...(input.isBasedOn ? { isBasedOn: input.isBasedOn } : {}),
    ...(input.distributionPath
      ? {
          distribution: {
            "@type": "DataDownload",
            encodingFormat: "text/csv",
            contentUrl: absoluteUrl(input.distributionPath),
          },
        }
      : {}),
  };
}

export function webPageJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": absoluteUrl("/#website") },
    publisher: { "@id": absoluteUrl("/#organization") },
    ...(input.datePublished ? { datePublished: schemaDate(input.datePublished) } : {}),
    ...(input.dateModified ? { dateModified: schemaDate(input.dateModified) } : {}),
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function softwareApplicationJsonLd(input: {
  name: string;
  url: string;
  sameAs?: string | string[];
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  nested?: boolean;
}) {
  const url = input.url.startsWith("https://") ? input.url : absoluteUrl(input.url);
  const sameAs = input.sameAs
    ? Array.isArray(input.sameAs)
      ? input.sameAs
      : [input.sameAs]
    : undefined;
  return {
    ...(input.nested ? {} : { "@context": "https://schema.org" }),
    "@type": "SoftwareApplication",
    name: input.name,
    url,
    ...(sameAs?.length ? { sameAs: sameAs.length === 1 ? sameAs[0] : sameAs } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.applicationCategory ? { applicationCategory: input.applicationCategory } : {}),
    ...(input.operatingSystem ? { operatingSystem: input.operatingSystem } : {}),
  };
}

export function itemListJsonLd(input: {
  name: string;
  description: string;
  path: string;
  items: {
    name: string;
    url: string;
    description?: string;
    sameAs?: string | string[];
    applicationCategory?: string;
    operatingSystem?: string;
    software?: boolean;
  }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => {
      const url = item.url.startsWith("https://") ? item.url : absoluteUrl(item.url);
      if (item.software) {
        return {
          "@type": "ListItem",
          position: index + 1,
          item: softwareApplicationJsonLd({ ...item, url, nested: true }),
        };
      }
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url,
        ...(item.description ? { description: item.description } : {}),
      };
    }),
  };
}

export function profilePageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  kind: "Organization" | "Person";
  published: string;
  updated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: schemaDate(input.published),
    dateModified: schemaDate(input.updated),
    mainEntity: {
      "@type": input.kind,
      name: input.name,
      description: input.description,
      url: absoluteUrl(input.path),
      parentOrganization: { "@id": absoluteUrl("/#organization") },
    },
  };
}

export function definedTermJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inDefinedTermSet: absoluteUrl("/glossary"),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireString(record: Record<string, unknown>, key: string, path: string) {
  const value = record[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${path}.${key} must be a non-empty string`);
  }
  return value;
}

function requireDate(record: Record<string, unknown>, key: string, path: string) {
  const value = requireString(record, key, path);
  if (!ISO_DATE.test(value)) {
    throw new Error(`${path}.${key} must be an ISO date (YYYY-MM-DD or YYYY)`);
  }
}

function assertAuthor(value: unknown, path: string, requireUrl: boolean) {
  if (!isRecord(value)) throw new Error(`${path} must be an object`);
  const type = value["@type"];
  if (type !== "Person" && type !== "Organization") {
    throw new Error(`${path}.@type must be Person or Organization`);
  }
  requireString(value, "name", path);
  if (requireUrl) {
    const url = requireString(value, "url", path);
    if (!url.startsWith("https://")) throw new Error(`${path}.url must be an absolute https URL`);
  }
}

function assertNode(value: unknown, path: string) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNode(item, `${path}[${index}]`));
    return;
  }
  if (!isRecord(value)) return;
  const type = value["@type"];
  if (typeof type !== "string") return;

  if (type === "FAQPage") {
    if (!Array.isArray(value.mainEntity) || value.mainEntity.length < 1) {
      throw new Error(`${path}.mainEntity needs at least one Question`);
    }
    value.mainEntity.forEach((item, index) => {
      if (!isRecord(item)) throw new Error(`${path}.mainEntity[${index}] must be an object`);
      if (item["@type"] !== "Question") {
        throw new Error(`${path}.mainEntity[${index}].@type must be Question`);
      }
      requireString(item, "name", `${path}.mainEntity[${index}]`);
      if (!isRecord(item.acceptedAnswer) || item.acceptedAnswer["@type"] !== "Answer") {
        throw new Error(`${path}.mainEntity[${index}].acceptedAnswer must be an Answer`);
      }
      requireString(item.acceptedAnswer, "text", `${path}.mainEntity[${index}].acceptedAnswer`);
    });
  }
  if (type === "SoftwareApplication") {
    requireString(value, "name", path);
    if (value.aggregateRating || value.review) {
      throw new Error(
        `${path} must not include aggregateRating or review. This site does not publish ratings.`,
      );
    }
    if (value.url) {
      const url = requireString(value, "url", path);
      if (!url.startsWith("https://")) throw new Error(`${path}.url must be an absolute https URL`);
    }
    if (value.sameAs) {
      const sameAs = Array.isArray(value.sameAs) ? value.sameAs : [value.sameAs];
      sameAs.forEach((entry, index) => {
        if (typeof entry !== "string" || !entry.startsWith("https://")) {
          throw new Error(`${path}.sameAs[${index}] must be an absolute https URL`);
        }
      });
    }
  }

  if (type === "Organization") {
    requireString(value, "name", path);
    if (value.logo) {
      if (!isRecord(value.logo) || value.logo["@type"] !== "ImageObject") {
        throw new Error(`${path}.logo must be an ImageObject`);
      }
      requireString(value.logo, "url", `${path}.logo`);
      if (typeof value.logo.width !== "number" || typeof value.logo.height !== "number") {
        throw new Error(`${path}.logo needs numeric width and height`);
      }
    }
    if (value.sameAs) {
      const sameAs = Array.isArray(value.sameAs) ? value.sameAs : [value.sameAs];
      sameAs.forEach((entry, index) => {
        if (typeof entry !== "string" || !entry.startsWith("https://")) {
          throw new Error(`${path}.sameAs[${index}] must be an absolute https URL`);
        }
      });
    }
  }

  if (type === "WebSite") {
    requireString(value, "name", path);
    requireString(value, "url", path);
    if (value.potentialAction) {
      if (!isRecord(value.potentialAction) || value.potentialAction["@type"] !== "SearchAction") {
        throw new Error(`${path}.potentialAction must be a SearchAction`);
      }
      const target = value.potentialAction.target;
      if (!isRecord(target)) throw new Error(`${path}.potentialAction.target must be an EntryPoint`);
      const template = requireString(target, "urlTemplate", `${path}.potentialAction.target`);
      if (!template.includes("{search_term_string}")) {
        throw new Error(`${path}.potentialAction target must include {search_term_string}`);
      }
      if (value.potentialAction["query-input"] !== "required name=search_term_string") {
        throw new Error(`${path}.potentialAction query-input is invalid`);
      }
    }
  }

  if (type === "BreadcrumbList") {
    if (!Array.isArray(value.itemListElement) || value.itemListElement.length < 2) {
      throw new Error(`${path}.itemListElement needs at least two items`);
    }
    value.itemListElement.forEach((item, index) => {
      if (!isRecord(item)) throw new Error(`${path}.itemListElement[${index}] must be an object`);
      if (item["@type"] !== "ListItem") throw new Error(`${path}.itemListElement[${index}].@type must be ListItem`);
      if (item.position !== index + 1) {
        throw new Error(`${path}.itemListElement[${index}].position must be ${index + 1}`);
      }
      requireString(item, "name", `${path}.itemListElement[${index}]`);
      const url = requireString(item, "item", `${path}.itemListElement[${index}]`);
      if (!url.startsWith("https://")) throw new Error(`${path}.itemListElement[${index}].item must be absolute`);
    });
  }

  if (type === "Article") {
    requireString(value, "headline", path);
    requireString(value, "description", path);
    requireDate(value, "datePublished", path);
    requireDate(value, "dateModified", path);
    assertAuthor(value.author, `${path}.author`, true);
    if (!isRecord(value.publisher)) throw new Error(`${path}.publisher is required`);
    requireString(value.publisher, "name", `${path}.publisher`);
    if (!isRecord(value.mainEntityOfPage)) throw new Error(`${path}.mainEntityOfPage is required`);
    requireString(value.mainEntityOfPage, "@id", `${path}.mainEntityOfPage`);
  }

  if (type === "Dataset") {
    requireString(value, "name", path);
    requireString(value, "description", path);
    const url = requireString(value, "url", path);
    if (!url.startsWith("https://")) throw new Error(`${path}.url must be an absolute https URL`);
    requireDate(value, "datePublished", path);
    if (value.dateModified) requireDate(value, "dateModified", path);
    const license = requireString(value, "license", path);
    if (!license.startsWith("https://")) throw new Error(`${path}.license must be an absolute https URL`);
    assertAuthor(value.creator, `${path}.creator`, true);
    assertAuthor(value.publisher, `${path}.publisher`, true);
    if (value.distribution) {
      if (!isRecord(value.distribution)) throw new Error(`${path}.distribution must be an object`);
      const contentUrl = value.distribution.contentUrl;
      if (typeof contentUrl !== "string" || !contentUrl.startsWith("https://")) {
        throw new Error(`${path}.distribution.contentUrl must be an absolute https URL`);
      }
    }
  }

  if (type === "WebPage") {
    if (typeof value["@id"] === "string" && !value.name && !value.url) {
      requireString(value, "@id", path);
    } else {
      requireString(value, "name", path);
      requireString(value, "url", path);
      if (value.datePublished) requireDate(value, "datePublished", path);
      if (value.dateModified) requireDate(value, "dateModified", path);
    }
  }

  if (type === "ProfilePage") {
    requireDate(value, "dateCreated", path);
    requireDate(value, "dateModified", path);
    if (!isRecord(value.mainEntity)) throw new Error(`${path}.mainEntity is required`);
    const entityType = value.mainEntity["@type"];
    if (entityType !== "Person" && entityType !== "Organization") {
      throw new Error(`${path}.mainEntity.@type must be Person or Organization`);
    }
    requireString(value.mainEntity, "name", `${path}.mainEntity`);
  }

  if (type === "DefinedTerm") {
    requireString(value, "name", path);
    requireString(value, "description", path);
    requireString(value, "url", path);
  }

  if (type === "ScholarlyArticle") {
    if (typeof value.name !== "string" && typeof value.headline !== "string") {
      throw new Error(`${path} needs a name or headline`);
    }
    if (value.author) {
      const authors = Array.isArray(value.author) ? value.author : [value.author];
      if (!authors.length) throw new Error(`${path}.author is empty`);
      authors.forEach((author, index) => assertAuthor(author, `${path}.author[${index}]`, false));
    }
    if (value.datePublished) requireDate(value, "datePublished", path);
  }

  if (type === "ItemList") {
    if (!Array.isArray(value.itemListElement) || !value.itemListElement.length) {
      throw new Error(`${path}.itemListElement is required`);
    }
    value.itemListElement.forEach((item, index) => {
      if (!isRecord(item)) throw new Error(`${path}.itemListElement[${index}] must be an object`);
      if (typeof item.position !== "number") throw new Error(`${path}.itemListElement[${index}].position is required`);
      if (typeof item.name !== "string" && !isRecord(item.item)) {
        throw new Error(`${path}.itemListElement[${index}] needs a name or item`);
      }
    });
  }

  if (type === "Person") {
    requireString(value, "name", path);
  }

  for (const [key, child] of Object.entries(value)) {
    if (key === "@context" || key === "@type") continue;
    if (isRecord(child) || Array.isArray(child)) assertNode(child, `${path}.${key}`);
  }
}

export function assertStructuredData(data: unknown) {
  const nodes = Array.isArray(data) ? data : [data];
  nodes.forEach((node, index) => assertNode(node, `$${index}`));
}
