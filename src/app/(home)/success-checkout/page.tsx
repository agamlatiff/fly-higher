"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import TicketActions from "./_components/TicketActions";

interface TicketData {
  code: string;
  passenger: string;
  email: string;
  departure: {
    city: string;
    code: string;
    time: string;
  };
  arrival: {
    city: string;
    code: string;
  };
  date: string;
  seat: string;
}

const SuccessPage = () => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  useEffect(() => {
    // Try to get ticket data from localStorage (set during checkout)
    const storedData = localStorage.getItem("lastBookedTicket");
    if (storedData) {
      try {
        setTicketData(JSON.parse(storedData));
      } catch {
        // Use fallback data
        setTicketData(null);
      }
    }
  }, []);

  // Fallback data if no ticket data available
  const ticket = ticketData || {
    code: "FLYH-XXXXXX",
    passenger: "Guest",
    email: "your email",
    departure: { city: "Jakarta", code: "JKT", time: "09:00 AM" },
    arrival: { city: "Bali", code: "DPS" },
    date: "Dec 25, 2025",
    seat: "--",
  };

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <Navbar />
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex items-center justify-center mb-6">
            {/* Confetti-like decorations */}
            <span className="material-symbols-outlined absolute -top-2 -left-4 text-2xl text-yellow-400 animate-pulse">
              star
            </span>
            <span className="material-symbols-outlined absolute -top-1 -right-3 text-xl text-pink-400 animate-pulse" style={{ animationDelay: "0.2s" }}>
              auto_awesome
            </span>
            <span className="material-symbols-outlined absolute -bottom-1 left-0 text-lg text-accent animate-pulse" style={{ animationDelay: "0.4s" }}>
              celebration
            </span>

            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
            Your e-ticket has been sent to <span className="font-semibold text-gray-900 dark:text-white">{ticket.email}</span>
          </p>
        </div>

        {/* Boarding Pass Card - ref for PDF capture */}
        <div ref={ticketRef} className="bg-white dark:bg-surface-dark rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-800">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent to-sky-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">flight</span>
                <span className="font-bold">FlyHigher</span>
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                E-Ticket
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Route */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white">{ticket.departure.code}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{ticket.departure.city}</p>
              </div>
              <div className="flex-1 mx-4 relative">
                <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700" />
                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent bg-white dark:bg-surface-dark px-1">
                  flight
                </span>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white">{ticket.arrival.code}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{ticket.arrival.city}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  <span className="text-xs font-medium uppercase">Date</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{ticket.date}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  <span className="text-xs font-medium uppercase">Time</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{ticket.departure.time}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <span className="material-symbols-outlined text-lg">person</span>
                  <span className="text-xs font-medium uppercase">Passenger</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white truncate">{ticket.passenger}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <span className="material-symbols-outlined text-lg">airline_seat_recline_extra</span>
                  <span className="text-xs font-medium uppercase">Seat</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{ticket.seat}</p>
              </div>
            </div>

            {/* Barcode */}
            <div className="flex flex-col items-center py-6 border-t border-dashed border-gray-200 dark:border-gray-700">
              <div className="w-48 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                <div className="flex gap-0.5">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gray-800 dark:bg-gray-200 rounded-sm"
                      style={{ height: `${20 + (i % 5) * 5}px` }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400 font-mono">{ticket.code}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <TicketActions ticketRef={ticketRef} ticketCode={ticket.code} />

        {/* Next Steps */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">What&apos;s Next?</h3>
          <div className="space-y-3">
            <Link
              href="/my-tickets"
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">View My Tickets</span>
              <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">Book Another Flight</span>
              <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SuccessPage;
