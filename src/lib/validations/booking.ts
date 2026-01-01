import { z } from 'zod'

// ============================================
// PASSENGER VALIDATION
// ============================================

export const passengerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Invalid email address'),
  passport: z
    .string()
    .regex(/^[A-Z0-9]{6,9}$/, 'Invalid passport number (6-9 alphanumeric characters)')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
})

export type PassengerInput = z.infer<typeof passengerSchema>

// ============================================
// PAYMENT VALIDATION
// ============================================

export const paymentMethodSchema = z.enum(['card', 'ewallet', 'qris'])

export const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^[0-9]{13,19}$/, 'Invalid card number'),
  cardName: z
    .string()
    .min(2, 'Cardholder name is required'),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Invalid expiry date (MM/YY)'),
  cvc: z
    .string()
    .regex(/^[0-9]{3,4}$/, 'Invalid CVC'),
})

export const paymentSchema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('card'),
    card: creditCardSchema,
  }),
  z.object({
    method: z.literal('ewallet'),
  }),
  z.object({
    method: z.literal('qris'),
  }),
])

export type PaymentMethod = z.infer<typeof paymentMethodSchema>
export type CreditCardInput = z.infer<typeof creditCardSchema>
export type PaymentInput = z.infer<typeof paymentSchema>

// ============================================
// BOOKING VALIDATION
// ============================================

export const createBookingSchema = z.object({
  flightId: z.string().min(1, 'Flight is required'),
  seatId: z.string().min(1, 'Seat selection is required'),
  passenger: passengerSchema,
})

export type CreateBookingInput = z.infer<typeof createBookingSchema>
