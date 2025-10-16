require('dotenv').config({ path: '../.env' });

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debug
const { PrismaClient } = require('../generated/prisma')


const prisma = new PrismaClient()
const { nanoid } = require('nanoid');



async function main() {
  // const post = await prisma.post.create({
  // data:{
  //           title: "I am small",
  //           content: "I am the small",
  //           published: true,
  //           authorId: 30
  //       }
  // })
  try{
  await prisma.post.deleteMany({});

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