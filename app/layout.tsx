import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Great_Vibes, Inter } from "next/font/google";
import { weddingData } from "@/data/wedding";
import "./globals.css";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const fontScript = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-face",
  display: "swap",
});

const fontArabic = Amiri({
  subsets: ["arabic"],
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
    "wedding invitation",
    "digital invitation",
    weddingData.bride.name,
    weddingData.groom.name,
    weddingData.wedding.date,
  ],
  authors: [{ name: `${weddingData.groom.fullName} & ${weddingData.bride.fullName}` }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${weddingData.groom.name} & ${weddingData.bride.name}`,
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: [{ url: weddingData.meta.ogImage, width: 1200, height: 630, alt: weddingData.meta.title }],
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
  themeColor: "#8a6d68",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontScript.variable} ${fontArabic.variable}`}
    >
      <head>
        <noscript>
          <style>{`.invitation-cover{display:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-cream font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
