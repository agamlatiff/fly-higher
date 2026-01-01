import type { RoleUser } from "@prisma/client"
import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: RoleUser
    passport: string | null
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: RoleUser
      passport: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: RoleUser
    passport: string | null
  }
}
