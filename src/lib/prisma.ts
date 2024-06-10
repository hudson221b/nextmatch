import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] })

// makes sure in development mode, the hot module reloading does not create multiple prisma client
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma