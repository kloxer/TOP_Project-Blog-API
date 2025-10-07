const express = require("express");

const usersRouter = express.Router();

const { loginUserPassport , createUser, logOut, loginUser}  = require("../controllers/userController");

usersRouter.get("/:userid", (req,res)=>{
    res.json("hi");
})
usersRouter.post('/login',  loginUserPassport);

usersRouter.post("/signup", createUser);

usersRouter.post("/logout", logOut )

module.exports = usersRouter;