const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

async function findUser(username){

    const user = await prisma.user.findUnique({
        where:{
            username: username,
        }
    })
    return user;
}

async function findUserById(id){
  console.log(id);
    const user = await prisma.user.findUnique({
        where:{
            id: id,
        }
    })
    console.log(user)
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

module.exports = {createUser, findUser, findUserById}