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
    messages:
        [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
    
});

module.exports = mongoose.model('User', userSchema);