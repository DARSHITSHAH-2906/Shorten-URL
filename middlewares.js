const {getuserid} = require('./service/auth')

async function allowloginuser(req , res , next){
    const id = req.cookies?.uid;

    if(!id){
        return res.redirect('/login');
    }
    const user = getuserid(id);

    if(!user){
        return res.redirect('/login');
    }

    req.user = user;
    next();
}

async function authuser(req , res , next){
    const id = req.cookies?.uid;

    const user = getuserid(id);

    req.user = user;
    next();
}

module.exports = {
    allowloginuser,
    authuser
}