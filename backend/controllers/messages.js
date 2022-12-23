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
    const messages = await User.findOne({_id: req.params.userId}).populate('message').exec((err, data) => {
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
        console.log(req.user);
        const {senderNickName, content, topic, color} = req.body;
        const receiverId = req.params.userId;
        console.log(receiverId);
        const senderId = req.user.user.id;
        const message = {_id: new mongoose.Types.ObjectId(), receiverId, senderId, senderNickName, content, topic, color};
        console.log(message);
        Message.create(message);
        await User.findOneAndUpdate({_id: receiverId}, {$push: {message: message._id}}).exec((err, success) => {
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

const deleteMessage = async(req, res) => {
    try{
        await Message.findOneAndDelete({_id: req.params.messageId});
        res.status(200).json({message: "Successfully deleted"});
    }
    catch(err){
        console.log(err);
        res.json({error: err});
    }
}

module.exports = {
    getMessages,
    getMessagesByUserId,
    createMessage,
    deleteMessage,
};