const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "You must type in your user id"],
        unique: true
    },
    password: {
        type: String,
    },
    nick: {
        type: String,
        required: [true, "You must type in your nickname"],
    },
    provider:{
        type: String,
    },
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);