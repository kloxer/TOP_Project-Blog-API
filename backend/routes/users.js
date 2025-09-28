const express = require("express");

const usersRouter = express.Router();

const { loginUser , createUser}  = require("../controllers/userController");


usersRouter.get("/", loginUser);

usersRouter.post("/", createUser);


module.exports = usersRouter;