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

async function getSingleBlog(blogId){
    const blogs = await prisma.post.findUnique({
        where:{
            id:blogId
        },
        include: {
            comment: {
                select:{
                    name:true,
                    content:true,
                },
                orderBy:{
                    createdAt:'desc'
                }
            }
        }   
    })
    return blogs;
}

async function updateBlog(userId, blogId, title, content, draft){
    
    const blog = await prisma.post.update({
        where:{
            id:blogId,
            authorId: userId
        },
        data:{
            title: title,
            content: content,
            published: draft,
        }
    })
    console.log(blog)
    return blog
}

async function deleteBlog(userId, blogId){
    const deletedBlog = await prisma.post.delete({
        where:{
            id:blogId,
            authorId:userId
        }
    })
    return deletedBlog;
}

module.exports ={ createBlog, getUserBlogs, getSingleBlog, updateBlog, deleteBlog }