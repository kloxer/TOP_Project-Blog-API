const express = require("express");

const app  = express();



const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;


const cors = require('cors');
const usersRouter = require("./routes/users");
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); // forgot to use this to send json adnr ecieve it

// app.use(cors({
//   origin: 'http://localhost:5173', // your Vite frontend
//   credentials: true
// }));


app.get("/api",(req,res)=>{
    res.json("hissfsfsf");
});

app.use("/users", usersRouter);

app.listen(3003, (err)=>{
    console.log("listening")
    console.log(err);
})