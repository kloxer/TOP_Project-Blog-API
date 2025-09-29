const { PrismaClient } = require('./generated/prisma')

const prisma = new PrismaClient()

async function createUser(name, password, email) {
  await prisma.user.create({
    data: {
      name: name,
      password: password,
      email: email,
    },
  })


}

module.exports = {createUser}