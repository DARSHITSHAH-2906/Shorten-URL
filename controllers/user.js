const {v4 : uuid} = require("uuid")
const {user} = require('../models/user')
const {setuserid , getuserid} = require('../service/auth')

async function SignupUser(req , res){
    const {name , email , password} = req.body;

    await user.create({
        name : name,
        email : email,
        password :password
    })

    
    return res.redirect("/");
}

async function LoginUser(req , res){
    const { email , password} = req.body;
    const loginuser = await user.findOne({email , password})
    
    if(!loginuser){
        return res.redirect("/login")
    }
    
    // const sessionId = uuid();
    // setuserid(sessionId , loginuser);
    const token = setuserid(loginuser);

    res.cookie("uid" , token)

    return res.render("home");
}

module.exports = {
    SignupUser,
    LoginUser
}