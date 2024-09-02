import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"

/**
 * Core initialization of NextAuth: session strategy, callbacks and adapter
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Auth.js only expose a subset of the user’s information by default. See docs here https://authjs.dev/guides/extending-the-session
        session.user.id = token.sub
        session.user.profileCompleted = token.profileCompleted as boolean
        session.user.role = token.role
      }

      return session
    },
    // pass user's profileComplete property to token, then token can pass it to session
    async jwt({ user, token }) {
      if (user) {
        token.profileCompleted = user.profileCompleted
        token.role = user.role
      }
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
