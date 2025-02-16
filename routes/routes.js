const express = require('express')
const {GenerateShortId , RedirecttoURL,DeleteURL , GetAnalytics} = require('../controllers/controllers')
const {url} = require('../models/models')

const router = express.Router();
const router2 = express.Router();

router.post('/' , GenerateShortId)

router.route('/:id')
.get(RedirecttoURL)
.post(DeleteURL)

router.get('/analytics/:id' ,GetAnalytics )

router2.get('/' , async (req ,res)=>{
    if(!req.user){
        // console.log(`hi`);
        return res.render("home" , {
            id : ""
        });
    }
    const allurls = await url.find({createdby : req.user._id}); 
    return res.render("home" ,{
        urls : allurls,
        id:req.user._id
    });
    
})

router2.get('/signup' , (req , res)=>{
    res.render("signup")
})
router2.get('/login' , (req , res)=>{
    res.render("login")
})

module.exports = {
    router,
    router2
}
