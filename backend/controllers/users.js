const User = require('../models/user');
const Message = require('../models/message');
const bcrypt = require('bcrypt');
const { Types } = require('mongoose');

const delCookie = (res) => {
    res.clearCookie('provider');
    res.clearCookie('refreshToken');
}

// 로컬 유저 회원가입
const signup = async(req, res, next) => {
    try{
        const {userId, password, nick} = req.body;
        const user = await User.findOne({userId: userId});
        if(!user){ //id, nick 모두 아직 존재하지 않을 시
            //해쉬화
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            //생성
            const newUser = {userId, password: hashedPassword, provider: 'local', nick};
            User.create(newUser);
            res.status(201).json({message: "Successfully registered"});
        }
        else{
            if(user)
                res.status(400).json({msg: "이미 동일한 아이디가 존재합니다."});
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

const getMyInfo = async(req, res, next) => {
    try{
        console.log("[GET MY INFO]");
        if(req.isLogin === false) {
            return res.status(401).json({message: "Unauthorized"});
        }
        else {
            const user = await User.findOne({_id: req.userId});
            if(user) {
                console.log("AUTHORIZED USER INFO HAS BEEN RETURNED SUCCESSFULLY!");
                res.status(200).json({userId: user._id, selfId: user.userId, nick: user.nick, provider: user.provider});
            }
            else {
                console.log("FAIELD TO RETURN AUTHORIZED USER INFO");
                res.status(401).json({message: "Unauthorized"});
            }
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

const getUserById = async(req, res, next) => {
    try{
        console.log("GET USER ID");
        if(Types.ObjectId.isValid(req.params.userId)){
            await User.findOne({_id: req.params.userId}).lean().populate('message', '_id paperImage').exec((err, data) => {
                if(err){
                    console.log(err);
                    return next(err);
                }
                else if(data === null) {
                    return res.status(400).json({message: "Bad request"});
                }
                else{
                    return res.status(200).json({userId: data._id, nick: data.nick, message: data.message});
                }
            });
        }
        else {
            console.log("USER ID NOT VALID");
            return res.status(400).json({message: "Bad Request"});
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

const deleteUser = async(req, res, next) => {
    try{
        if(req.isLogin === false) {
            return res.status(401).json({message: "Unauthorized"});
        }
        else {
            if(Types.ObjectId.isValid(req.params.userId)){
                if(req.provider === 'local'){
                    const user = await User.findOne({_id: req.params.userId});
                    if(user._id.equals(req.userId)){
                            await User.deleteOne({_id: user.id});
                            await Message.deleteMany({receiverId: user.id});
                            delCookie(res);
                            return res.status(200).json({message: "Successfully deleted"});
                    }
                    else{
                        return res.status(401).json({message: "Unauthorized"});
                    }
                }
                else{
                    return res.status(401).json({message: "Provider field is required"});
                }
            }
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = {
    signup,
    getMyInfo,
    getUserById,
    deleteUser,
}