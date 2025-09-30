const db = require("../models/dbController")
const bcrypt = require('bcryptjs')

async function loginUser (req,res)  {
    try{
        const user = await db.loginUser(req.body.username, req.body.password)
        if (!user){
            return res.status(404).json({error: "User not found!"})
        }
        const isValidPwd=  await bcrypt.compare(req.body.password, user.password);
        if (!isValidPwd){
            return res.status(401).json({error: "Incorrect password!"})
        }
        return res.status(201).json({message: "Logged in!"})
    }
    catch(err){
        res.status(400).json({error:err});
    }
    res.status(500).json({ error: 'Internal server error' });

}

async function createUser(req,res){
    const { username,password, email } = req.body
    try{
        const hashedPwd = await bcrypt.hash(password,10)
        const user = await db.createUser(username,hashedPwd,email);
        return res.status(201).json({message:"Created User", user})
    }
    catch(err){
        console.log(err)
        if ( err.code === 'P2002') {
            const field = err.meta.target[0];
            return res.status(400).json({ error: `That ${field} is already in use.` });    
        }   
    }
    return res.status(500).json({ error: 'Internal server error' });
}
module.exports = { loginUser, createUser }