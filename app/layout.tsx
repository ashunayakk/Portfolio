import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NO_FLASH_THEME_SCRIPT, DEFAULT_THEME } from "@/lib/theme";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const DEFAULT_TITLE =
  "Ashutosh Nayak | Business Analyst | AI & ML Engineer | Frappe Developer";

const DEFAULT_DESCRIPTION =
  "Ashutosh Nayak is a Business Analyst, AI & ML Engineer, and Frappe Developer specializing in ERPNext, enterprise automation, artificial intelligence, and data analytics. Explore projects, experience, technical blogs, and contact information.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: "%s | Ashutosh Nayak",
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    "Ashutosh Nayak",
    "Ashutosh Nayak Portfolio",
    "Business Analyst",
    "AI Engineer",
    "Machine Learning Engineer",
    "Artificial Intelligence",
    "Frappe Developer",
    "ERPNext Developer",
    "Python Developer",
    "Data Analytics",
    "Business Intelligence",
    "LLM Developer",
    "Agentic AI",
    "Raipur Developer",
    "Portfolio",
  ],

  authors: [
    {
      name: "Ashutosh Nayak",
      url: "https://ashunayak.com",
    },
  ],

  creator: "Ashutosh Nayak",

  publisher: "Ashutosh Nayak",

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ashutosh Nayak",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  // After Google Search Console verification,
  // replace YOUR_GOOGLE_VERIFICATION_CODE
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#faf9f5",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0b0d10",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: NO_FLASH_THEME_SCRIPT,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body>
        <ThemeProvider>{children}</ThemeProvider>

        <Analytics />

        <GoogleAnalytics />

        <MicrosoftClarity />

        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </body>
    </html>
  );
}