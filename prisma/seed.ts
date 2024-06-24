import { PrismaClient } from "@prisma/client"
import { membersData } from "./membersData"
import { hashSync } from "bcryptjs"

const prisma = new PrismaClient()

async function seedMembers() {
  return membersData.map(async member =>
    prisma.user.create({
      data: {
        name: member.name,
        email: member.email,
        passwordHash: hashSync("123456", 10),
        member: {
          create: {
            name: member.name,
            gender: member.gender,
            dateOfBirth: new Date(member.dateOfBirth),
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            country: member.country,
            image: member.image,
            photos: {
              create: {
                url: member.image,
              },
            },
          },
        },
      },
    })
  )
}

async function main() {
  await seedMembers()
}

// main()
updateUserImage()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())


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