interface FlightDistributionProps {
  international?: number;
  domestic?: number;
}

const FlightDistribution = ({
  international = 842,
  domestic = 453,
}: FlightDistributionProps) => {
  const total = international + domestic;
  const internationalPercent = Math.round((international / total) * 100);

  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Flight Distribution</h2>
        <p className="text-sm text-gray-400">By flight type</p>
      </div>

      {/* Donut Chart */}
      <div className="flex-1 flex items-center justify-center relative my-4">
        <div
          className="w-48 h-48 rounded-full relative"
          style={{
            background: `conic-gradient(#0ea5e9 0% ${internationalPercent}%, #cbd5e1 ${internationalPercent}% 100%)`,
          }}
        >
          <div className="absolute inset-0 m-auto w-36 h-36 bg-white dark:bg-surface-dark rounded-full flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-gray-800 dark:text-white">{internationalPercent}%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">International</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3 mt-auto">
        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">International</span>
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{international.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Domestic</span>
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{domestic.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightDistribution;
