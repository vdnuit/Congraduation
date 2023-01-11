const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // senderId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    senderNickName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    paperImage: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Message', messageSchema);