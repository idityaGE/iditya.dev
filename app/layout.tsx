import type { Metadata } from "next/types";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Inter, JetBrains_Mono, Doto } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fontDoto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
  ],
  creator: siteConfig.creator.name,

  icons: siteConfig.favicon,

  // OpenGraph metadata
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1800,
        height: 1000,
        alt: siteConfig.name,
      },
    ],
    type: "website",
    locale: "en_US",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: siteConfig.creator.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      url: siteConfig.ogImage,
      width: 1800,
      height: 1000,
      alt: siteConfig.name,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} RSS Feed`}
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${siteConfig.name} Atom Feed`}
          href="/atom.xml"
        />
        <link
          rel="alternate"
          type="application/json"
          title={`${siteConfig.name} JSON Feed`}
          href="/rss.json"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} Blogs RSS Feed`}
          href="/blogs/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} Projects RSS Feed`}
          href="/projects/rss.xml"
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontDoto.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="mx-auto min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">{children}</div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
