const express = require("express");
const { SignupUser, LoginUser , LogoutUser } = require("../controllers/user");

const router = express.Router();

router.post('/' , SignupUser)
router.post('/login' , LoginUser)
router.post('/logout' , LogoutUser)

module.exports ={
    userrouter : router
}