"use server";

import type { ActionResult } from "@/app/(auth)/sign-in/lib/actions";
import { redirect } from "next/navigation";
import { formFLightSchema } from "./validation";

import { generateSeatPerClass } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../../lib/prisma";

export async function saveFlight(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const departureDate = new Date(formData.get("departureDate") as string);
  const arrivalDate = new Date(formData.get("arrivalDate") as string);

  const validate = formFLightSchema.safeParse({
    planeId: formData.get("planeId"),
    price: formData.get("price"),
    departureCity: formData.get("departureCity"),
    departureDate: departureDate,
    departureCityCode: formData.get("departureCityCode"),
    destinationCity: formData.get("destinationCity"),
    arrivalDate: arrivalDate,
    destinationCityCode: formData.get("destinationCityCode"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const data = await prisma.flight.create({
    data: {
      ...validate.data,
      price: Number.parseInt(validate.data.price),
    },
  });

  const seats = generateSeatPerClass(data.id);

  await prisma.flightSeat.createMany({
    data: seats,
  });

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function updateFlight(
  _: unknown,
  formData: FormData,
  id: string | null
): Promise<ActionResult> {

  if (!id) {
    return {
      errorTitle: 'Parma ID Missing',
      errorDesc: []
    }
  }

  const departureDate = new Date(formData.get("departureDate") as string);
  const arrivalDate = new Date(formData.get("arrivalDate") as string);

  const validate = formFLightSchema.safeParse({
    planeId: formData.get("planeId"),
    price: formData.get("price"),
    departureCity: formData.get("departureCity"),
    departureDate: departureDate,
    departureCityCode: formData.get("departureCityCode"),
    destinationCity: formData.get("destinationCity"),
    arrivalDate: arrivalDate,
    destinationCityCode: formData.get("destinationCityCode"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  if (!id) {
    return {
      errorTitle: "Update Error",
      errorDesc: ["Flight ID is missing."],
    };
  }


  await prisma.flight.update({
    where: {
      id: id,
    },
    data: {
      ...validate.data,
      price: Number.parseInt(validate.data.price),
    },
  });

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function deleteFlight(id: string) {
  try {
    await prisma.flightSeat.deleteMany({
      where: {
        flightId: id,
      },
    });

    await prisma.flight.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/flights");
}
