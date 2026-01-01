"use client";

import { useContext, useMemo } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { SEAT_VALUES, rupiahFormat, type SeatValuesType } from "@/lib/utils";
import { ArrowRight, Plane } from "lucide-react";

interface MobileSummaryBarProps {
  basePrice: number;
  onConfirm: () => void;
}

const MobileSummaryBar = ({ basePrice, onConfirm }: MobileSummaryBarProps) => {
  const { selectedSeat, selectedClass } = useContext(seatContext) as SeatContextType;

  const seatClass = useMemo(() => {
    return SEAT_VALUES[selectedClass as SeatValuesType];
  }, [selectedClass]);

  const totalPrice = basePrice + seatClass.additionalPrice;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-inset-bottom">
      <div className="px-4 py-3">
        {/* Selected Seat Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Seat Badge */}
            <div
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shadow-md transition-all ${selectedSeat
                  ? "bg-sky-primary text-white"
                  : "bg-gray-100 text-gray-400"
                }`}
            >
              <span className="text-[10px] font-medium opacity-80">Seat</span>
              <span className="text-lg font-bold leading-none">
                {selectedSeat?.seatNumber || "—"}
              </span>
            </div>

            {/* Class & Price */}
            <div>
              <div className="flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-sky-primary" />
                <span className="text-sm font-bold text-gray-800">
                  {seatClass.label} Class
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {selectedSeat ? `${selectedSeat.seatNumber} selected` : "No seat selected"}
              </p>
            </div>
          </div>

          {/* Total Price */}
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total</p>
            <p className="text-lg font-black text-sky-primary">
              {rupiahFormat(totalPrice)}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onConfirm}
          disabled={!selectedSeat}
          className={`
            w-full font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2
            ${selectedSeat
              ? "bg-sky-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-[0.98]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {selectedSeat ? (
            <>
              Confirm Seat Selection
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            "Select a seat to continue"
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileSummaryBar;
