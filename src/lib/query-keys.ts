/**
 * Centralized Query Keys for TanStack Query
 * 
 * Use these keys for consistent caching and invalidation across the app.
 * 
 * @example
 * // In a component
 * const { data } = useQuery({
 *   queryKey: queryKeys.flights.search({ from: 'JKT', to: 'DPS', date: '2025-01-15' }),
 *   queryFn: () => fetchFlights(params)
 * })
 * 
 * // Invalidating after mutation
 * queryClient.invalidateQueries({ queryKey: queryKeys.flights.all })
 */

// Type definitions for query parameters
export interface FlightSearchParams {
  from?: string
  to?: string
  date?: string
  class?: 'ECONOMY' | 'BUSINESS' | 'FIRST'
  passengers?: number
}

export interface BookingFilterParams {
  status?: 'PENDING' | 'SUCCESS' | 'FAILED'
  userId?: string
  startDate?: string
  endDate?: string
}

export const queryKeys = {
  // ============================================
  // FLIGHTS
  // ============================================
  flights: {
    all: ['flights'] as const,
    search: (params: FlightSearchParams) => ['flights', 'search', params] as const,
    detail: (id: string) => ['flights', id] as const,
    bySlug: (slug: string) => ['flights', 'slug', slug] as const,
  },

  // ============================================
  // SEATS
  // ============================================
  seats: {
    all: ['seats'] as const,
    byFlight: (flightId: string) => ['seats', flightId] as const,
    byFlightAndClass: (flightId: string, classType: string) =>
      ['seats', flightId, classType] as const,
  },

  // ============================================
  // BOOKINGS / TICKETS
  // ============================================
  bookings: {
    all: ['bookings'] as const,
    list: (params?: BookingFilterParams) => ['bookings', 'list', params] as const,
    mine: (userId: string) => ['bookings', 'user', userId] as const,
    detail: (id: string) => ['bookings', id] as const,
    byCode: (code: string) => ['bookings', 'code', code] as const,
  },

  // ============================================
  // USER
  // ============================================
  user: {
    current: ['user', 'current'] as const,
    profile: (id: string) => ['user', id] as const,
    all: ['users'] as const,
  },

  // ============================================
  // ADMIN STATS
  // ============================================
  admin: {
    stats: ['admin', 'stats'] as const,
    recentBookings: ['admin', 'recent-bookings'] as const,
    revenue: (period: 'day' | 'week' | 'month') => ['admin', 'revenue', period] as const,
  },

  // ============================================
  // AIRPLANES
  // ============================================
  airplanes: {
    all: ['airplanes'] as const,
    detail: (id: string) => ['airplanes', id] as const,
  },
} as const

// Helper type to extract query key types
export type QueryKeys = typeof queryKeys
