/**
 * Validation Schemas
 * 
 * Central export for all Zod validation schemas used across the application.
 * 
 * @example
 * import { passengerSchema, flightSearchSchema } from '@/lib/validations'
 */

// Booking & Payment
export {
  passengerSchema,
  paymentMethodSchema,
  creditCardSchema,
  paymentSchema,
  createBookingSchema,
  type PassengerInput,
  type PaymentMethod,
  type CreditCardInput,
  type PaymentInput,
  type CreateBookingInput,
} from './booking'

// Flight Search & Management
export {
  seatClassSchema,
  flightSearchSchema,
  flightFilterSchema,
  createFlightSchema,
  type SeatClass,
  type FlightSearchInput,
  type FlightFilterInput,
  type CreateFlightInput,
} from './flight'
