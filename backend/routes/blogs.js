const express = require("express")

const blogsRouter = express.Router();

const passport = require("passport");
const blogsController = require("../controllers/blogsController")

require("../config/passport"); // Just require it to run its setup

blogsRouter.get("/", passport.authenticate('jwt', { session: false }), blogsController.getAllBlogs)

blogsRouter.post("/", passport.authenticate('jwt', { session: false }), blogsController.postBlog);

blogsRouter.get("/:id", passport.authenticate('jwt', { session: false }), blogsController.getBlog);

module.exports = blogsRouter