const User = require('../models/user');
// const bcrypt = require('bcrypt');

// const signup = async(req, res) => {
//     const {id, pw, nickname} = req.body;
//     const user = await User.findOne({id: id});
//     const userNickname = await User.findOne({nickname: nickname});
//     if(!user && ! userNickname){ //id, nick 모두 아직 존재하지 않을 시
//         //해쉬화
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(pw, salt);
//         //생성
//         const newUser = {id, pw: hashedPassword, nickname};
//         User.create(newUser);
//         //토큰
//         // const newUserToken = jwt.sign({id}, process.env.JSON_WEB_TOKEN, {expiresIn: 60 * 60}); //jwt
//         res.status(201).json(newUser);
//     }
//     else{
//         if(user)
//             res.status(400).json({msg: "이미 동일한 아이디가 존재합니다."});
//         if(nickname)
//             res.status(400).json({msg: "이미 동일한 닉네임이 존재합니다."});
//     }
// }

const getUser = async(req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

module.exports = {
    // signup,
    getUser,
}