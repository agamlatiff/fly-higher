import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const metadata: Metadata = {
  title: "FlyHigher - Website Booking Ticket",
  description: "Elevate your travel with seamless connections",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Background with gradient overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-20 transition-opacity duration-700"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-background-light/80 to-background-light dark:from-black/20 dark:via-background-dark/80 dark:to-background-dark backdrop-blur-[4px]" />
      </div>

      {/* Navigation - Consistent with landing page */}
      <nav className="relative z-50 w-full py-6 px-6 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary dark:bg-accent text-white dark:text-primary p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-xl">flight_takeoff</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-primary dark:text-white">
            FlyHigher
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/available-flights" className="hover:text-primary dark:hover:text-accent transition">
            Flights
          </Link>
          <Link href="/destinations" className="hover:text-primary dark:hover:text-accent transition">
            Destinations
          </Link>
          <Link href="/partners" className="hover:text-primary dark:hover:text-accent transition">
            Partners
          </Link>
          <Link href="/support" className="hover:text-primary dark:hover:text-accent transition">
            Support
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-88px)] p-4">
        {children}
      </main>
    </>
  );
}

