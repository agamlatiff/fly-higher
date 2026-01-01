import { getUrlFile } from "@/lib/supabase";
import { dateFormat } from "@/lib/utils";
import type { Airplane, Flight, FlightSeat, Ticket } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Plane, ArrowRight } from "lucide-react";

type Data = Pick<Ticket, "id"> & {
  flight: Pick<
    Flight,
    | "departureDate"
    | "departureCityCode"
    | "destinationCityCode"
    | "arrivalDate"
  > & {
    plane: Airplane;
  };
} & {
  seat: Pick<FlightSeat, "type">;
};

interface TicketCardProps {
  data: Data;
}

const TicketCard = ({ data }: TicketCardProps) => {
  // Calculate duration
  const departure = new Date(data.flight.departureDate);
  const arrival = new Date(data.flight.arrivalDate);
  const durationMs = arrival.getTime() - departure.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="group bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Airline Info */}
        <div className="flex items-center gap-4 w-full md:w-48">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center p-2 shadow-sm border border-gray-100 overflow-hidden">
            <Image
              width={48}
              height={48}
              src={getUrlFile(data.flight.plane.image)}
              className="w-full h-full object-contain"
              alt={data.flight.plane.name}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-text-dark">{data.flight.plane.name}</span>
            <span className="text-xs text-gray-500 font-medium">
              {data.seat.type}
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="hidden md:block">
          <p className="text-text-dark font-bold">
            {dateFormat(data.flight.departureDate, "DD MMM YYYY")}
          </p>
        </div>

        {/* Flight Route Visual */}
        <div className="flex-1 w-full flex items-center justify-between gap-4 text-center">
          {/* Departure */}
          <div>
            <div className="text-xl md:text-2xl font-black text-text-dark">
              {dateFormat(data.flight.departureDate, "HH:mm")}
            </div>
            <div className="text-gray-500 text-xs font-bold bg-gray-100 px-2 py-1 rounded-md mt-1 inline-block">
              {data.flight.departureCityCode}
            </div>
          </div>

          {/* Route Line */}
          <div className="flex flex-col items-center flex-1 px-2 relative">
            <span className="text-xs font-bold text-gray-500 mb-1">
              {durationHours}h {durationMins}m
            </span>
            <div className="w-full h-[2px] bg-gray-200 relative rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-sky-primary/30 to-transparent" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
              <Plane className="w-4 h-4 text-sky-primary rotate-90" />
            </div>
          </div>

          {/* Arrival */}
          <div>
            <div className="text-xl md:text-2xl font-black text-text-dark">
              {dateFormat(data.flight.arrivalDate, "HH:mm")}
            </div>
            <div className="text-gray-500 text-xs font-bold bg-gray-100 px-2 py-1 rounded-md mt-1 inline-block">
              {data.flight.destinationCityCode}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/my-tickets/detail/${data.id}`}
          className="bg-sky-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 w-full md:w-auto"
        >
          Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
