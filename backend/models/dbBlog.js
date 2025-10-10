const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

import { nanoid } from 'nanoid';


async function createBlog(userId, blogTitle, blogContent){
    //Will auto issue a time created, inside my schema 

    const post = await prisma.post.create({
        data:{
            id: nanoid(),
            blogTitle: blogTitle,
            blogContent: blogContent,
            published: true,
            authorId: userId
        }
    })

    console.log(post)
    return post;

}

module.exports ={ createBlog }