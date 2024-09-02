import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/zod-schemas/auth-schema"
import { getUserByEmail } from "./app/actions/authActions"
import bcrypt from "bcryptjs"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
// import Google from "next-auth/providers/google"
/**
 * More specific configs related to custom authentication logic and error handling
 */
export default {
  providers: [
    Github,
    Google,
    Credentials({
      authorize: async credentials => {
        const validated = loginSchema.safeParse(credentials)

        if (validated.success) {
          const { email, password } = validated.data
          const user = await getUserByEmail(email)
          if (!user) {
            console.log("No user found!")
            return null
          }
          if (
            !user.passwordHash ||
            !bcrypt.compareSync(password, user.passwordHash)
          ) {
            console.log("Password not match")
            return null
          }
          return user
        } else {
          console.log("Server side validation failed!")
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
