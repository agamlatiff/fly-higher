"use server"

import { signOut } from "@/auth"
import { objectToParams } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function logout(): Promise<{ error: string } | null> {
  await signOut({ redirect: false })
  revalidatePath("/")
  return redirect("/")
}

export async function searchFlight(formData: FormData) {
  const searchData = {
    departure: formData.get("departure"),
    arrival: formData.get("arrival"),
    date: formData.get("date")
  }

  const queryParams = objectToParams(searchData)

  return redirect(`/available-flights?${queryParams}`)
}
