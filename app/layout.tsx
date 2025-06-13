import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider"
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import Image from "next/image";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased`}
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
