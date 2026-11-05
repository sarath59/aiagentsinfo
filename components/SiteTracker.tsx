import Script from "next/script";

/**
 * First-party page counter. The file is a static script so it stays under 3KB.
 * It uses localStorage and sessionStorage, never cookies, and does nothing when
 * the browser sends Do Not Track or Global Privacy Control.
 */
export function SiteTracker() {
  return <Script src="/aai.js?v=1" strategy="afterInteractive" />;
}
