const mongoose  = require("mongoose");
require('dotenv').config();

async function ConnecttoDB(){
    mongoose.connect(process.env.mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true // Ensures secure connection
    }).then(() => {
        console.log('MongoDB Connected');
    }).catch(err => {
        console.error('MongoDB Connection Error:', err);
    });
}


module.exports = {
    ConnecttoDB
}