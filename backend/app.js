const express = require("express");

const app  = express();



const session = require("express-session");
const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;


const cors = require('cors');
const usersRouter = require("./routes/users");
const { ExtractJwt } = require("passport-jwt");

app.use(cors({
  origin: "http://localhost:5173", // your React frontend
  credentials: true                // 🔑 allow cookies
}));

// app.use(cors())
app.use(express.urlencoded({ extended: true })) //POST data sent in req body
app.use(express.json()); // forgot to use this to send json adnr ecieve it


// OLD session related stuff 
// app.use(session({ 
//     secret: "cats", 
//     resave: false, 
//     saveUninitialized: true,
// cookie:{
//     maxAge: 1000 * 60 * 60 * 24
// } }));

// app.use(passport.session());
require("./config/passport"); // Just require it to run its setup


//Test api endpoint

// app.use((req, res, next) => {
// console.log("cookie data: ", req.headers.cookie)
//    console.log(`Total sessions: ${Object.keys(req.session).length}`);
//   console.log("Session data:", req.session);
//   console.log(req.user)
//   next();
// });

app.post("/",(req,res)=>{
  console.log(req.body)
  res.json("hi")
  
})

app.get("/api",(req,res)=>{ 
  console.log("api reqs")
    res.json("hissfsfsf");
});

app.get('/api/me3', passport.authenticate('jwt', { session: false }), (req,res)=>{
      console.log(req.user)
      console.log("sending...")
        // res.send(req.user.profile);
          res.status(200).json({message:"is authenticated", user:req.user})
}
);


//Using plain JWT to authenticate
const jwt = require('jsonwebtoken'); //jwt import

function  authenticateToken(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null){
    return res.sendStatus(401)
  }
  jwt.verify(token, 'cats', (err, user)=>{
    if (err){
      return res.sendStatus(403)
    }
    req.user=  user
    next()
  })
}
app.get("/api/me2", authenticateToken, (req,res)=>{ //using JWT middleware 
  res.json({message:"logged in", user:req.user})
})


// app.get("/api/me",(req,res)=>{ 
//   console.log("api/me requested")
//   if (req.isAuthenticated()){
//     console.log("authenticated")
//     res.json({message:"is authenticated", loggedIn:true})
//   }
//   else{
//     console.log("not authenticated")
//     res.json({message:"not logged in", loggedIn:false})
//   }

// });


app.use("/users", usersRouter);

app.listen(3003, (err)=>{
    console.log("listening one")
    console.log(err);
})