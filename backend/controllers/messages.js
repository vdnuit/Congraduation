const Message = require('../models/message');
const User = require('../models/user');
const mongoose = require('mongoose');

const getMessages = async (req, res, next) => {
    try{
        await Message.find({}).exec((err, data) => {
            if(err){
                console.log(err);
                return next(err);
            }
            else{
                res.status(200).json(data);
            }
        });
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

const getMessagesByUserId = async(req, res, next) => {
    try{
        await User.findOne({_id: req.params.userId}).populate('message').exec((err, data) => {
            if(err){
                console.log(err);
                return next(err);
            }
            else{
                res.status(200).json(data.message);
            }
        });
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

const createMessage = async(req, res, next) => {
    try{
        const {senderNickName, content, topic, color} = req.body;
        const receiverId = req.params.userId;
        const senderId = req.user.user.id;
        const message = {_id: new mongoose.Types.ObjectId(), receiverId, senderId, senderNickName, content, topic, color};
        Message.create(message);
        await User.findOneAndUpdate({_id: receiverId}, {$push: {message: message._id}}).exec((err, success) => {
            if(err)
                return next(err);
            else
                res.status(201).json({msg: "Successfully created."});
        });
    }
    catch(err){
        console.error(err);
        return next(err);
    }
};

const deleteMessage = async(req, res, next) => {
    try{
        await Message.findOneAndDelete({_id: req.params.messageId});
        res.status(200).json({message: "Successfully deleted"});
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = {
    getMessages,
    getMessagesByUserId,
    createMessage,
    deleteMessage,
};