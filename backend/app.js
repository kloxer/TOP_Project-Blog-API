const express = require("express");

const app  = express();

const cors = require('cors');
app.use(cors())
app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173', // your Vite frontend
//   credentials: true
// }));

const usersRouter = require("./routes/users")

app.use(express.urlencoded({ extended: true }));



app.use("/users", usersRouter);


app.listen(3000, (err)=>{
    console.log("listening")
    console.log(err);
})