import type { Metadata, Viewport } from "next";
import { Amiri, Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { weddingData } from "@/data/wedding";
import "./globals.css";

const fontScript = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-face",
  display: "swap",
});

const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif-face",
  display: "swap",
});

const fontEngraved = Cinzel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-engraved-face",
  display: "swap",
});

const fontArabic = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wedora.example.com"),
  title: {
    default: weddingData.meta.title,
    template: "%s | Wedding Invitation",
  },
  description: weddingData.meta.description,
  applicationName: "Wedding Invitation",
  keywords: [
    "nikkah invitation",
    "wedding invitation",
    "digital invitation",
    weddingData.cover.brideNick,
    weddingData.cover.groomNick,
    weddingData.details.date.lead,
  ],
  authors: [{ name: `${weddingData.couple.groom} & ${weddingData.couple.bride}` }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${weddingData.cover.brideNick} & ${weddingData.cover.groomNick}`,
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: [
      { url: weddingData.meta.ogImage, width: 1200, height: 630, alt: weddingData.meta.title },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: [weddingData.meta.ogImage],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: weddingData.meta.favicon, type: "image/svg+xml" }],
    apple: [{ url: weddingData.meta.favicon }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F7F1EE",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${fontScript.variable} ${fontSerif.variable} ${fontEngraved.variable} ${fontArabic.variable}`}
    >
      <head>
        <noscript>
          <style>{`.jm-shell[data-state="closed"] #page-invite{display:block !important;opacity:1 !important;transform:none !important}.jm-shell:not([data-state="opened"]) #jm-sticky-head,.jm-shell:not([data-state="opened"]) #footer{display:none !important}.jm-cover-layer{display:none !important}.jm-in{animation:none !important;opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
