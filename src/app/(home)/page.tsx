import { getCityFilter } from "./lib/data";
import { searchFlight } from "./lib/actions";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import FlightSearchWidget from "./_components/FlightSearchWidget";
import Link from "next/link";


const HomePage = async () => {
  const filter = await getCityFilter();

  return (
    <div className="bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 px-6 overflow-hidden">
        {/* Background Decorative Lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30 dark:opacity-10"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="text-gray-200 dark:text-gray-700"
            d="M-100,500 C200,600 500,200 900,300 C1200,400 1300,100 1600,200"
            fill="none"
            stroke="currentColor"
            strokeDasharray="8,8"
            strokeWidth="2"
          />
          <path
            className="text-gray-100 dark:text-gray-800"
            d="M-100,700 C300,700 400,400 800,500 C1100,600 1400,400 1600,600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-3 py-1 rounded-full text-xs font-medium mb-8 text-gray-600 dark:text-gray-300 shadow-sm animate-float">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            The smarter way to fly
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900 dark:text-white">
            Elevate your travel with <br />
            <span className="highlight-underline">seamless</span> connections
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            FlyHigher simplifies your journey. Compare global airlines, secure
            exclusive rates, and manage bookings effortlessly in one dashboard.
          </p>

          {/* Search Widget */}
          <FlightSearchWidget cities={filter} searchAction={searchFlight} />
        </div>

        {/* Floating Cards */}
        <div className="absolute top-32 left-10 lg:left-24 hidden md:block animate-float">
          <div className="p-3 rounded-2xl bg-white dark:bg-surface-dark shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined">flight</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                Flight Confirmed
              </div>
              <div className="text-[10px] text-gray-400">NYC → PAR</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-10 lg:right-24 hidden md:block animate-float-delayed">
          <div className="p-3 rounded-2xl bg-white dark:bg-surface-dark shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500">
              <span className="material-symbols-outlined">savings</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                Best Price Found
              </div>
              <div className="text-[10px] text-gray-400">Saved $45</div>
            </div>
          </div>
        </div>
      </header>

      {/* Partners Section */}
      <div className="border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark/50">
        <div className="max-w-7xl mx-auto py-10 px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8">
            Trusting Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">airlines</span>
              SkyAir
            </span>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">flight</span>
              JetStream
            </span>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">travel_explore</span>
              AeroGlobal
            </span>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">cloud</span>
              CloudAir
            </span>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">public</span>
              WorldWings
            </span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50/50 dark:bg-background-dark">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need for a <br />
            smooth journey
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            From finding the perfect destination to managing your boarding passes,
            FlyHigher handles the details so you can enjoy the trip.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Trending Destinations Card */}
          <div className="md:col-span-2 bg-white dark:bg-surface-dark rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-10 overflow-hidden relative shadow-card border border-gray-100 dark:border-gray-800">
            <div className="md:w-1/3 z-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Trending Destinations
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">
                Explore the most sought-after locations this season. Whether you
                seek adventure or relaxation, we have the perfect flight.
              </p>
              <Link
                href="/destinations"
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl text-sm font-semibold transition flex items-center gap-2 w-fit"
              >
                View All Destinations
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="md:w-2/3 flex-grow bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
                  Top Picks
                </span>
                <div className="flex gap-2">
                  <span className="text-xs px-3 py-1 bg-white dark:bg-gray-800 shadow-sm rounded-full text-gray-600 dark:text-gray-300 font-medium">
                    International
                  </span>
                  <span className="text-xs px-3 py-1 text-gray-400 font-medium cursor-pointer hover:text-gray-600">
                    Domestic
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 h-48">
                <div
                  className="rounded-xl bg-cover bg-center relative overflow-hidden group cursor-pointer shadow-sm"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition duration-300" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="font-bold text-sm">Bali</div>
                    <div className="text-[10px] opacity-80">Indonesia</div>
                  </div>
                </div>
                <div
                  className="rounded-xl bg-cover bg-center relative overflow-hidden group cursor-pointer shadow-sm"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition duration-300" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="font-bold text-sm">Tokyo</div>
                    <div className="text-[10px] opacity-80">Japan</div>
                  </div>
                </div>
                <div
                  className="rounded-xl bg-cover bg-center relative overflow-hidden group cursor-pointer shadow-sm"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition duration-300" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="font-bold text-sm">Paris</div>
                    <div className="text-[10px] opacity-80">France</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exclusive Deals Card */}
          <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-8 flex flex-col shadow-card border border-gray-100 dark:border-gray-800">
            <div className="mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">local_offer</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Exclusive Deals
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Members save an average of 15% on international flights. Join
                today for free.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary dark:group-hover:text-accent transition">
                    flight_takeoff
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                      New York <span className="text-gray-400 font-normal">to</span>{" "}
                      London
                    </span>
                    <span className="text-[10px] text-gray-500">Oct 12 - Oct 19</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-primary dark:text-accent">
                    $340
                  </span>
                  <span className="text-[10px] text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                    -20%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary dark:group-hover:text-accent transition">
                    flight_takeoff
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                      Los Angeles <span className="text-gray-400 font-normal">to</span>{" "}
                      Tokyo
                    </span>
                    <span className="text-[10px] text-gray-500">Nov 05 - Nov 20</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-primary dark:text-accent">
                    $620
                  </span>
                  <span className="text-[10px] text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                    -15%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Easy Booking Process Card */}
          <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-8 flex flex-col shadow-card border border-gray-100 dark:border-gray-800">
            <div className="mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">event_available</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Easy Booking Process
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                A simplified flow designed for speed and clarity. Book your next
                flight in minutes.
              </p>
            </div>
            <div className="relative pl-6 space-y-8">
              <div className="relative group">
                <div className="absolute left-[-29px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-surface-dark bg-gray-200 dark:bg-gray-600 group-hover:bg-purple-500 transition z-10" />
                <div className="absolute left-[-20px] top-6 bottom-[-32px] w-[2px] bg-gray-100 dark:bg-gray-700" />
                <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                  Select Flight
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Choose from hundreds of airlines with transparent pricing.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute left-[-29px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-surface-dark bg-gray-200 dark:bg-gray-600 group-hover:bg-purple-500 transition z-10" />
                <div className="absolute left-[-20px] top-6 bottom-[-32px] w-[2px] bg-gray-100 dark:bg-gray-700" />
                <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                  Passenger Details
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Auto-fill saved traveler info for faster checkout.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute left-[-29px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-surface-dark bg-gray-200 dark:bg-gray-600 group-hover:bg-purple-500 transition z-10" />
                <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                  Secure Payment
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Encrypted transactions with multiple payment options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-surface-dark py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center text-center gap-10">
          <div>
            <p className="text-4xl font-bold text-primary dark:text-white mb-2">
              2M+
            </p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Daily Flights
            </p>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden md:block" />
          <div>
            <p className="text-4xl font-bold text-primary dark:text-white mb-2">
              50K+
            </p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Happy Travelers
            </p>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden md:block" />
          <div>
            <p className="text-4xl font-bold text-primary dark:text-white mb-2">
              120+
            </p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Countries
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
