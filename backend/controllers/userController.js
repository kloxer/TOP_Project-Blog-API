const db = require("../models/dbController")
const bcrypt = require('bcryptjs')

const loginUser = (req,res) => {

    console.log(req.body);
    res.redirect("/");
}

async function createUser(req,res){
    const { name, email, password } = req.body
    try{
        const hashedPwd = await bcrypt.hash(password,10)
        const user = await db.createUser(name,hashedPwd,email);
        res.status(201).json({message:"created User", user})

    }
    catch(err){
        res.status(400).json({message:"creating user failed", details:err.message});
    }


}
module.exports = { loginUser, createUser }