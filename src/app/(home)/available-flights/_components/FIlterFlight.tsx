"use client";

const FIlterFlight = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-900 dark:text-white text-sm font-bold mb-1">Stops</p>

      <label htmlFor="direct" className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="flight"
          id="direct"
          defaultChecked
          className="peer sr-only"
        />
        <div className="w-5 h-5 border-2 border-gray-200 dark:border-gray-600 rounded-md flex items-center justify-center transition-colors peer-checked:bg-accent peer-checked:border-accent">
          <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium group-hover:text-accent transition-colors">
          Non-stop
        </span>
      </label>

      <label htmlFor="transit" className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="flight"
          id="transit"
          className="peer sr-only"
        />
        <div className="w-5 h-5 border-2 border-gray-200 dark:border-gray-600 rounded-md flex items-center justify-center transition-colors peer-checked:bg-accent peer-checked:border-accent">
          <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium group-hover:text-accent transition-colors">
          1 Stop
        </span>
      </label>

      <label htmlFor="transits" className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="flight"
          id="transits"
          className="peer sr-only"
        />
        <div className="w-5 h-5 border-2 border-gray-200 dark:border-gray-600 rounded-md flex items-center justify-center transition-colors peer-checked:bg-accent peer-checked:border-accent">
          <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium group-hover:text-accent transition-colors">
          2+ Stops
        </span>
      </label>
    </div>
  );
};

export default FIlterFlight;
