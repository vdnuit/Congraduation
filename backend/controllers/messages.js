const Message = require('../models/message');
const User = require('../models/user');
const mongoose = require('mongoose');

const getMessages = async (req, res) => {
    const messages = await Message.find({}).exec((err, data) => {
        if(err){
            console.log(err);
            res.json({error: err});
        }
        else{
            res.send(data);
        }
    });
};

const getMessagesByUserId = async(req, res) => {
    const messages = await User.findOne({_id: req.params.id}).populate('message').exec((err, data) => {
        if(err){
            console.log(err);
            res.json({error: err});
        }
        else{
            res.send(data.message);
        }
    });
};

const createMessage = async(req, res) => {
    try{
        console.log(req.userObjectId);
        const {senderNickName, content, topic, color} = req.body;
        const senderId = req.userObjectId;
        const message = {_id: new mongoose.Types.ObjectId(), senderId, senderNickName, content, topic, color};
        console.log(message);
        Message.create(message);
        await User.findOneAndUpdate({_id: senderId}, {$push: {message: message._id}}).exec((err, success) => {
            if(err)
                res.json({error: err});
            else
                res.json({msg: "Successfully created."});
        });
    }
    catch(err){
        console.error(err);
        res.json(err);
    }
};

module.exports = {
    getMessages,
    getMessagesByUserId,
    createMessage
};