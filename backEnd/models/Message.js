const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("message", MessageSchema)