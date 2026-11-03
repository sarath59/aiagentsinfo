import Script from "next/script";

/**
 * Env-based analytics hook. Nothing loads unless NEXT_PUBLIC_ANALYTICS_DOMAIN is set.
 * No API keys. Compatible with Plausible-style script tags (domain only).
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  if (!domain) return null;
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? "https://plausible.io/js/script.js";
  return <Script data-domain={domain} src={src} strategy="lazyOnload" />;
}
