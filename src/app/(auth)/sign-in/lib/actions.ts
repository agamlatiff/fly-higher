"use server"

import { signIn } from "@/auth"
import { userSchema } from "../../sign-up/lib/validation"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import prisma from "../../../../../lib/prisma"

export interface ActionResult {
  errorTitle: string | null
  errorDesc: string[] | null
}

export async function SignInUser(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const signInSchema = userSchema.pick({
    email: true,
    password: true
  })

  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message)
    return { errorTitle: "Error Validation", errorDesc }
  }

  // Check user role for redirect
  const user = await prisma.user.findUnique({
    where: { email: validate.data.email },
    select: { role: true }
  })

  try {
    await signIn("credentials", {
      email: validate.data.email,
      password: validate.data.password,
      redirect: false
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { errorTitle: "Error", errorDesc: ["Invalid credentials"] }
        default:
          return { errorTitle: "Error", errorDesc: ["Something went wrong"] }
      }
    }
    throw error
  }

  // Role-based redirect
  if (user?.role === "ADMIN") {
    redirect("/dashboard")
  }
  redirect("/")
}
