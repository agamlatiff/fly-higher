import { notFound } from "next/navigation";
import Link from "next/link";
import { getTicketById } from "../lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { rupiahFormat } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  Clock,

  Plane,
  User,
  Mail,
  CreditCard,
  Armchair,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Ticket Details",
};

interface PageProps {
  params: { id: string };
}

const statusColors: Record<string, string> = {
  SUCCESS: "bg-emerald-100 text-emerald-700 border-emerald-200",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  FAILED: "bg-red-100 text-red-700 border-red-200",
};

export default async function TicketDetailPage({ params }: PageProps) {
  const ticket = await getTicketById(params.id);

  if (!ticket) {
    notFound();
  }

  const departureTime = new Date(ticket.flight.departureDate).toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit" }
  );
  const arrivalTime = new Date(ticket.flight.arrivalDate).toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit" }
  );
  const bookingDate = new Date(ticket.bookingDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const flightDate = new Date(ticket.flight.departureDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/tickets">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Ticket Details</h1>
            <p className="text-gray-500 font-mono">{ticket.code}</p>
          </div>
        </div>
        <Badge
          className={`text-sm px-4 py-2 ${statusColors[ticket.status] || statusColors.PENDING
            }`}
        >
          {ticket.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Flight Information */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-blue-600" />
              Flight Information
            </h2>

            <div className="flex items-center justify-between">
              {/* Departure */}
              <div className="text-center">
                <p className="text-3xl font-black">{departureTime}</p>
                <p className="text-gray-500">{ticket.flight.departureCity}</p>
              </div>

              {/* Flight Path */}
              <div className="flex-1 mx-8">
                <div className="relative">
                  <div className="h-0.5 bg-gray-200 w-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Plane className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p className="text-xs text-gray-500">
                    {ticket.flight.plane.name}
                  </p>
                </div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <p className="text-3xl font-black">{arrivalTime}</p>
                <p className="text-gray-500">{ticket.flight.destinationCity}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium">{flightDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Armchair className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Seat</p>
                  <p className="font-medium">
                    {ticket.seat.seatNumber} ({ticket.seat.type})
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Booked On</p>
                  <p className="font-medium">{bookingDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Customer Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-semibold">{ticket.customer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold">{ticket.customer.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              Payment Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Ticket Price</span>
                <span className="font-medium">
                  {rupiahFormat(Number(ticket.price))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Seat Type</span>
                <span className="font-medium">{ticket.seat.type}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  {rupiahFormat(Number(ticket.price))}
                </span>
              </div>
            </div>

            {ticket.tokenMidtrans && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">Transaction ID</p>
                <p className="font-mono text-sm break-all">
                  {ticket.tokenMidtrans}
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl border p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href={`/dashboard/tickets`} className="block">
                <Button variant="outline" className="w-full">
                  Back to All Tickets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
