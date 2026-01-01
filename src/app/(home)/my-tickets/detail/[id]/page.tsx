import { Navbar } from "@/components/ui/navbar";
import { getDetailTicket } from "../../lib/data";
import { dateFormat, rupiahFormat } from "@/lib/utils";
import { getUrlFile } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Plane,
  Download,
  Calendar,
  ArrowRight,
  Luggage,
  Star,
  DoorOpen,
  AlertTriangle,
} from "lucide-react";

type Params = {
  id: string;
};

interface DetailTicketProps {
  params: Params;
}

const DetailTicketPage = async ({ params }: DetailTicketProps) => {
  const data = await getDetailTicket(params.id);

  if (!data) {
    return (
      <div className="bg-background-light min-h-screen font-display flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-dark">Ticket not found</h1>
          <Link
            href="/my-tickets"
            className="text-sky-primary hover:underline mt-4 inline-block"
          >
            Back to My Tickets
          </Link>
        </div>
      </div>
    );
  }

  // Calculate flight duration
  const departure = new Date(data.flight.departureDate);
  const arrival = new Date(data.flight.arrivalDate);
  const durationMs = arrival.getTime() - departure.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="bg-background-light min-h-screen font-display">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Navbar />
      </header>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-5">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap gap-2 py-4">
          <Link
            href="/"
            className="text-gray-500 text-sm font-medium hover:text-sky-primary"
          >
            Home
          </Link>
          <span className="text-gray-500 text-sm">/</span>
          <Link
            href="/my-tickets"
            className="text-gray-500 text-sm font-medium hover:text-sky-primary"
          >
            My Tickets
          </Link>
          <span className="text-gray-500 text-sm">/</span>
          <span className="text-text-dark text-sm font-medium">
            Manage Booking
          </span>
        </nav>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
          {/* LEFT COLUMN: Flight Info & Actions */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl p-6 shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden border border-gray-100">
              {/* Background Decoration */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col gap-2 z-10">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-7 items-center justify-center gap-x-2 rounded-full bg-emerald-100 pl-2 pr-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <p className="text-emerald-800 text-xs font-bold uppercase tracking-wide">
                      Confirmed
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">
                    Ref:{" "}
                    <span className="text-text-dark font-bold font-mono">
                      #{data.id.slice(0, 8).toUpperCase()}
                    </span>
                  </p>
                </div>
                <h1 className="text-text-dark text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                  Trip to {data.flight.destinationCity}
                </h1>
                <p className="text-gray-500 text-base">
                  You&apos;re all set for your journey!
                </p>
              </div>

              <button className="z-10 flex items-center justify-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors h-10 px-4 text-text-dark text-sm font-bold shadow-sm">
                <Download className="w-5 h-5" />
                <span>Ticket</span>
              </button>
            </div>

            {/* Flight Timeline Card */}
            <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  <Plane className="w-5 h-5 text-sky-primary" />
                  Flight Details
                </h3>
                <span className="text-xs font-semibold text-sky-primary bg-sky-primary/10 px-2 py-1 rounded">
                  Non-stop • {durationHours}h {durationMins}m
                </span>
              </div>

              {/* Timeline Component */}
              <div className="grid grid-cols-[40px_1fr] gap-x-4 px-2">
                {/* Departure */}
                <div className="flex flex-col items-center pt-1">
                  <div className="w-3 h-3 rounded-full border-2 border-sky-primary bg-white relative z-10" />
                  <div className="w-[2px] bg-gradient-to-b from-sky-primary/50 to-sky-primary/20 h-full grow my-1" />
                </div>
                <div className="flex flex-col pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-text-dark text-lg font-bold">
                        {data.flight.departureCity} ({data.flight.departureCityCode})
                      </p>
                      <p className="text-gray-500 text-sm">Departure Airport</p>
                    </div>
                    <div className="text-right">
                      <p className="text-text-dark text-lg font-bold">
                        {dateFormat(data.flight.departureDate, "HH:mm a")}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {dateFormat(data.flight.departureDate, "MMM DD, ddd")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 w-fit px-2 py-1 rounded">
                    <DoorOpen className="w-4 h-4" /> Terminal
                  </div>
                </div>

                {/* Plane Icon in middle */}
                <div className="flex flex-col items-center justify-center relative h-8">
                  <Plane className="w-5 h-5 text-sky-primary/60 rotate-180 absolute" />
                  <div className="w-[2px] bg-sky-primary/20 h-full" />
                </div>
                <div className="flex flex-col py-2 justify-center">
                  <p className="text-xs text-gray-500 italic">
                    Duration: {durationHours}hr {durationMins}m
                  </p>
                </div>

                {/* Arrival */}
                <div className="flex flex-col items-center pb-1">
                  <div className="w-[2px] bg-gradient-to-b from-sky-primary/20 to-sky-primary/50 h-full grow my-1" />
                  <div className="w-3 h-3 rounded-full bg-sky-primary relative z-10" />
                </div>
                <div className="flex flex-col pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-text-dark text-lg font-bold">
                        {data.flight.destinationCity} ({data.flight.destinationCityCode})
                      </p>
                      <p className="text-gray-500 text-sm">Arrival Airport</p>
                    </div>
                    <div className="text-right">
                      <p className="text-text-dark text-lg font-bold">
                        {dateFormat(data.flight.arrivalDate, "HH:mm a")}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {dateFormat(data.flight.arrivalDate, "MMM DD, ddd")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 w-fit px-2 py-1 rounded">
                    <DoorOpen className="w-4 h-4" /> Terminal
                  </div>
                </div>
              </div>
            </div>

            {/* Management Grid */}
            <div>
              <h3 className="text-xl font-bold text-text-dark mb-4 pl-1">
                Manage Booking
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Change Dates Card */}
                <div className="group relative flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                  <div className="flex flex-col gap-1 z-10">
                    <h4 className="text-lg font-bold text-text-dark group-hover:text-sky-primary transition-colors">
                      Change Dates
                    </h4>
                    <p className="text-sm text-gray-500">Reschedule your flight</p>
                  </div>
                  <div className="w-16 h-16 relative z-10 flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-sky-primary/60" />
                  </div>
                </div>

                {/* Select Seats Card */}
                <Link
                  href={`/choose-seat/${data.flight.id}`}
                  className="group relative flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                  <div className="flex flex-col gap-1 z-10">
                    <h4 className="text-lg font-bold text-text-dark group-hover:text-yellow-500 transition-colors">
                      Select Seats
                    </h4>
                    <p className="text-sm text-gray-500">Window or aisle?</p>
                  </div>
                  <div className="w-16 h-16 relative z-10 flex items-center justify-center">
                    <Plane className="w-10 h-10 text-yellow-500/60 rotate-45" />
                  </div>
                </Link>

                {/* Add Baggage Card */}
                <div className="group relative flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                  <div className="flex flex-col gap-1 z-10">
                    <h4 className="text-lg font-bold text-text-dark group-hover:text-purple-500 transition-colors">
                      Add Baggage
                    </h4>
                    <p className="text-sm text-gray-500">More room for gifts</p>
                  </div>
                  <div className="w-16 h-16 relative z-10 flex items-center justify-center">
                    <Luggage className="w-10 h-10 text-purple-500/60" />
                  </div>
                </div>

                {/* Upgrade Card */}
                <div className="group relative flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                  <div className="flex flex-col gap-1 z-10">
                    <h4 className="text-lg font-bold text-text-dark group-hover:text-pink-500 transition-colors">
                      Upgrade
                    </h4>
                    <p className="text-sm text-gray-500">Treat yourself today</p>
                  </div>
                  <div className="w-16 h-16 relative z-10 flex items-center justify-center">
                    <Star className="w-10 h-10 text-pink-500/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Passenger Card */}
            <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-text-dark">Passenger</h3>
                <button className="text-sky-primary text-sm font-semibold hover:underline">
                  Edit
                </button>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-primary/10 flex items-center justify-center text-sky-primary font-bold">
                  {data.customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-text-dark font-bold text-sm">
                    {data.customer.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Adult • Seat {data.seat.seatNumber}
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      {data.seat.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Airplane Card */}
            <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
              <h3 className="text-lg font-bold text-text-dark mb-4">Aircraft</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={getUrlFile(data.flight.plane.image)}
                    alt={data.flight.plane.name}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-text-dark font-bold">{data.flight.plane.name}</p>
                  <p className="text-gray-500 text-sm">{data.flight.plane.code}</p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
              <h3 className="text-lg font-bold text-text-dark mb-4">
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Base Fare</span>
                  <span className="text-text-dark font-medium">
                    {rupiahFormat(data.flight.price)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Seat Selection</span>
                  <span className="text-text-dark font-medium">
                    {rupiahFormat(0)}
                  </span>
                </div>
                <div className="my-3 border-t border-gray-200" />
                <div className="flex justify-between items-end">
                  <span className="text-text-dark font-bold text-base">
                    Total Paid
                  </span>
                  <span className="text-sky-primary font-black text-xl">
                    {rupiahFormat(data.flight.price)}
                  </span>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 rounded-lg border border-sky-primary text-sky-primary font-bold text-sm hover:bg-sky-primary/5 transition-colors">
                View Receipt
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <h3 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Danger Zone
              </h3>
              <p className="text-xs text-red-600 mb-4">
                Cancelling now may result in a cancellation fee.
              </p>
              <button className="w-full py-2 rounded-lg bg-white text-red-600 text-xs font-bold border border-red-200 hover:bg-red-50 transition-colors">
                Cancel Booking
              </button>
            </div>
          </div>
        </main>

        {/* Bottom Action Bar */}
        <div className="mt-8 flex justify-end gap-4 pb-8">
          <Link
            href="/my-tickets"
            className="rounded-xl h-12 px-6 bg-gray-100 text-text-dark text-sm font-bold flex items-center hover:bg-gray-200 transition-colors"
          >
            Back
          </Link>
          <button className="rounded-xl h-12 px-6 bg-sky-primary hover:bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] flex items-center gap-2">
            Done <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTicketPage;
