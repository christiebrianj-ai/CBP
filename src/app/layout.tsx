import type { Metadata } from "next";
import { COMPANY } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import SchemaMarkup from "@/components/SchemaMarkup";
import "./globals.css";

export const metadata: Metadata = {
  title: `${COMPANY.name} | Professional Interior Painting in West Chester, PA`,
  description:
    "Professional interior painting services in West Chester, PA and surrounding areas. Residential painting, cabinet painting, trim work, and drywall repair. Free estimates, fully insured, fast turnaround.",
  keywords:
    "interior painter West Chester PA, painting contractor West Chester, cabinet painting West Chester, house painter Chester County, interior painting Downingtown, painter Malvern PA, painting company Exton PA",
  openGraph: {
    title: `${COMPANY.name} | Interior Painting West Chester PA`,
    description:
      "Professional interior painting with craftsmanship, clean job sites, and strong communication. Serving West Chester, PA and 50-mile radius. Free estimates.",
    url: COMPANY.siteUrl,
    siteName: COMPANY.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: COMPANY.siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <SchemaMarkup />
        {ga4Id && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`,
              }}
            />
          </>
        )}
        {plausibleDomain && (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="min-h-screen bg-white text-charcoal antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCallButton />
      </body>
    </html>
  );
}
