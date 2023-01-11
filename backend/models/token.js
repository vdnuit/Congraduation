const mongoose = require('mongoose');
const moment = require('moment-timezone');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        index: true
    }
});

// tokenSchema.index({createdAt: 1}, {expireAfterSeconds: 300});

module.exports = mongoose.model('tokens', tokenSchema);