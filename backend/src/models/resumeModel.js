const  mongoose  = require("mongoose");

const resumeShema = new mongoose.Schema({
    resumeURL : {
        type : String,
        required : true
    }
},{
    
        timestamps : true
    
})

module.exports = mongoose.model('resume', resumeShema)