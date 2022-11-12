const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id:{
        type: String,
        required: [true, "You must type in your user id"],
    },
    pw:{
        type: String,
        required: [true, "You must type in your password"],
    },
    nickname:{
        type: String,
        required: [true, "You must type in your nickname"]
    }
});

module.exports = mongoose.model('User', userSchema);