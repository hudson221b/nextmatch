import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    profileCompleted: boolean
    role: Role
  }

  interface Session {
    user: {
      profileCompleted: boolean
      role: Role
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profileCompleted: boolean
    role: Role
  }
}
