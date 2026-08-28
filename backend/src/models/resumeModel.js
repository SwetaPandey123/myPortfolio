const mongoose = require("mongoose");

const resumeShema = new mongoose.Schema({
    resumeUrl: {
        type: String,
        default: ''
    },
    profileImageUrl: {
        type: String,
        default: 'https://res.cloudinary.com/akphv6j6/image/upload/v1787869354/61476690723.png'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('resume', resumeShema)