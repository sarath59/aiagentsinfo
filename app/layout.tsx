import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ToolViewTracker } from "@/components/ToolViewTracker";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";
import "./home.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "system-ui", "sans-serif"],
});

function siteVerification(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION?.trim();
  const bing = process.env.NEXT_PUBLIC_BING_VERIFICATION?.trim();
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

const defaultTitle = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.bylines.editorial }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  manifest: "/manifest.webmanifest",
  verification: siteVerification(),
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f3f6fa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ToolViewTracker />
        <Script id="datafast-queue" strategy="beforeInteractive">
          {`window.datafast=window.datafast||function(){window.datafast.q=window.datafast.q||[];window.datafast.q.push(arguments);};`}
        </Script>
        <Script
          src="https://datafa.st/js/script.js"
          data-website-id="dfid_0z04dGwxdEtL6cLScbJkR"
          data-domain="aiagentsinfo.com"
          strategy="lazyOnload"
        />
        <Analytics />
      </body>
    </html>
  );
}
