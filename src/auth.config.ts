import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/schemas/auth-schema"
import { getUserByEmail } from "./app/actions/authActions"
import bcrypt from "bcryptjs"

/**
 * More specific configs related to custom authentication logic and error handling
 */
export default {
  providers: [
    Credentials({
      authorize: async credentials => {
        const validated = loginSchema.safeParse(credentials)

        if (validated.success) {
          const { email, password } = validated.data
          const user = await getUserByEmail(email)
          if (!user) {
            console.error("No user found!")
            return null
          }
          if (!bcrypt.compareSync(password, user.passwordHash)) {
            console.error("Password not match")
            return null
          }
          return user
        } else {
          console.error("Server side validation failed!")
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
