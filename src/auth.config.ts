import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/schemas/auth-schema"
import { getUserByEmail } from "./app/actions/authActions"
import bcrypt from "bcryptjs"

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      authorize: async credentials => {
        const validated = loginSchema.safeParse(credentials)

        if (validated.success) {
          const { email, password } = validated.data
          const user = await getUserByEmail(email)
          if (!user) return null
          if (!bcrypt.compareSync(password, user.passwordHash)) return null

          return user
        } else return null
      },
    }),
  ],
} satisfies NextAuthConfig
