const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId: {
        type: String, 
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: String,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Message', messageSchema);