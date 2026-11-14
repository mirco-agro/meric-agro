import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import Smooth from "../components/Smooth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { site } from "../lib/content";
import TawkChat from "../components/TawkChat";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const body = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });

// Set NEXT_PUBLIC_SITE_URL in Vercel only when the real domain goes live.
const live = process.env.NEXT_PUBLIC_SITE_URL;
const url = live ?? "https://meric-agro.com";

const title = "Meric Agro Processing | Cocoa, Plantain and Oil Palm, Nigeria";
const description = "Nigerian agribusiness in Ibadan, Oyo State growing cocoa, plantain and oil palm. Request a quote for produce or join our farmer partnership programme.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: title, template: "%s | Meric Agro Processing" },
  description,
  applicationName: "Meric Agro Processing",
  keywords: ["Meric Agro", "plantain supplier Nigeria", "cocoa Nigeria", "oil palm Ibadan", "agribusiness Oyo State", "farmer partnership Nigeria", "agricultural produce supply"],
  authors: [{ name: "Meric Agro Processing Limited" }],
  creator: "Meric Agro Processing Limited",
  publisher: "Meric Agro Processing Limited",
  category: "agriculture",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Meric Agro Processing",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  // keeps the Vercel preview out of Google until the real domain is set
  robots: live
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
  // verification: { google: "paste-search-console-code-here" },
};

export const viewport: Viewport = {
  themeColor: "#0b2b1c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Meric Agro Processing Limited",
  url,
  logo: `${url}/icon.png`,
  description,
  email: site.emailOne,
  telephone: site.phone,
  sameAs: [site.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "No 5 Akinfenwa Iwajowa Road, Alakia",
    addressLocality: "Ibadan",
    addressRegion: "Oyo State",
    addressCountry: "NG",
  },
  areaServed: "NG",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Header />
        <Smooth>
          {children}
        </Smooth>
        <TawkChat id={process.env.TAWK_ID} />
        <Footer />
      </body>
    </html>
  );
}