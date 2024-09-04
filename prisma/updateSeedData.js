const { PrismaClient } = require("@prisma/client")
const { membersData } = require("./membersData")
const prisma = new PrismaClient()

async function verifyEmail() {
  const updatedUsers = await prisma.user.updateMany({
    data: {
      emailVerified: new Date(),
    },
  })

  console.log(`Updated ${updatedUsers.count} users.`)
}

async function updateUserImage() {
  for (const member of membersData) {
    await prisma.user.updateMany({
      where: { name: member.name },
      data: {
        image: member.image,
      },
    })
  }
}

updateUserImage()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
