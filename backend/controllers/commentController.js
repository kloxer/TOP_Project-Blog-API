const db = require("../models/dbPost")


async function addComment(req,res){
    try{
        console.log(req.body)
        const {name, comment} = req.body;
        const newComment = await db.addComment(req.params.id, name, comment)
        return res.status(200).json({message:"Comment added", newComment:newComment})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:err})
    }


}


//not using atm
async function showComments(req,res){
    try{
        const {id} = req.params.id;

        const allComments = await db.getPostComments(id);
        return res.status(200).json({message:"All comments retrieved", allComments:allComments})

    }
    catch(err){
        console.log(err);
    }
}

module.exports={addComment, showComments}