import { auth } from "@/auth"
import type { RoleUser } from "@prisma/client"

export interface User {
  id: string
  name: string
  email: string
  role: RoleUser
  passport: string | null
}

export interface Session {
  user: User
  expires: string
}

export const getUser = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  const session = await auth()

  if (!session?.user) {
    return { user: null, session: null }
  }

  return {
    user: {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      role: session.user.role!,
      passport: session.user.passport ?? null
    },
    session: {
      user: {
        id: session.user.id!,
        name: session.user.name!,
        email: session.user.email!,
        role: session.user.role!,
        passport: session.user.passport ?? null
      },
      expires: session.expires
    }
  }
}
