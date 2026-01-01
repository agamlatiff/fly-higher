import z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .nonempty("Name cannot be empty")
    .min(4, { message: "name must be at least 4 characters" }),
  email: z
    .string()
    .nonempty("Email cannot be empty")
    .email({ message: "Email is not valid" }),
    password: z.string().nonempty({message : 'Password cannot be empty'}).min(4, {message: 'Password must be at least 4 characters'}),
    passport: z.string()
});
