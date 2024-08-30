import { EmailTemplate } from "@/components/EmailTemplate"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerficationEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const link = `http://localhost:3000/verify-email?token=${token}`
  const title = "Email Verification"
  const body =
    "Thank you for signing up! Please verify your email address by clicking the link below:"
  const linkText = "Verify Email Address"

  await resend.emails.send({
    from: "testing@resend.dev",
    to: email,
    subject: "Welcome to NextMatch! Please verify your email",
    react: EmailTemplate({ name, link, title, body, linkText }),
  })
}

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const link = `http://localhost:3000/forgot-password?token=${token}`
  const title = "Rest Password"
  const body =
    "You have requested to reset your password. Follow the link below:"
  const linkText = "Reset password"

  await resend.emails.send({
    from: "testing@resend.dev",
    to: email,
    subject: "Reset your password",
    react: EmailTemplate({ name, link, title, body, linkText }),
  })
}
