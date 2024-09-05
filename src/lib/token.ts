import { TokenType, type Token } from "@prisma/client"
import { prisma } from "./prisma"

/**
 * Creates a token record in the database
 */
export const generateToken = async (
  email: string,
  type: TokenType
): Promise<Token> => {
  try {
    const existingToken = await getTokenByEmail(email)
    if (existingToken) {
      await prisma.token.delete({
        where: {
          id: existingToken.id,
        },
      })
    }

    const arrayBuffer = new Uint8Array(48)
    crypto.getRandomValues(arrayBuffer)
    const token = Array.from(arrayBuffer, byte => byte.toString(16).padStart(2, '0')).join("")
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
