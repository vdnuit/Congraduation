const User = require('../models/user');
const Message = require('../models/message');
const bcrypt = require('bcrypt');

// 로컬 유저 회원가입
const signup = async(req, res) => {
    try{
        const {userId, password, nick} = req.body;
        const user = await User.findOne({userId: userId});
        const userNickname = await User.findOne({nick: nick});
        if(!user && ! userNickname){ //id, nick 모두 아직 존재하지 않을 시
            //해쉬화
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            //생성
            const newUser = {userId, password: hashedPassword, provider: 'local', nick};
            User.create(newUser);
            res.status(201).json(newUser);
        }
        else{
            if(user)
                res.status(400).json({msg: "이미 동일한 아이디가 존재합니다."});
            if(userNickname)
                res.status(400).json({msg: "이미 동일한 닉네임이 존재합니다."});
        }
    }
    catch(err){
        console.log(err);
        res.json({error: err});
    }
}

const getUser = async(req, res) => {
    if(req.isAuthenticated()){
        await User.find({_id: req.session.passport.user.id}).exec((err, data) => {
            if(err){
                console.log(err);
                res.json({error: err});
            }
            else {
                res.status(200).json(data);
            }
        });
    }
    else{
        res.status(401).json('message: Unauthorized');
    }
};

const getUserById = async(req, res) => {
    await User.find({_id: req.params.userId}).exec((err, data) => {
        if(err){
            console.log(err);
            res.json({error: err});
        }
        else{
            res.status(200).json(data);
        }
    });
};

const deleteUserById = async(req, res) => {
    try{
        const user = await User.findOne({_id: req.params.userId});
        if(user){
            await User.deleteOne({_id: user.id});
            await Message.deleteMany({receiverId: user.id});
            req.session.destroy();
            res.status(200).json({message: "Successfully deleted"});
        }
    }
    catch(err){
        console.log(err);
        res.json({error: err});
    }
}

module.exports = {
    signup,
    getUser,
    getUserById,
    deleteUserById,
}