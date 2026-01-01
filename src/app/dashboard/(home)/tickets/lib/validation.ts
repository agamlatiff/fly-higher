import { z } from "zod";

/**
 * Validation schema for updating ticket status
 */
export const ticketStatusSchema = z.object({
  status: z.enum(["PENDING", "SUCCESS", "FAILED"]),
});

/**
 * Validation schema for ticket search/filter
 */
export const ticketFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["all", "PENDING", "SUCCESS", "FAILED"]).optional(),
  flightId: z.string().optional(),
  date: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
});

export type TicketStatusInput = z.infer<typeof ticketStatusSchema>;
export type TicketFilterInput = z.infer<typeof ticketFilterSchema>;
