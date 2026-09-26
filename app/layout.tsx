import type { Metadata, Viewport } from "next";
import { Abhaya_Libre, Caveat, Gilda_Display, Imperial_Script, Raleway } from "next/font/google";
import { weddingData } from "@/data/wedding";
import "./globals.css";

const fontAbhaya = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-abhaya-face",
  display: "swap",
});

const fontGilda = Gilda_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ranget-face",
  display: "swap",
});

const fontImperial = Imperial_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-imperial-face",
  display: "swap",
});

const fontCaveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-blackmango-face",
  display: "swap",
});

const fontRaleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-beautique-face",
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
  themeColor: weddingData.theme.bodyBg,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${fontAbhaya.variable} ${fontGilda.variable} ${fontImperial.variable} ${fontCaveat.variable} ${fontRaleway.variable}`}
    >
      <head>
        <noscript>
          <style>{`.jm-shell[data-state="closed"] #page-invite,.jm-shell[data-state="opening"] #page-invite{display:block !important}.jm-shell:not([data-state="opened"]) #footer{display:none !important}#gateb{display:none !important}.jm-fade-up,.jm-zoom-in{opacity:1 !important;transform:none !important}#cover .invtype,#cover .name1,#cover .and,#cover .name2,#cover .cover-date{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
