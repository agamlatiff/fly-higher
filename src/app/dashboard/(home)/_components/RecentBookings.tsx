import type { RecentBooking } from "../lib/dashboard-data";
import Link from "next/link";

interface RecentBookingsProps {
  bookings: RecentBooking[];
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  SUCCESS: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/10" },
  PENDING: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/10" },
  FAILED: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", border: "border-red-500/10" },
  CANCELLED: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400", border: "border-gray-500/10" },
};

const statusLabels: Record<string, string> = {
  SUCCESS: "Confirmed",
  PENDING: "Pending",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
};

// Get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Generate color based on name
function getAvatarColor(name: string): string {
  const colors = [
    "bg-indigo-100 text-indigo-600",
    "bg-pink-100 text-pink-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-600",
    "bg-purple-100 text-purple-600",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

const RecentBookings = ({ bookings }: RecentBookingsProps) => {
  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Recent Bookings
        </h3>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No bookings yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800 overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Bookings</h2>
        <Link
          href="/dashboard/tickets"
          className="text-xs font-semibold text-accent hover:text-sky-600 bg-accent/10 dark:bg-accent/20 px-3 py-1.5 rounded-lg transition"
        >
          View All
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
            <th className="pb-3 pl-2 font-medium">Passenger</th>
            <th className="pb-3 font-medium">Route</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Class</th>
            <th className="pb-3 font-medium text-right pr-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {bookings.map((booking, index) => {
            const colors = statusColors[booking.status] || statusColors.PENDING;
            const statusLabel = statusLabels[booking.status] || booking.status;
            const avatarColor = getAvatarColor(booking.customerName);

            return (
              <tr
                key={booking.id}
                className={`group hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors ${index !== bookings.length - 1 ? "border-b border-gray-50 dark:border-gray-800" : ""
                  }`}
              >
                <td className="py-4 pl-2 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${avatarColor}`}>
                    {getInitials(booking.customerName)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">{booking.customerName}</span>
                    <span className="text-[10px] text-gray-400">#{booking.id.slice(-6).toUpperCase()}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1 font-medium">
                    {booking.route.split(" → ")[0]}
                    <span className="material-symbols-outlined text-[10px] text-gray-400">arrow_forward</span>
                    {booking.route.split(" → ")[1]}
                  </div>
                </td>
                <td className="py-4 text-gray-500 dark:text-gray-400">
                  {new Date(booking.bookingDate).toLocaleDateString("en", { month: "short", day: "numeric" })}
                </td>
                <td className="py-4 text-gray-500 dark:text-gray-400">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded text-xs">
                    Economy
                  </span>
                </td>
                <td className="py-4 text-right pr-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {statusLabel}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookings;
