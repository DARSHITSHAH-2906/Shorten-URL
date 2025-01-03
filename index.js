const express = require('express');
const path = require("path")
const cookieparser = require("cookie-parser")

const {ConnecttoDB} = require('./connect')

const {router , router2} = require('./routes/routes')
const {userrouter} = require('./routes/user')
const {allowloginuser  ,authuser} = require('./middlewares')

const app = express();
const PORT = 3000;
ConnecttoDB("mongodb://127.0.0.1:27017/short-url");

//Setting up engine
app.set("view engine" , "ejs")
app.set("views" , path.resolve('./views'))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())
// app.use(methodoverride('_method'))

//routes
app.use('/url' ,allowloginuser,router)
app.use('/' ,authuser, router2)
app.use('/user', userrouter);

app.listen(PORT , ()=> console.log(`Server started at ${PORT}`)
)
