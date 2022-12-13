const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    snsId:{
        type: String,
        required: [true, "You must type in your user id"],
    },
    nick:{
        type: String,
        required: [true, "You must type in your nickname"]
    },
    provider:{
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);