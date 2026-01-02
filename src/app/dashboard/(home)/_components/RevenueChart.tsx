"use client";

"use strict";
import { rupiahFormat } from "@/lib/utils";

interface RevenueChartProps {
  data?: { name: string; total: number }[];
}

const RevenueChart = ({ data = [] }: RevenueChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.total));
  // Normalize data for SVG (height 200px)
  const chartHeight = 200;
  const chartWidth = 100; // Percentage based

  // Calculate points
  const points = data.map((d, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = maxRevenue > 0 ? chartHeight - (d.total / maxRevenue) * chartHeight : chartHeight;
    return { x, y, value: d.total, label: d.name };
  });

  // Create path string
  const pathData = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  // Gradient area path
  const areaPath = `${pathData} L 100 ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 min-h-[400px]">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Revenue Performance
          </h2>
          <p className="text-sm text-gray-400">Monthly revenue for the last 6 months</p>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full h-64">
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox={`0 0 100 ${chartHeight}`}
        >
          {/* Grid Lines */}
          <g className="opacity-30">
            {[0, 0.25, 0.5, 0.75, 1].map((p) => {
              const y = chartHeight * p;
              return (
                <line
                  key={p}
                  x1="0"
                  x2="100"
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  className="stroke-gray-200 dark:stroke-gray-700"
                  strokeDasharray="4"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </g>

          {/* Gradient Fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#0ea5e9", stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: "#0ea5e9", stopOpacity: 0 }} />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#chartGradient)" stroke="none" />

          {/* Line Path */}
          <path
            d={pathData}
            fill="none"
            className="stroke-accent"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Data Points - Removed from SVG to fix distortion */}
        </svg>

        {/* Data Points (HTML Overlay) */}
        <div className="absolute inset-0 pointer-events-none">
          {points.map((point, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white border-2 border-accent rounded-full -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer pointer-events-auto shadow-sm"
              style={{
                left: `${point.x}%`,
                top: `${(point.y / chartHeight) * 100}%`,
              }}
            >
              <title>{`${point.label}: ${rupiahFormat(point.value)}`}</title>
            </div>
          ))}
        </div>

        {/* X-axis Labels */}
        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">
          {data.map((d, i) => (
            <span key={i}>{d.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;


