import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { getUser } from "@/lib/auth";
import BookingSummary from "./_components/BookingSummary";
import PaymentForm from "./_components/PaymentForm";
import MobilePaymentBar from "./_components/MobilePaymentBar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Complete Your Booking | FlyHigher",
  description:
    "Securely complete your flight booking with our easy payment options. Multiple payment methods available including credit card, e-wallet, and QRIS.",
};

const CheckoutPage = async () => {
  const { user } = await getUser();

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <Navbar />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center gap-3 text-sm font-medium">
            <li>
              <Link
                href="/available-flights"
                className="text-gray-400 dark:text-gray-500 hover:text-accent transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Flights
              </Link>
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li>
              <Link
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-accent transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Seats
              </Link>
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li className="text-accent flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">credit_card</span>
              Payment
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Secure payment for your flight reservation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24 lg:mb-0">
          {/* Left Column: Payment Methods & Form */}
          <div className="lg:col-span-8 space-y-8">
            <PaymentForm user={user} />
          </div>

          {/* Right Column: Booking Summary (Sticky) */}
          <div className="lg:col-span-4 hidden lg:block">
            <BookingSummary user={user} />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <MobilePaymentBar user={user} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CheckoutPage;
