const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortenurl:{
        type:String,
        required:true,
        unique:true
    },
    redirecturl:{
        type:String,
        required:true,
    },
    visitcount :{
        type : Number,
        default : 0
    },
    createdby :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    visithistory: [
        {
            timestamp: {
                type : String,
                default : Date.now().toLocaleString()
            },
            ipaddress :{
                type : String,
                required : true
            }
        }
    ]
    
},{timestamps : true}
);

const url = mongoose.model('url' , urlSchema);

module.exports = {
    url
}