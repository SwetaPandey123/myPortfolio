const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required "]
    },
    email: {
        type: String,
        required: [true, "email is required "]
    },
    message: {
        type: String,
        required: [true, "Message is required "]
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const MessageModel = mongoose.model('message', MessageSchema)

module.exports = MessageModel