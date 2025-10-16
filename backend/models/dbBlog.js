const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

// const { nanoid } = require('nanoid'); //using cuid from prisma

async function createBlog(userId, blogTitle, blogContent ,draft){
    //Will auto issue a time created, inside my schema 
    console.log(draft)
    const existingPost = await prisma.post.findUnique({
  where: {
    title_authorId: {
      title: blogTitle,
      authorId: userId,
    },
  },
});

    if (existingPost){
        throw new Error("A post with this title already exists");
    }

    const post = await prisma.post.create({
        data:{
            title: blogTitle,
            content: blogContent,
            published: draft,
            authorId: userId
        }
    })

    console.log(post)
    return post;

}


async function getUserBlogs(userId) {

    const blogs = await prisma.post.findMany({
        where:{
            authorId:userId
        },
        orderBy:{
            createdAt:'desc',
        }
    })
    return blogs;
    
}

module.exports ={ createBlog, getUserBlogs }