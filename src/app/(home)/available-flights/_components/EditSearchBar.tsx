"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Calendar, Plane } from "lucide-react";

interface EditSearchBarProps {
  departure: string;
  arrival: string;
  date: string;
  isModalOpen?: boolean;
  onClose?: () => void;
}

const EditSearchBar = ({
  departure,
  arrival,
  date,
  isModalOpen: controlledOpen,
  onClose,
}: EditSearchBarProps) => {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled or uncontrolled mode
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = (value: boolean) => {
    if (controlledOpen !== undefined) {
      if (!value && onClose) onClose();
    } else {
      setInternalOpen(value);
    }
  };

  const [formData, setFormData] = useState({
    departure: departure === "Select City" ? "" : departure,
    arrival: arrival === "Select City" ? "" : arrival,
    date,
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.departure) params.set("departure", formData.departure);
    if (formData.arrival) params.set("arrival", formData.arrival);
    if (formData.date) params.set("date", formData.date);
    router.push(`/available-flights?${params.toString()}`);
    setIsOpen(false);
  };

  const displayText =
    departure === "Select City" && arrival === "Select City"
      ? "Search flights..."
      : `${departure} → ${arrival}`;

  return (
    <>
      {/* Search Display */}
      <div className="w-full md:w-auto min-w-[320px]">
        <div className="flex w-full items-center rounded-xl h-12 bg-gray-100 p-1 pr-1 shadow-inner">
          <Search className="w-4 h-4 text-gray-400 ml-3 mr-2 flex-shrink-0" />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex-1 text-left bg-transparent text-text-dark text-sm font-medium truncate"
          >
            {displayText}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="h-10 px-5 rounded-lg bg-white text-sky-primary text-sm font-bold shadow-sm hover:shadow hover:bg-gray-50 transition-all flex items-center"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Modal - Fixed Center */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-primary/10 rounded-xl flex items-center justify-center">
                  <Plane className="w-5 h-5 text-sky-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">
                  Edit Search
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* From */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 block">
                  From
                </label>
                <input
                  type="text"
                  value={formData.departure}
                  onChange={(e) =>
                    setFormData({ ...formData, departure: e.target.value })
                  }
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-text-dark font-medium focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/10 transition-all outline-none"
                  placeholder="e.g. Jakarta"
                />
              </div>

              {/* To */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 block">
                  To
                </label>
                <input
                  type="text"
                  value={formData.arrival}
                  onChange={(e) =>
                    setFormData({ ...formData, arrival: e.target.value })
                  }
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-text-dark font-medium focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/10 transition-all outline-none"
                  placeholder="e.g. Bali"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 block">
                  Departure Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-text-dark font-medium focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/10 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-14 bg-sky-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-sky-primary/30 transition-all flex items-center justify-center gap-2 mt-6"
              >
                Search Flights
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditSearchBar;

