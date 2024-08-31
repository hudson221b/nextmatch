import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    profileCompleted: boolean
  }

  interface Session {
    user: {
      profileCompleted: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profileCompleted: boolean
  }
}
