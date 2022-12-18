const Message = require('../models/message');
const User = require('../models/user');
const mongoose = require('mongoose');

const getMessages = async (req, res) => {
    const messages = await Message.find({});
    res.send(messages);
};

const getMessage = async(req, res) => {
    const message = await Message.find({});
    res.send(message);
};

const createMessage = async(req, res) => {
    try{
        console.log(req.body);
        const {senderId, content, topic, color} = req.body;
        const message = {_id: new mongoose.Types.ObjectId(), senderId, content, topic, color};
        Message.create(message);
        console.log("here we are");
        console.log(message._id);
        User.findOneAndUpdate({_id: senderId}, {$push: {message: message._id}}, (err, success) => {
            if(err)
            console.log(err);
            else
            console.log(success);
            console.log("wowoow");
        });
        res.json({msg: "Successfully created."});
    }
    catch(err){
        console.error(err);
        res.json(err);
    }
};

module.exports = {
    getMessages,
    createMessage
};