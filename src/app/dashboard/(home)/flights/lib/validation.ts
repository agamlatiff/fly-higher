import z from "zod";

export const formFLightSchema = z.object({
  planeId: z.string().nonempty("The plane cannot be empty"),
  price: z.string().nonempty("Ticket price cannot be empty"),
  departureCity: z.string().nonempty("Departure city cannot be empty"),
  departureDate: z.date(),
  departureCityCode: z
    .string()
    .nonempty("Departure city code cannot be empty")
    .min(3, {
      message: "Departure code city must be at least 3 min characters",
    })
    .max(3, {
      message: "Departure code city must be at least maks 3 characters",
    }),
  destinationCity: z.string().nonempty("Destination city cannot be empty"),
  arrivalDate: z.date(),
  destinationCityCode: z
    .string()
    .nonempty("Destination city code cannot be empty")
    .min(3, {
      message: "Destination code city must be at least 3 min characters",
    })
    .max(3, {
      message: "Destination code city must be at least maks 3 characters",
    }),
});
