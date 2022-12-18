const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Message', messageSchema);