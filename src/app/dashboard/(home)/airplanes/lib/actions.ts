"use server";

import type { ActionResult } from "@/app/(auth)/sign-in/lib/actions";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAirplanesById(id: string) {
  try {
    const data = await prisma.airplane.findFirst({
      where: {
        id: id,
      },
    });
    return data;
  } catch (e) {
    console.log("Database airplanes error:", e);
    return null;
  }
}

export async function saveAirplane(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const values = airplaneFormSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    image: formData.get("image"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Validation Error",
      errorDesc,
    };
  }

  const uploadedFile = await uploadFile(values.data.image);

  if (uploadedFile instanceof Error) {
    return {
      errorTitle: "Failed to upload file",
      errorDesc: ["Connection Error", "Please try again later"],
    };
  }

  try {
    const data = await prisma.airplane.create({
      data: {
        name: values.data.name,
        code: values.data.code,
        image: uploadedFile as string,
      },
    });
    console.log(data);
  } catch (e) {
    console.log(e);
    return {
      errorTitle: "Failed to save airplane",
      errorDesc: ["Database Error", "Please try again later"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  return redirect("/dashboard/airplanes");
}

export async function updateAirplane(
  _: unknown,
  formData: FormData,
  id: string
): Promise<ActionResult> {
  const image = formData.get("image") as File;

  let airplaneFormSchemaUpdate;

  if (image.size === 0) {
    airplaneFormSchemaUpdate = airplaneFormSchema.omit({ image: true });
  } else {
    airplaneFormSchemaUpdate = airplaneFormSchema;
  }

  const values = airplaneFormSchemaUpdate.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    image: formData.get("image"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Validation Error",
      errorDesc,
    };
  }

  let filename: unknown;

  if (image.size > 0) {
    const uploadedFile = await uploadFile(image);

    if (uploadedFile instanceof Error) {
      return {
        errorTitle: "Failed to upload file",
        errorDesc: ["Connection Error", "Please try again later"],
      };
    }

    filename = uploadedFile as string;
  } else {
    const airplane = await prisma.airplane.findFirst({
      where: {
        id,
      },
      select: {
        image: true,
      },
    });

    filename = airplane?.image;
  }

  try {
    await prisma.airplane.update({
      where: {
        id,
      },
      data: {
        name: values.data.name,
        code: values.data.code,
        image: filename as string,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      errorTitle: "Failed to update file",
      errorDesc: ["Connection Error", "Please try again later"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  return redirect("/dashboard/airplanes");
}

export async function deleteAirplane(id: string): Promise<ActionResult> {
  const data = await prisma.airplane.findFirst({ where: { id } });

  if (!data) {
    return {
      errorTitle: "Data not found",
      errorDesc: [],
    };
  }

  const deletedFile = await deleteFile(data?.id);

  if (deletedFile instanceof Error) {
    return {
      errorTitle: "Failed to delete file",
      errorDesc: ["Connection Error", "Please try again later"],
    };
  }

  try {
    await prisma.airplane.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);

    return {
      errorTitle: "Failed to delete file",
      errorDesc: ["Connection Error", "Please try again later"],
    };
  }

  revalidatePath('/dashboard/airplanes');
  return {
    errorTitle: null,
    errorDesc: []
  };
}
