const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()



async function addComment(postId, name, content){
    console.log(postId,name,content)
    try{
        const comment = await prisma.comment.create({
            data:{
                name:name,
                content:content,
                postId:postId
            }
        })
        console.log(comment)
        return comment;
    }
    catch(err){
        return(err)
    }

}

async function getPostComments(postId){
    try{
        const allPosts = await prisma.comment.findMany({
            where:{
                postId:postId
            },
            orderBy:{
                createdAt:'asc',
            }
        })
        return allPosts
    }
    catch(err){
        return(err)
    }
}
module.exports={addComment, getPostComments}