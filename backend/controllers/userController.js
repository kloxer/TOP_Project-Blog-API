


function loginUser(req,res) {

    console.log(req.body);
    res.redirect("/");
}

function createUser(req,res){

    console.log(req.body);
}
module.exports = { loginUser, createUser }