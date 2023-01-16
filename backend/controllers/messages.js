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
            await User.findOne({_id: req.params.userId}).lean().populate('message', '_id paperImage').exec((err, data) => {
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
    if(req.isLogin === true){
        await Message.findOne({_id: req.params.messageId}).exec((err, data) => {
            if(err){
                console.log(err);
                return next(err);
            }
            else if(data === null){
                return res.status(400).json({message: "The message does not exist"});
            }
            else{
                if(data.receiverId.equals(req.userId)){
                    return res.status(200).json(data);
                }
                else{
                    return res.status(401).json({message: "Unauthorized"});
                }
            }
        });
    }
    else{
        return res.status(401).json({message: "Unauthorized"});
    }
}

const createMessage = async(req, res, next) => {
    try{
        const {senderNickName, content, topic, paperImage} = req.body;
        const receiverId = req.params.userId;
        const message = {_id: new mongoose.Types.ObjectId(), receiverId, senderNickName, content, topic, paperImage};
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
        if(Types.ObjectId.isValid()){
            await Message.findOneAndDelete({_id: req.params.messageId});
            res.status(200).json({message: "Successfully deleted"});
        }
        else{
            res.status(400).json({message: "Bad Request"});
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