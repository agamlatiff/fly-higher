"use client";

import { CreditCard, Wallet, Smartphone } from "lucide-react";

interface PaymentMethodTabsProps {
  paymentMethod: "card" | "wallet" | "apple";
  setPaymentMethod: (method: "card" | "wallet" | "apple") => void;
}

const PaymentMethodTabs = ({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodTabsProps) => {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${paymentMethod === "card"
            ? "bg-sky-primary text-white shadow-md"
            : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-sm font-bold">Credit Card</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("wallet")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${paymentMethod === "wallet"
            ? "bg-sky-primary text-white shadow-md"
            : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-sm font-bold">E-Wallet</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("apple")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${paymentMethod === "apple"
            ? "bg-sky-primary text-white shadow-md"
            : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-sm font-bold">QRIS</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodTabs;
