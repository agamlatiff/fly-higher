import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations - FlyHigher",
  description: "Explore trending destinations and find your next adventure with FlyHigher.",
};

const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    price: "$450",
    flights: 24,
    description: "Island of the Gods",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    price: "$680",
    flights: 18,
    description: "Where tradition meets future",
  },
  {
    id: 3,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    price: "$520",
    flights: 32,
    description: "City of Lights",
  },
  {
    id: 4,
    name: "New York",
    country: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    price: "$380",
    flights: 56,
    description: "The City That Never Sleeps",
  },
  {
    id: 5,
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    price: "$420",
    flights: 28,
    description: "City of Gold",
  },
  {
    id: 6,
    name: "Singapore",
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
    price: "$320",
    flights: 42,
    description: "Garden City",
  },
];

export default function DestinationsPage() {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-slate-800 dark:from-accent/20 dark:to-background-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-white" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full border border-white/50" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-3xl text-accent">explore</span>
            <span className="text-accent text-sm font-bold uppercase tracking-wider">
              Explore the World
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Popular Destinations
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Discover amazing places around the world. Find the best flights to your dream destinations.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 w-full">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
          />
          <button className="bg-accent hover:bg-sky-400 text-primary font-bold px-6 py-2 rounded-full transition">
            Search
          </button>
        </div>
      </div>

      {/* Destinations Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/available-flights?arrival=${dest.name}`}
              className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-card border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${dest.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{dest.name}</h3>
                  <p className="text-sm text-white/80">{dest.country}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  From {dest.price}
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">flight</span>
                    {dest.flights} flights/day
                  </span>
                  <span className="text-accent text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Flights
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
