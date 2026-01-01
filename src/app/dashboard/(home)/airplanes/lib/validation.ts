import z from "zod";

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/png'];

const MAX_FILE_SIZE = 2000000; // 2MB

export const airplaneFormSchema = z.object({
  name: z.string().nonempty('Airplane name is required').min(4, {message: 'Airplane name must be at least 4 characters long'}),
  code : z.string().nonempty('Airplane code is required').regex(/^[A-Z]{3}-[0-9]{3}$/, 'Format must be AAA-000'),
  image: z.any().refine((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Invalid file type. Only JPEG and PNG are allowed.').refine((file: File) => file.size <= MAX_FILE_SIZE, 'File size must be less than 2MB'),
})