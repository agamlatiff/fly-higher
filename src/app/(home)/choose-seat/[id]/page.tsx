import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import SeatMapWrapper from "./_components/SeatMapWrapper";
import FlightDetail from "./_components/FlightDetail";
import SeatClassToggle from "./_components/SeatClassToggle";
import MobileSummaryWrapper from "./_components/MobileSummaryWrapper";
import { getFlightById } from "../../lib/data";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { getUrlFile } from "@/lib/supabase";
import { dateFormat } from "@/lib/utils";

type Params = {
  id: string;
};

interface ChooseSeatProps {
  params: Params;
}

const ChooseSeatPage = async ({ params }: ChooseSeatProps) => {
  const { session } = await getUser();
  const flight = await getFlightById(params.id);

  if (!flight) {
    return (
      <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
              flight_off
            </span>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Flight not found
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The flight you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/available-flights"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to flights
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <Navbar />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <Link href="/" className="hover:text-primary dark:hover:text-white transition">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href="/available-flights" className="hover:text-primary dark:hover:text-white transition">Flights</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-accent">Flight Details</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
            <div>
              <h1 className="text-3xl font-bold text-primary dark:text-white">Flight Details</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Review flight information and select your seats</p>
            </div>
          </div>
        </nav>

        {/* Flight Info Section */}
        <section className="bg-white dark:bg-surface-dark rounded-3xl p-8 shadow-lg mb-8 relative overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Airline Info */}
            <div className="flex items-center gap-4 min-w-[180px]">
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden shadow-sm">
                <Image
                  src={getUrlFile(flight.plane.image)}
                  alt={flight.plane.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{flight.plane.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{flight.plane.code}</span>
                </div>
              </div>
            </div>

            {/* Flight Route */}
            <div className="flex-1 w-full relative py-4">
              <div className="flex justify-between items-end mb-4 px-2">
                <div className="text-left">
                  <div className="text-3xl font-bold text-primary dark:text-white">
                    {dateFormat(flight.departureDate, "HH:mm")}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {flight.departureCity}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Direct
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary dark:text-white">
                    {dateFormat(flight.arrivalDate, "HH:mm")}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {flight.destinationCity}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full w-full">
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-green-500 w-1/3 rounded-full" />
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                  <div className="bg-white dark:bg-surface-dark p-1.5 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
                    <span className="material-symbols-outlined text-accent rotate-90 block">flight</span>
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary dark:bg-white rounded-full border-2 border-white dark:border-surface-dark shadow-sm" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full border-2 border-white dark:border-surface-dark shadow-sm" />
              </div>
            </div>

            {/* Date */}
            <div className="text-right min-w-[120px] hidden lg:block">
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Departure</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {dateFormat(flight.departureDate)}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Seat Map & Controls */}
          <div className="lg:col-span-8 space-y-6">
            {/* Seat Selection Card */}
            <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6 overflow-x-auto">
                <button className="flex items-center gap-2 text-accent font-bold border-b-2 border-accent pb-4 -mb-4 px-2 transition whitespace-nowrap">
                  <span className="material-symbols-outlined">event_seat</span> Seat Selection
                </button>
                <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white font-medium pb-4 -mb-4 px-2 transition whitespace-nowrap">
                  <span className="material-symbols-outlined">luggage</span> Baggage
                </button>
                <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white font-medium pb-4 -mb-4 px-2 transition whitespace-nowrap">
                  <span className="material-symbols-outlined">info</span> Policies
                </button>
              </div>

              {/* Class Toggle */}
              <SeatClassToggle seats={flight.seats} basePrice={flight.price} />

              {/* Interactive Legend + Seat Grid with Fuselage */}
              <SeatMapWrapper seats={flight.seats} />
            </div>
          </div>

          {/* Right Column: Summary Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-4">
            <FlightDetail flight={flight} session={session} />
          </div>
        </div>

        {/* Bottom padding for mobile sticky bar */}
        <div className="h-32 lg:hidden" />
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <MobileSummaryWrapper flight={flight} session={session} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChooseSeatPage;
