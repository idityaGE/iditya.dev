import "@/styles/globals.css";
import "@/styles/code.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Navbar } from "@/components/navbar/navbar";
import Image from "next/image";
import localFont from "next/font/local";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
