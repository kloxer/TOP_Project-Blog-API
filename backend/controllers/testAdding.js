const { PrismaClient } = require('../generated/prisma')


const prisma = new PrismaClient()
const { nanoid } = require('nanoid');

async function main() {
  const post = await prisma.post.create({
  data:{
            id: nanoid(),
            blogTitle: "I am large",
            blogContent: "I am the very veyr large bad bad guy very bnig very bad",
            published: true,
            authorId: 30
        }
  })
  console.log(post)
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