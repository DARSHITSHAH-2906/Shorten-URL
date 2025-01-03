const mongoose  = require("mongoose");

async function ConnecttoDB(url){
    await mongoose.connect(url);
    console.log("MongoDB connected");
}

module.exports = {
    ConnecttoDB
}