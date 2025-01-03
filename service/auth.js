// const IdtouserMap = new Map()
const jwt = require('jsonwebtoken')
const secretkey = "Darshit$2906"

function setuserid(user){
    // IdtouserMap.set(id , user);
    
    //returns token
    return jwt.sign({
        id : user._id,
        email : user.email 
    } , secretkey)
}

function getuserid(token){
    if(!token){
        return null;
    }
    try{
        return jwt.verify(token , secretkey)
    }
    catch{
        return null;
    }
    // return IdtouserMap.get(id);
}

module.exports = {
    setuserid , 
    getuserid
}

