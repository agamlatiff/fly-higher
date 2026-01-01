"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import useTransaction from "@/hooks/useTransaction";
import { rupiahFormat, SEAT_VALUES, type SeatValuesType } from "@/lib/utils";
import type { User } from "@/lib/auth";
import { useMemo } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Loader2,
  CreditCard,
  Wallet,
  Smartphone,
  CheckCircle,
} from "lucide-react";

interface PaymentFormProps {
  user: User | null;
}

const PaymentForm = ({ user }: PaymentFormProps) => {
  const { data } = useCheckoutData();

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data?.seat]);

  const totalPrice = useMemo(() => {
    if (!data?.flightDetail?.price) return 0;
    return data.flightDetail.price + selectedSeat.additionalPrice;
  }, [data?.flightDetail?.price, selectedSeat.additionalPrice]);

  const { isLoading, payTransaction } = useTransaction({ user });

  return (
    <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-6 md:p-8 shadow-xl shadow-sky-primary/5 dark:shadow-sky-primary/10 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark dark:text-white mb-2">
          Complete Payment
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Review your booking and proceed to payment.
        </p>
      </div>

      {/* Payment Methods Preview */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
        <h3 className="text-sm font-bold text-text-dark dark:text-white mb-4 uppercase tracking-wider">
          Available Payment Methods
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <CreditCard className="w-8 h-8 text-sky-primary" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Credit Card</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <Wallet className="w-8 h-8 text-sky-primary" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">E-Wallet</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <Smartphone className="w-8 h-8 text-sky-primary" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">QRIS</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
          You&apos;ll select your payment method in the secure payment window
        </p>
      </div>

      {/* What's Included */}
      <div className="space-y-3 mb-8">
        <h3 className="text-sm font-bold text-text-dark dark:text-white uppercase tracking-wider">
          What&apos;s Included
        </h3>
        <div className="space-y-2">
          {[
            "Instant e-ticket confirmation",
            "Free baggage up to 20kg",
            "Free seat selection",
            "24/7 customer support",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 py-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 mb-8">
        <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
        <span className="text-sm text-green-700 dark:text-green-400 font-bold">
          100% Secure Payment via Midtrans
        </span>
      </div>

      {/* Pay Button */}
      <button
        type="button"
        onClick={payTransaction}
        disabled={isLoading}
        className="group relative w-full h-16 bg-sky-primary hover:bg-sky-600 bg-sky-500 text-white rounded-full font-bold text-xl shadow-lg shadow-sky-primary/30 hover:shadow-xl hover:shadow-sky-primary/40 transition-all transform hover:-translate-y-1 active:translate-y-0 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Opening payment...
            </>
          ) : (
            <>
              Pay {rupiahFormat(totalPrice)}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </button>

      {/* Terms */}
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
        By clicking Pay, you agree to our Terms of Service and Privacy Policy.
        Payment is processed securely by Midtrans.
      </p>
    </div>
  );
};

export default PaymentForm;
