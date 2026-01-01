"use server"

import { signOut } from "@/auth"
import type { ActionResult } from "@/app/(auth)/sign-in/lib/actions"
import { redirect } from "next/navigation"

export async function logout(): Promise<ActionResult> {
  await signOut({ redirect: false })
  return redirect("/sign-in")
}