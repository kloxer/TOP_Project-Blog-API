//THESE ARE ONLY REACHED IF YOU ARE IN THE PROTECTED ROUTE
const db = require("../models/dbBlog");


async function postBlog(req,res){
    const userId = req.user.userId; // will probably have to attach user to request
    const blogTitle = req.body.blogTitle;
    const blogContent = req.body.blogContent;

    //Now will have to paste to database, want to ensure 
    try{

        const post = await db.createBlog(userId, blogTitle, blogContent)
        return res.status(201).json({message:"post created", post:post})

    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"failed", error:err})
    }
}

module.exports={
    postBlog
}