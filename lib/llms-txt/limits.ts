/** Caps for the llms.txt checker. The tool page quotes these numbers. */

export const MAX_BYTES = 2 * 1024 * 1024;
export const MAX_REDIRECTS = 3;
export const FILE_TIMEOUT_MS = 8_000;
export const CHECK_BUDGET_MS = 25_000;
export const MAX_LINK_CHECKS = 25;
export const LINK_CONCURRENCY = 6;
export const LINK_BUDGET_MS = 12_000;
export const LINK_TIMEOUT_MS = 8_000;
export const SITEMAP_CHILD_CAP = 5;
export const SITEMAP_URL_CAP = 400;
export const PAGE_CAP = 30;
export const PAGE_CONCURRENCY = 4;
export const PAGE_TIMEOUT_MS = 6_000;
export const PAGE_BYTES = 200 * 1024;
export const PREVIEW_CHARS = 1_200;
