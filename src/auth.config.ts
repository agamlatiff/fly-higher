import type { NextAuthConfig } from "next-auth"
import type { RoleUser } from "@prisma/client"

export const authConfig = {
  pages: {
    signIn: "/sign-in"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role as RoleUser
        token.passport = user.passport
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as RoleUser
        session.user.passport = token.passport as string | null
      }
      return session
    }
  },
  providers: []
} satisfies NextAuthConfig
