const db = require("../models/dbController")
const bcrypt = require('bcryptjs')

const passport = require("passport"); // Adjust path as needed

const jwt = require('jsonwebtoken'); //jwt import

async function loginUser (req,res)  {
  console.log("trying...")
    try{
      console.log(req.body)
        const user = await db.findUser(req.body.username)
        console.log(user);
        if (!user){
            return res.status(404).json({error: "User not found!"})
        }
        const isValidPwd=  await bcrypt.compare(req.body.password, user.password);
        if (!isValidPwd){
            return res.status(401).json({error: "Incorrect password!"})
        }

        //Jwt sign token
        jwt.sign({user:user}, 'cats', (err, token) =>{
          console.log(token);
          return res.status(201).json({message: "Logged in!", token:token})
        });

          // return res.status(201).json({message: "Logged in!"})

    }
    catch(err){
        return res.status(400).json({error:err});
    }
}

async function loginUserPassport(req,res,next){
passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    // Authentication failed: no user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || 'Authentication failed'
      });
    }

    // Establish a session
    req.logIn(user, (err) => {
      if (err) return next(err);

      // Successful login - send user data as JSON
      return res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  })(req, res, next);

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

 function logOut(req,res,next){
    req.logout((err) => {
        if (err) {
        return next(err);
        }
        res.status(201).json({message:"Logged Out!"});
    });
}

module.exports = { loginUser, loginUserPassport, createUser, logOut }