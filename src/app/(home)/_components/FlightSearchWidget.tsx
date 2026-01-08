"use client";

import { useState } from "react";

interface FlightSearchWidgetProps {
  cities: { departureCity: string; destinationCity: string }[];
  searchAction: (formData: FormData) => void;
}

const FlightSearchWidget = ({ cities, searchAction }: FlightSearchWidgetProps) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const handleSwap = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const uniqueDepartures = [...new Set(cities.map((c) => c.departureCity))];
  const uniqueArrivals = [...new Set(cities.map((c) => c.destinationCity))];

  return (
    <div className="bg-white dark:bg-surface-dark p-2 rounded-[2rem] shadow-card border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto relative z-20">
      <form action={searchAction}>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* From */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-transparent hover:border-accent/30 hover:bg-white dark:hover:bg-gray-800 transition group cursor-pointer relative">
              <label htmlFor="departure-city" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                From
              </label>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-accent transition text-lg">
                  flight_takeoff
                </span>
                <select
                  name="departure"
                  id="departure-city"
                  aria-label="Select departure city"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="bg-transparent border-none p-0 text-gray-900 dark:text-white font-medium focus:ring-0 focus:outline-none cursor-pointer appearance-none w-full truncate [&>option]:bg-white [&>option]:dark:bg-gray-800 [&>option]:text-gray-900 [&>option]:dark:text-white"
                  required
                >
                  <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select city</option>
                  {uniqueDepartures.map((city) => (
                    <option key={city} value={city} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              {/* Swap button */}
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap departure and arrival cities"
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center text-accent hover:scale-110 transition-transform md:hidden"
              >
                <span className="material-symbols-outlined text-sm">swap_horiz</span>
              </button>
            </div>

            {/* To */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-transparent hover:border-accent/30 hover:bg-white dark:hover:bg-gray-800 transition group cursor-pointer">
              <label htmlFor="arrival-city" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                To
              </label>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-accent transition text-lg">
                  flight_land
                </span>
                <select
                  name="arrival"
                  id="arrival-city"
                  aria-label="Select arrival city"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  className="bg-transparent border-none p-0 text-gray-900 dark:text-white font-medium focus:ring-0 focus:outline-none cursor-pointer appearance-none w-full truncate [&>option]:bg-white [&>option]:dark:bg-gray-800 [&>option]:text-gray-900 [&>option]:dark:text-white"
                  required
                >
                  <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select city</option>
                  {uniqueArrivals.map((city) => (
                    <option key={city} value={city} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-transparent hover:border-accent/30 hover:bg-white dark:hover:bg-gray-800 transition group cursor-pointer">
              <label htmlFor="flight-date" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Date
              </label>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-accent transition text-lg">
                  calendar_month
                </span>
                <input
                  type="date"
                  name="date"
                  id="flight-date"
                  aria-label="Select flight date"
                  className="bg-transparent border-none p-0 text-gray-900 dark:text-white font-medium focus:ring-0 focus:outline-none cursor-pointer w-full [color-scheme:light] dark:[color-scheme:dark]"
                  required
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-transparent hover:border-accent/30 hover:bg-white dark:hover:bg-gray-800 transition group cursor-pointer">
              <label htmlFor="passenger-count" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Passengers
              </label>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-accent transition text-lg">
                  group
                </span>
                <select
                  name="passengers"
                  id="passenger-count"
                  aria-label="Select number of passengers"
                  className="bg-transparent border-none p-0 text-gray-900 dark:text-white font-medium focus:ring-0 focus:outline-none cursor-pointer appearance-none w-full truncate [&>option]:bg-white [&>option]:dark:bg-gray-800 [&>option]:text-gray-900 [&>option]:dark:text-white"
                >
                  <option value="1" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">1 Adult</option>
                  <option value="2" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">2 Adults</option>
                  <option value="3" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">3 Adults</option>
                  <option value="4" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">4 Adults</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-slate-800 dark:bg-accent dark:hover:bg-sky-300 dark:text-primary text-white p-4 md:px-8 rounded-2xl text-base font-bold transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2 min-w-[140px]"
          >
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearchWidget;
