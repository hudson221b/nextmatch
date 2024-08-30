import { TokenType } from "@prisma/client"
import { randomBytes } from "crypto"
import { prisma } from "./prisma"

/**
 * Creates a token record in the database
 */
export const generateToken = async (email: string, type: TokenType) => {
  try {
    const existingToken = await getTokenByEmail(email)
    if (existingToken) {
      await prisma.token.delete({
        where: {
          id: existingToken.id,
        },
      })
    }
    const token = randomBytes(48).toString("hex")
    // expires in 24 hours
    const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24)
    return prisma.token.create({
      data: {
        email,
        expires: expiryDate,
        token,
        type,
      },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getTokenByEmail = (email: string) => {
  try {
    return prisma.token.findFirst({
      where: {
        email,
      },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
