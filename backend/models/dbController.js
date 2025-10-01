const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

async function loginUser(username){

    const user = await prisma.user.findUnique({
        where:{
            username: username,
        }
    })
    return user;
}


async function createUser(username, password, email) {
  const user = await prisma.user.create({
    data: {
      username: username,
    email: email,

      password: password,
    },
  });
    return user;

}

module.exports = {createUser, loginUser}