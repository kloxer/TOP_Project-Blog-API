//THESE ARE ONLY REACHED IF YOU ARE IN THE PROTECTED ROUTE
const db = require("../models/dbBlog");

async function postBlog(req,res){

    const userId = req.user.id; // will probably have to attach user to request
    const blogTitle = req.body.title;
    const blogContent = req.body.content;
    const draft = req.body.draft;
    //Now will have to paste to database, want to ensure 
    try{
        const post = await db.createBlog(userId, blogTitle, blogContent, draft)
        return res.status(201).json({message:"post created", post:post})

    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:err.message})
    }
}

async function getAllBlogs(req,res){
    try{
        const blogs = await db.getUserBlogs(req.user.id)

        return res.status(201).json({message:"blogs found", blogs:blogs})

    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:err.message})

    }
}

async function getBlog(req,res){
    console.log(req.params)
}
module.exports={
    postBlog, getAllBlogs, getBlog
}