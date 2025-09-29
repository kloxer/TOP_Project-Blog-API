const db = require("../models/dbController")


const loginUser = (req,res) => {

    console.log(req.body);
    res.redirect("/");
}

function createUser(req,res){

    console.log(req.body);
    res.redirect("/");

}
module.exports = { loginUser, createUser }