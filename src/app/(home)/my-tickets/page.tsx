import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import TicketCard from "./_components/TicketCard";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getMyTicket } from "./lib/data";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tickets - FlyHigher",
  description: "View and manage your flight bookings. Access your e-tickets, check flight status, and manage your reservations.",
};

const MyTicketsPage = async () => {
  const { user, session } = await getUser();

  if (!session) {
    return redirect("/sign-in");
  }

  const data = await getMyTicket(user.id);

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <Navbar />
      </header>

      {/* Header */}
      <div className="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-8 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-accent">confirmation_number</span>
            </div>
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight">
              My Tickets
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {data.length} booking{data.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-[1200px] mx-auto px-4 md:px-10 py-8 w-full">
        {data.length === 0 ? (
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-12 shadow-sm border border-gray-200 dark:border-gray-800 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
              confirmation_number
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No bookings yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start planning your next adventure!
            </p>
            <Link
              href="/available-flights"
              className="inline-flex items-center gap-2 bg-accent hover:bg-sky-400 text-primary font-bold py-3 px-6 rounded-full transition-colors shadow-lg shadow-accent/20"
            >
              <span className="material-symbols-outlined">search</span>
              Browse Flights
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data.map((val) => (
              <TicketCard key={val.id} data={val} />
            ))}
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
              You&apos;ve reached the end of results.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyTicketsPage;
