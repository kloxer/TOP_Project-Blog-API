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

async function getAllUserPublicBlogs(req,res){

    try{
        const blogs = await db.getAllUserPublicBlogsDb()
        return res.status(201).json({message:"ALL blogs found", blogs:blogs})

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
    console.log(req.params.id)
    console.log("here")
    try{
        const id = req.params.id
        const blog = await db.getSingleBlog(id);
        console.log(blog)
        return res.status(201).json({message:"Blog sent", blog:blog})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:"Server error"})
    }
}

async function updateBlog(req,res){
    //First we wnat to make sure the blog belongs to the owner updating it
    console.log(req.user)
    console.log(req.body)
    try{
        const userId= req.user.id;
        const blogId = req.params.id;
        const title = req.body.title;
        const content = req.body.content;
        const draft = req.body.draft;
        const blog = await db.updateBlog(userId, blogId, title, content, draft)
        return res.status(201).json({message:"Sucess", blog:blog})
    }
    catch(err){
        return res.status(400).json({message:"Server err"})
    }
}

async function deleteBlog(req,res){
    try{
        const deletedBlog = await db.deleteBlog(req.user.id, req.params.id)
        return res.status(201).json({message:"blog delted", blog:deletedBlog})
    }
    catch(err){
        return res.status(400).json({message:"blog not deleted"})
    }
}
module.exports={
    postBlog, getAllBlogs, getBlog, updateBlog, deleteBlog, getAllUserPublicBlogs
}