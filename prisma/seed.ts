import { PrismaClient } from "@prisma/client"
import { membersData } from "./membersData.js"
// import { hashSync } from "bcryptjs"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function seedMembers() {
  return membersData.map(async member =>
    prisma.user.create({
      data: {
        name: member.name,
        email: member.email,
        passwordHash: bcrypt.hashSync("123456", 10),
        profileCompleted: true,
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

async function seedAdmin() {
  await prisma.user.create({
    data: {
      email: "admin@test.com",
      emailVerified: new Date(),
      profileCompleted: true,
      name: "Admin",
      passwordHash: bcrypt.hashSync("password", 10),
      role: "ADMIN",
    },
  })
}

async function main() {
  if (process.env.RUN_SEED || process.env.NODE_ENV === "development") {
    console.log("#####🚀🚀🚀 seeding members data")
    await seedMembers()
    await seedAdmin()
  } else {
    console.log("#####🚀🚀🚀 running main, doing nothing")
  }
}



main()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())