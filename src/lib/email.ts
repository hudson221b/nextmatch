import { VerificationEmailTemplate } from "@/components/EmailTemplate"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerficationEmail = async (name: string, email: string, token: string) => {
  const link = `http://localhost:3000/verify-email?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Welcome to NextMatch! Please verify your email",
    react: VerificationEmailTemplate({ name, link }),
  })
}
