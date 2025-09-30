const express = require("express");

const usersRouter = express.Router();

const { loginUser , createUser}  = require("../controllers/userController");


usersRouter.post("/login", loginUser);

usersRouter.post("/signup", createUser);


module.exports = usersRouter;