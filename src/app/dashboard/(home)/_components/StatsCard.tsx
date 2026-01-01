interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  color?: "green" | "blue" | "gray" | "warning";
  variant?: "default" | "highlight";
  isLive?: boolean;
  progress?: number; // 0-100
}

const colorMap = {
  green: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
  },
  blue: {
    bg: "bg-accent/5 dark:bg-accent/10",
    icon: "text-accent",
    iconBg: "bg-white dark:bg-gray-800",
  },
  gray: {
    bg: "bg-white dark:bg-surface-dark",
    icon: "text-gray-600 dark:text-gray-400",
    iconBg: "bg-gray-100 dark:bg-gray-800",
  },
  warning: {
    bg: "bg-white dark:bg-surface-dark",
    icon: "text-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-900/30",
  },
};

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  color = "gray",
  variant = "default",
  isLive = false,
  progress,
}: StatsCardProps) => {
  const colors = colorMap[color];
  const isHighlight = variant === "highlight";

  return (
    <div
      className={`
        rounded-2xl p-5 flex flex-col justify-between h-32 
        transition-all duration-300 hover:shadow-lg cursor-default
        border 
        ${isHighlight
          ? "bg-accent/5 dark:bg-accent/10 border-accent/20 dark:border-accent/30"
          : "bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800"}
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {isLive && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
            )}
            <p className={`text-xs font-semibold uppercase tracking-wider ${isLive ? "text-accent" : "text-gray-500 dark:text-gray-400"
              }`}>
              {title}
            </p>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${colors.iconBg}`}>
          <span className={`material-symbols-outlined ${colors.icon}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      {progress !== undefined ? (
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-auto overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      ) : trend ? (
        <div className="flex items-center gap-2 mt-auto">
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5
            ${trend.isPositive
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
              : "text-red-600 dark:text-red-400 bg-red-500/10"}`}
          >
            <span className="material-symbols-outlined text-[12px]">
              {trend.isPositive ? "trending_up" : "trending_down"}
            </span>
            {trend.value}%
          </span>
          <span className="text-xs text-gray-400">{trend.label || "vs last month"}</span>
        </div>
      ) : isLive ? (
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Now in the air</span>
        </div>
      ) : null}
    </div>
  );
};

export default StatsCard;
