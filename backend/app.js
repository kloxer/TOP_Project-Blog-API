const express = require("express");

const app  = express();

const cors = require('cors');
app.use(cors())

// app.use(cors({
//   origin: 'http://localhost:5173', // your Vite frontend
//   credentials: true
// }));


app.get("/api",(req,res)=>{
    res.json("hissfsfsf");
});

app.listen(3000, (err)=>{
    console.log("listening")
    console.log(err);
})