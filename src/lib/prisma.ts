import { PrismaClient } from "@prisma/client"

// this var is made purely to silence ts check
const globalForPrisma = global as unknown as { prisma: PrismaClient }

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient()
}

export const prisma = globalForPrisma.prisma