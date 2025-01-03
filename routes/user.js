const express = require("express");
const { SignupUser, LoginUser } = require("../controllers/user");

const router = express.Router();

router.post('/' , SignupUser)
router.post('/login' , LoginUser)

module.exports ={
    userrouter : router
}