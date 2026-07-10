import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NO_FLASH_THEME_SCRIPT, DEFAULT_THEME } from "@/lib/theme";
import { SITE_URL } from "@/lib/seo";
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

const DEFAULT_TITLE = "Ashutosh Nayak — AI & ML Engineer | Business Analyst & Frappe Developer";
const DEFAULT_DESCRIPTION =
  "Ashutosh Nayak is an AI & ML Engineer, Business Analyst and Frappe Developer building intelligent enterprise solutions across AI, ERP and data analytics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Ashutosh Nayak",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  keywords: [
    "Ashutosh Nayak",
    "AI Engineer",
    "Machine Learning Engineer",
    "Business Analyst",
    "Frappe Developer",
    "ERPNext",
    "Data Analytics",
  ],
  openGraph: {
    type: "website",
    siteName: "Ashutosh Nayak",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
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
