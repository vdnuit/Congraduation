const User = require('../models/user');
const Message = require('../models/message');
const bcrypt = require('bcrypt');
const { Types } = require('mongoose');

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

const getUser = async(req, res, next) => {
    try{
        if(req.isLogin === true){
            await User.find({_id: req.userId}).exec((err, data) => {
                if(err){
                    console.log(err);
                    return next(err);
                }
                else {
                    if(req.userId === data._id){
                        res.status(200).json(data);
                    }
                }
            });
        }
        else{
            res.status(401).json({message: 'Unauthorized'});
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

const getUserById = async(req, res, next) => {
    try{
        console.log(req.isLogin);
        console.log(req.userId);
        if(Types.ObjectId.isValid(req.params.userId)){
            await User.findOne({_id: req.params.userId}).exec((err, data) => {
                if(err){
                    console.log(err);
                    return next(err);
                }
                else{
                    if(req.isLogin === true && data._id.equals(req.userId)){
                        console.log("AAAA");
                        return res.status(200).json({userId: data._id, nick: data.nick, message: data.message, authorized: true});
                    }
                    else{
                        console.log("BBB");
                        return res.status(200).json({userId: data._id, nick: data.nick, message: data.message, authorized: false});
                    }
                }
            });
        }
        else {
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
        if(req.isLogin === true){
            if(req.provider === 'local'){
                const user = await User.findOne({_id: req.params.userId});
                if(user && user._id.equals(req.userId)){
                    await User.deleteOne({_id: user.id});
                    await Message.deleteMany({receiverId: user.id});
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                    res.clearCookie('provider');
                    return res.status(200).json({message: "Successfully deleted"});
                }
                else{
                    return res.status(401).json({message: "Unauthorized"});
                }   
            }
            else if(req.provider === 'kakao'){
                try {
                    const ACCESS_TOKEN = req.cookies.accessToken;
                    await axios({
                        method:'post',
                        url:'https://kapi.kakao.com/v1/user/unlink',
                        headers:{
                          'Authorization': `Bearer ${ACCESS_TOKEN}`
                        }
                    });
                    if(user && user._id.equals(req.userId)){
                        await User.deleteOne({_id: user.id});
                        await Message.deleteMany({receiverId: user.id});
                        res.clearCookie('accessToken');
                        res.clearCookie('refreshToken');
                        res.clearCookie('provider');
                        return res.status(200).json({message: "Successfully deleted"});
                    }
                }
                catch(err){
                    console.log(err);
                    return next(err);
                }
            }
            else{
                return res.status(401).json({message: "Unauthorized"});
            }
        }
        else{
            return res.status(401).json({message: 'Unauthorized'});
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

const deleteKakaoUserById = async(req, res, next) => {
    try {
        const ACCESS_TOKEN = req.cookies.accessToken;
        await axios({
            method:'post',
            url:'https://kapi.kakao.com/v1/user/unlink',
            headers:{
              'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = {
    signup,
    getUser,
    getUserById,
    deleteUser,
}