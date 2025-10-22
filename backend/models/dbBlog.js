const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

// const { nanoid } = require('nanoid'); //using cuid from prisma

async function createBlog(userId, blogTitle, blogContent ,publish){
    //Will auto issue a time created, inside my schema 
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
  data: {
    title: blogTitle,
    content: blogContent,
    published: publish,
    authorId: userId,
    createdAt: new Date(),
    publishedAt: publish ? new Date() : null,
  },
});


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


async function getAllUserPublicBlogsDb() {

try {
    const blogs = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      include:{
        author:{
            select:{
                username:true,
            }
        },
      }
    });
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Error fetching blogs from the database');
  }
}

async function getSingleBlog(blogId){
    const blogs = await prisma.post.findUnique({
        where:{
            id:blogId
        },
        include: {
                   author:{
            select:{
                username:true,
            }
        },
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

async function updateBlog(userId, blogId, title, content, publish){
    
    const blog = await prisma.post.update({
        where:{
            id:blogId,
            authorId: userId
        },
        data:{
            title: title,
            content: content,
            published: publish,
            publishedAt: publish ? new Date() : null,

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

module.exports ={ createBlog, getUserBlogs, getSingleBlog, updateBlog, deleteBlog, getAllUserPublicBlogsDb }