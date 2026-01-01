import { z } from "zod";

/**
 * Validation schema for creating a new user
 */
export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  role: z.enum(["CUSTOMER", "ADMIN"]).optional().default("CUSTOMER"),
});

/**
 * Validation schema for updating user details
 */
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .optional(),
  passport: z
    .string()
    .regex(/^[A-Z][0-9]{7,8}$/, "Invalid passport format (e.g., A12345678)")
    .optional()
    .nullable(),
});

/**
 * Validation schema for updating user role
 */
export const updateRoleSchema = z.object({
  role: z.enum(["CUSTOMER", "ADMIN"]),
});

/**
 * Validation schema for user search/filter
 */
export const userFilterSchema = z.object({
  search: z.string().optional(),
  role: z.enum(["all", "CUSTOMER", "ADMIN"]).optional(),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type UserFilterInput = z.infer<typeof userFilterSchema>;
