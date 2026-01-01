import { z } from 'zod'

// ============================================
// FLIGHT SEARCH VALIDATION
// ============================================

export const seatClassSchema = z.enum(['ECONOMY', 'BUSINESS', 'FIRST'])

export const flightSearchSchema = z.object({
  from: z
    .string()
    .min(3, 'Select departure city')
    .max(3, 'Invalid city code'),
  to: z
    .string()
    .min(3, 'Select destination city')
    .max(3, 'Invalid city code'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional(),
  passengers: z
    .number()
    .min(1, 'At least 1 passenger required')
    .max(9, 'Maximum 9 passengers')
    .default(1),
  class: seatClassSchema.default('ECONOMY'),
})

export type SeatClass = z.infer<typeof seatClassSchema>
export type FlightSearchInput = z.infer<typeof flightSearchSchema>

// ============================================
// FLIGHT FILTER VALIDATION
// ============================================

export const flightFilterSchema = z.object({
  class: z.array(seatClassSchema).optional(),
  stops: z.array(z.number().min(0).max(2)).optional(),
  airlines: z.array(z.string()).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().optional(),
  sortBy: z.enum(['price', 'duration', 'departure', 'arrival']).default('price'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
})

export type FlightFilterInput = z.infer<typeof flightFilterSchema>

// ============================================
// ADMIN FLIGHT MANAGEMENT
// ============================================

export const createFlightSchema = z.object({
  planeId: z.string().min(1, 'Airplane is required'),
  departureCity: z.string().min(2, 'Departure city is required'),
  departureCityCode: z.string().length(3, 'City code must be 3 characters'),
  destinationCity: z.string().min(2, 'Destination city is required'),
  destinationCityCode: z.string().length(3, 'City code must be 3 characters'),
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  price: z.number().min(0, 'Price must be positive'),
})

export type CreateFlightInput = z.infer<typeof createFlightSchema>
