import { useMemo, type FC } from "react";
import type { FlightColumn } from "./ColumnsFlight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mappingSeats, rupiahFormat } from "@/lib/utils";

interface ColumnSeatPriceProps {
  flight: FlightColumn;
}

const ColumnSeatPrice: FC<ColumnSeatPriceProps> = ({ flight }) => {
  const {
    economy,
    bussiness,
    first,
    totalSeatEconomy,
    totalSeatBussiness,
    totalSeatFirst,
  } = useMemo(() => mappingSeats(flight.seats), [flight]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger>Economy</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary mr-2">Ticket price</span>
              {rupiahFormat(flight.price)}
            </div>
            <div className="font-medium">
              <span className="text-primary  mr-2">Remaining seats</span>
              {economy}/{totalSeatEconomy}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="w-full">
        <AccordionTrigger>Bussiness</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary mr-2">Ticket price</span>
              {rupiahFormat(flight.price + 500000)}
            </div>
            <div className="font-medium">
              <span className="text-primary mr-2">Remaining seats</span>
               {bussiness}/{totalSeatBussiness}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="w-full">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary  mr-2">Ticket price</span>
              {rupiahFormat(flight.price + 750000)}
            </div>
            <div className="font-medium">
              <span className="text-primary  mr-2">Remaining seats</span>
               {first}/{totalSeatFirst}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColumnSeatPrice;
