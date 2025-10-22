require('dotenv').config({ path: '../.env' });

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debug
const { PrismaClient } = require('../generated/prisma')


const prisma = new PrismaClient()


async function main() {

  try{
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.comment.deleteMany({});
  }
  catch (err){
    console.log(err);
  }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

