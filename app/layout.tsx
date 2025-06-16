import type { Metadata } from "next/types";
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Navbar } from "@/components/navbar/navbar";
import Image from "next/image";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import { Analytics } from '@vercel/analytics/next';
import "@/styles/globals.css";

const fontHeading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
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
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} RSS Feed`} href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title={`${siteConfig.name} Atom Feed`} href="/atom.xml" />
        <link rel="alternate" type="application/json" title={`${siteConfig.name} JSON Feed`} href="/rss.json" />
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} Blogs RSS Feed`} href="/blogs/rss.xml" />
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} Projects RSS Feed`} href="/projects/rss.xml" />
      </head>
      <body
        className={`${fontHeading.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto min-h-screen flex flex-col">
            <Image
              src="https://res.cloudinary.com/dwdbqwqxk/image/upload/v1730213921/gradient_zecf4g.webp"
              alt="Gradient IMG"
              className="fixed left-0 sm:left-1/2 top-0 -z-10 -translate-x-1/2 lg:scale-100 object-cover"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
            <Navbar />
            <div className="flex-grow mx-1">
              {children}
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
