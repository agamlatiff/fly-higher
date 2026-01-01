"use client";

const RevenueChart = () => {
  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 min-h-[400px]">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Revenue Performance
          </h2>
          <p className="text-sm text-gray-400">Comparing current period vs previous period</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1 text-gray-800 dark:text-gray-200">
              <span className="w-3 h-3 rounded-full bg-accent" /> This Month
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <span className="w-3 h-3 rounded-full border-2 border-gray-300 dark:border-gray-600 border-dashed" /> Last Month
            </span>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-700 shadow-sm rounded-md text-gray-800 dark:text-white">
              Monthly
            </button>
            <button className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition">
              Weekly
            </button>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full h-64">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
          {/* Grid Lines */}
          <g className="opacity-30">
            {[0, 12.5, 25, 37.5, 50].map((y) => (
              <line
                key={y}
                x1="0" x2="100" y1={y} y2={y}
                stroke="currentColor"
                className="stroke-gray-200 dark:stroke-gray-700"
                strokeDasharray="4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* Last Month Line (Dashed) */}
          <polyline
            fill="none"
            points="0,40 20,35 40,38 60,25 80,30 100,20"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeDasharray="2,1"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Gradient Fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#0ea5e9", stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: "#0ea5e9", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,40 L20,30 L40,15 L60,20 L80,10 L100,5 V50 H0 Z"
            fill="url(#chartGradient)"
            stroke="none"
          />

          {/* This Month Line */}
          <path
            d="M0,40 L20,30 L40,15 L60,20 L80,10 L100,5"
            fill="none"
            className="stroke-accent"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Data Points */}
          {[
            { x: 20, y: 30 },
            { x: 40, y: 15 },
            { x: 60, y: 20 },
            { x: 80, y: 10 },
          ].map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="1.5"
              className="fill-white stroke-accent"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* X-axis Labels */}
        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
          <span>Week 5</span>
          <span>Week 6</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
