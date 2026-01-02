"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface InlineSearchFormProps {
  departure: string;
  arrival: string;
  date: string;
}

const InlineSearchForm = ({
  departure,
  arrival,
  date,
}: InlineSearchFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    departure: departure === "Select City" ? "" : departure,
    arrival: arrival === "Select City" ? "" : arrival,
    date,
  });

  // Sync form data with URL params
  useEffect(() => {
    setFormData({
      departure: departure === "Select City" ? "" : departure,
      arrival: arrival === "Select City" ? "" : arrival,
      date,
    });
  }, [departure, arrival, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.departure) params.set("departure", formData.departure);
    if (formData.arrival) params.set("arrival", formData.arrival);
    if (formData.date) params.set("date", formData.date);
    router.push(`/available-flights?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Departure */}
          <div className="md:col-span-4 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-primary transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/10 outline-none transition-all placeholder:text-gray-400"
              placeholder="From (e.g. Jakarta)"
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">From</span>
          </div>

          {/* Arrival */}
          <div className="md:col-span-4 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-primary transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={formData.arrival}
              onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/10 outline-none transition-all placeholder:text-gray-400"
              placeholder="To (e.g. Bali)"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">To</span>
          </div>

          {/* Date */}
          <div className="md:col-span-3 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-primary transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/10 outline-none transition-all text-sm"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full h-12 bg-sky-primary hover:bg-sky-600 text-white rounded-xl shadow-lg shadow-sky-primary/20 hover:shadow-sky-primary/40 transition-all flex items-center justify-center group"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InlineSearchForm;
