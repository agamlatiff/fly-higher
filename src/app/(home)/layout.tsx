import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "FlyHigher | Book Cheap Flights to Indonesia & Beyond",
    template: "%s | FlyHigher",
  },
  description:
    "Find the best deals on flights to Bali, Jakarta, Singapore, and more. Book your next adventure with FlyHigher - Indonesia's trusted flight booking platform.",
  keywords: [
    "flights",
    "booking",
    "cheap flights",
    "indonesia",
    "bali",
    "jakarta",
    "flight tickets",
    "travel",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FlyHigher",
    title: "FlyHigher | Book Cheap Flights",
    description: "Your journey starts here. Book flights with FlyHigher.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyHigher | Book Cheap Flights",
    description: "Your journey starts here. Book flights with FlyHigher.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

