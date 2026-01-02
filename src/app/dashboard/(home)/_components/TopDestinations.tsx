interface Destination {
  rank: number;
  name: string;
  count: number;
}

interface TopDestinationsProps {
  destinations?: Destination[];
}

const TopDestinations = ({ destinations = [] }: TopDestinationsProps) => {
  const maxCount = destinations.length > 0 ? Math.max(...destinations.map((d) => d.count)) : 0;

  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top Destinations</h2>
        <button className="text-gray-400 hover:text-accent transition">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>

      <div className="space-y-6">
        {destinations.map((dest) => {
          const percentage = Math.round((dest.count / maxCount) * 100);
          const opacity = dest.rank === 1 ? "" : dest.rank === 2 ? "opacity-70" : dest.rank === 3 ? "opacity-50" : "opacity-30";

          return (
            <div key={dest.rank}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold w-5 h-5 rounded flex items-center justify-center ${dest.rank === 1
                      ? "bg-accent text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                  >
                    {dest.rank}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{dest.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{dest.count.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-accent rounded-full transition-all ${opacity}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopDestinations;
