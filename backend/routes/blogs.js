const express = require("express")

const blogsRouter = express.Router();

const passport = require("passport");
const blogsController = require("../controllers/blogsController")


const commentController = require("../controllers/commentController")
require("../config/passport"); // Just require it to run its setup

blogsRouter.get("/", passport.authenticate('jwt', { session: false }), blogsController.getAllBlogs)


blogsRouter.post("/", passport.authenticate('jwt', { session: false }), blogsController.postBlog);

blogsRouter.get("/:id", passport.authenticate('jwt', { session: false }), blogsController.getBlog);


blogsRouter.put("/:id", passport.authenticate('jwt', { session: false }), blogsController.updateBlog);

blogsRouter.delete("/:id", passport.authenticate('jwt', { session: false }), blogsController.deleteBlog);


//Adding Comment

// blogsRouter.get("/:id/comments", commentController.showComments)

blogsRouter.post("/:id/comments", commentController.addComment)



module.exports = blogsRouter