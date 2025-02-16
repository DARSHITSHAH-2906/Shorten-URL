const mongoose  = require("mongoose");
require('dotenv').config();

async function ConnecttoDB(){
    await mongoose.connect(process.env.mongo_url);
    console.log("MongoDB connected");
}

module.exports = {
    ConnecttoDB
}