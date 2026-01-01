import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners - FlyHigher",
  description: "Meet our trusted airline partners. We work with the world's best airlines to bring you the best deals.",
};

const partners = [
  { name: "Garuda Indonesia", icon: "flight", flights: "450+", destinations: "90+" },
  { name: "Singapore Airlines", icon: "airlines", flights: "380+", destinations: "130+" },
  { name: "Emirates", icon: "flight_takeoff", flights: "520+", destinations: "150+" },
  { name: "Qatar Airways", icon: "airplane_ticket", flights: "410+", destinations: "160+" },
  { name: "Cathay Pacific", icon: "flight_land", flights: "280+", destinations: "85+" },
  { name: "ANA", icon: "connecting_airports", flights: "320+", destinations: "95+" },
];

export default function PartnersPage() {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-slate-800 dark:from-accent/20 dark:to-background-dark py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
            <span className="material-symbols-outlined text-accent">handshake</span>
            <span className="text-white text-sm font-medium">Trusted Partners</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Our Airline Partners
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We partner with the world&apos;s leading airlines to bring you the best flight options and competitive prices.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20 w-full">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-black text-accent">50+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Partner Airlines</p>
          </div>
          <div>
            <p className="text-3xl font-black text-accent">3000+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Daily Flights</p>
          </div>
          <div>
            <p className="text-3xl font-black text-accent">200+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Destinations</p>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Featured Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                <span className="material-symbols-outlined text-3xl text-accent">
                  {partner.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {partner.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">flight</span>
                  {partner.flights} flights
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {partner.destinations} destinations
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Partner Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-accent">savings</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Best Prices</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Exclusive deals and competitive pricing through our partner network.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-accent">verified</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Trusted Quality</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                All partners meet our strict quality and safety standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-accent">support_agent</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Round-the-clock customer service for all bookings.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
