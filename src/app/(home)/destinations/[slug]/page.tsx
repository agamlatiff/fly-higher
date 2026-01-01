import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Static destination data (can be replaced with database)
const destinations = [
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200",
    price: "$450",
    description: "Known as the Island of the Gods, Bali is a tropical paradise famous for its stunning beaches, ancient temples, lush rice terraces, and vibrant culture. Whether you're seeking relaxation, adventure, or spiritual enlightenment, Bali offers an unforgettable experience.",
    highlights: ["Beautiful beaches", "Ancient temples", "Rice terraces", "Vibrant nightlife"],
    weather: "Tropical - 27°C avg",
    bestTime: "April - October",
    flights: 24,
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
    price: "$680",
    description: "Tokyo is a city where traditional culture and cutting-edge technology coexist. From historic temples and serene gardens to futuristic skyscrapers and bustling shopping districts, Tokyo offers endless discoveries at every corner.",
    highlights: ["Historic temples", "Modern technology", "World-class cuisine", "Cherry blossoms"],
    weather: "Temperate - 16°C avg",
    bestTime: "March - May, Sept - Nov",
    flights: 18,
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200",
    price: "$520",
    description: "The City of Light captivates visitors with its romantic ambiance, world-renowned art museums, iconic landmarks, and exquisite cuisine. Paris is a timeless destination that continues to enchant travelers from around the world.",
    highlights: ["Eiffel Tower", "Louvre Museum", "French cuisine", "Fashion capital"],
    weather: "Mild - 12°C avg",
    bestTime: "April - June, Sept - Oct",
    flights: 32,
  },
];

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = destinations.find((d) => d.slug === params.slug);
  if (!destination) return { title: "Destination Not Found" };

  return {
    title: `${destination.name}, ${destination.country} - FlyHigher`,
    description: destination.description.slice(0, 160),
  };
}

export default function DestinationDetailPage({ params }: Props) {
  const destination = destinations.find((d) => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${destination.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Destinations
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2">
            {destination.name}
          </h1>
          <p className="text-white/80 text-xl flex items-center gap-2">
            <span className="material-symbols-outlined">location_on</span>
            {destination.country}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">info</span>
                About {destination.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">stars</span>
                Highlights
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <span className="material-symbols-outlined text-accent">check_circle</span>
                    <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Info */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">travel_explore</span>
                Travel Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <span className="material-symbols-outlined text-lg">thermostat</span>
                    <span className="text-xs uppercase font-bold">Weather</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {destination.weather}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                    <span className="text-xs uppercase font-bold">Best Time</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {destination.bestTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                <p className="text-4xl font-black text-accent">{destination.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span className="material-symbols-outlined text-lg">flight</span>
                {destination.flights} flights available daily
              </div>

              <Link
                href={`/available-flights?arrival=${destination.name}`}
                className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-sky-400 text-primary font-bold py-3 rounded-full transition shadow-lg shadow-accent/20"
              >
                <span className="material-symbols-outlined">search</span>
                Find Flights
              </Link>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-primary to-slate-800 dark:from-accent/20 dark:to-surface-dark rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">lightbulb</span>
                Quick Facts
              </h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-accent text-lg">schedule</span>
                  Book at least 2 weeks in advance for best prices
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-accent text-lg">luggage</span>
                  Most flights include 20kg checked baggage
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-accent text-lg">credit_card</span>
                  Flexible payment options available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
