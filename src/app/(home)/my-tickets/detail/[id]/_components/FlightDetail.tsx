import { getUrlFile } from "@/lib/supabase";
import { dateFormat } from "@/lib/utils";
import type {
  Airplane,
  Flight,
  FlightSeat,
  Ticket,
  User,
} from "@prisma/client";
import Image from "next/image";

type Data = Ticket & {
  flight: Flight & { plane: Airplane };
  customer: User;
  seat: FlightSeat;
};

interface FlightDetailProps {
  data: Data;
}

const FlightDetail = ({ data }: FlightDetailProps) => {
  return (
    <div className="bg-white flex flex-col rounded-[20px] w-[340px]">
      <div className="flex flex-col p-[20px_20px_25px] border-b-2 border-dotted border-flysha-grey gap-4 relative">
        <div className="flex w-[300px] h-[130px] shrink-0 rounded-[14px] overflow-hidden bg-[#EDE8F5]">
          <Image
            width={300}
            height={130}
            src={getUrlFile(data.flight.plane.image)}
            className="w-full h-full object-cover"
            alt="thumbnail"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-[2px]">
            <p className="font-bold text-lg text-flysha-black">
              {data.flight.plane.name}
            </p>
            <p className="text-sm text-flysha-grey">
              {data.flight.plane.code} • {data.seat.type}
            </p>
          </div>
          <div className="flex h-fit">
            <Image
              width={20}
              height={20}
              src="/assets/images/icons/Star.svg"
              className="w-5 h-5"
              alt="star"
            />
            <Image
              width={20}
              height={20}
              src="/assets/images/icons/Star.svg"
              className="w-5 h-5"
              alt="star"
            />
            <Image
              width={20}
              height={20}
              src="/assets/images/icons/Star.svg"
              className="w-5 h-5"
              alt="star"
            />
            <Image
              width={20}
              height={20}
              src="/assets/images/icons/Star.svg"
              className="w-5 h-5"
              alt="star"
            />
            <Image
              width={20}
              height={20}
              src="/assets/images/icons/Star.svg"
              className="w-5 h-5"
              alt="star"
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-[370px] absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 -bottom-[30px]">
          <div className="w-[30px] h-[30px] rounded-full flex shrink-0 bg-flysha-black" />
          <div className="w-[30px] h-[30px] rounded-full flex shrink-0 bg-flysha-black" />
        </div>
      </div>
      <div className="flex flex-col gap-[10px] p-[25px_20px_20px]">
        <div className="flex justify-between text-flysha-black">
          <span>Date</span>
          <span className="font-semibold">
            {dateFormat(data.bookingDate, "DD MMM YYYY")}
          </span>
        </div>
        <div className="flex justify-between text-flysha-black">
          <span>Time</span>
          <span className="font-semibold">
            {dateFormat(data.flight.departureDate, "HH:mm")} -{" "}
            {dateFormat(data.flight.arrivalDate, "HH:mm")}
          </span>
        </div>
        <div className="flex justify-between text-flysha-black">
          <span>Airport</span>
          <span className="font-semibold">
            {data.flight.departureCityCode} - {data.flight.destinationCityCode}
          </span>
        </div>
        <div className="flex justify-between text-flysha-black">
          <span>Name</span>
          <span className="font-semibold">{data.customer.name}</span>
        </div>
        <div className="flex justify-between text-flysha-black">
          <span>Seat Choosen</span>
          <span className="font-semibold">{data.seat.seatNumber}</span>
        </div>
        <div className="flex justify-between text-flysha-black">
          <span>Passport No.</span>
          <span className="font-semibold">{data.customer.passport}</span>
        </div>
        <div className="flex justify-between text-flysha-black">
          <span>Passenger</span>
          <span className="font-semibold">1 Person</span>
        </div>
      </div>
    </div>
  );
};

export default FlightDetail;
