"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import useTransaction from "@/hooks/useTransaction";
import { rupiahFormat, SEAT_VALUES, type SeatValuesType } from "@/lib/utils";
import type { User } from "@/lib/auth";
import { ArrowRight, Loader2 } from "lucide-react";
import { useMemo } from "react";

interface MobilePaymentBarProps {
  user: User | null;
}

const MobilePaymentBar = ({ user }: MobilePaymentBarProps) => {
  const { data } = useCheckoutData();
  const { isLoading, payTransaction } = useTransaction({ user });

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data?.seat]);

  const totalPrice = useMemo(() => {
    if (!data?.flightDetail?.price) return 0;
    return data.flightDetail.price + selectedSeat.additionalPrice;
  }, [data?.flightDetail?.price, selectedSeat.additionalPrice]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-gray-500 text-xs font-medium">Total Payment</p>
          <p className="text-sky-primary text-xl font-black tracking-tight">
            {rupiahFormat(totalPrice)}
          </p>
        </div>

        <button
          type="button"
          onClick={payTransaction}
          disabled={isLoading}
          className="flex-1 max-w-[200px] h-12 bg-sky-primary hover:bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-sky-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Pay Now
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MobilePaymentBar;
