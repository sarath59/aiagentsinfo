import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const themeScript = `(() => { try { const t = localStorage.getItem("theme"); const dark = t === "light" ? false : true; document.documentElement.classList.toggle("dark", dark); } catch (_) {} })();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.bylines.editorial }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8f0f6" },
    { media: "(prefers-color-scheme: dark)", color: "#071421" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Script
          src="https://datafa.st/js/script.js"
          data-website-id="dfid_0z04dGwxdEtL6cLScbJkR"
          data-domain="aiagentsinfo.com"
          strategy="afterInteractive"
          defer
        />
        <Analytics />
      </body>
    </html>
  );
}
