import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { WebVitals } from "@/components/performance";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap", // Performance: prevent FOIT
});

export const metadata: Metadata = {
  title: "FlyHigher - Flight Booking",
  description: "Elevate your travel with seamless connections - FlyHigher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-background dark:bg-background-dark transition-colors`}>
        <NextTopLoader
          color="#0EA5E9"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0EA5E9,0 0 5px #0EA5E9"
        />
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
