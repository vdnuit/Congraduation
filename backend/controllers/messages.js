const Message = require('../models/message');
const User = require('../models/user');
const { Types } = require('mongoose');

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
        if(Types.ObjectId.isValid(req.params.userId)){
            await User.findOne({_id: req.params.userId}).lean().populate('message', '_id paperImage visit').exec((err, data) => {
                if(err){
                    console.log(err);
                    return next(err);
                }
                else if(data === null){
                    return res.status(400).json({message: "The user does not exist"});
                }
                else{
                    return res.status(200).json(data.message);
                }
            });
        }
        else{
            return res.status(400).json({message: "Bad Request"});
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

const getMessageByMessageId = async(req, res, next) => {
    try{
        if(req.isLogin === false) {
            return res.status(401).json({message: "Unauthorized"});
        }
        else {
            if(Types.ObjectId.isValid(req.params.userId) && Types.ObjectId.isValid(req.params.messageId)) {
                const message = await Message.findOne({_id: req.params.messageId});
                if(message) {
                    if(message.receiverId.equals(req.userId)){
                        await Message.updateOne({_id: req.params.messageId}, {$set: {visit: true}});
                        message.visit = true;
                        return res.status(200).json(message);
                    }
                    else{
                        return res.status(401).json({message: "Unauthorized"});
                    }
                }
                else {
                    return res.status(400).json({message: "The message does not exist"}); // 처리 필요
                }
            }
            else {
                if(!Types.ObjectId.isValid(req.params.userId)) {
                    return res.status(400).json({message: "The user does not exist"});
                }
                if(!Types.ObjectId.isValid(req.params.messageId)) {
                    return res.status(400).json({message: "The message does not exist"});
                }
            }
        }
    }
    catch(err) {
        console.log(err);
        return next(err);
    }
}

const createMessage = async(req, res, next) => {
    try{
        const {senderNickName, content, topic, paperImage} = req.body;
        const receiverId = req.params.userId;
        const message = {_id: new Types.ObjectId(), receiverId, senderNickName, content, topic, paperImage};
        await User.findOneAndUpdate({_id: receiverId}, {$push: {message: message._id}}).exec((err, data) => {
            if(err){
                console.log(err);
                return next(err);
            }
            else if(data === null){
                return res.status(400).json({message: "The user does not exist"});
            }
            else{
                Message.create(message);
                return res.status(201).json({message: "Successfully created"});
            }
        });
    }
    catch(err){
        console.error(err);
        return next(err);
    }
};

const deleteMessage = async(req, res, next) => {
    try{
        if(req.isLogin === false) {
            return res.status(401).json({message: "Unauthorized"});
        }
        else {
            if(Types.ObjectId.isValid(req.params.messageId)){
                await Message.findOneAndDelete({_id: req.params.messageId});
                res.status(200).json({message: "Successfully deleted"});
            }
            else{
                res.status(400).json({message: "Bad request"});
            }
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = {
    getMessages,
    getMessagesByUserId,
    getMessageByMessageId,
    createMessage,
    deleteMessage,
};