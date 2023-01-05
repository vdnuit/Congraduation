const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');

// 로컬 유저 로그인
const createToken = (type, bodyId='', bodyProvider='') => {
    if(type === 'AccessKey'){
        const accessToken = jwt.sign({id: bodyId, provider: bodyProvider}, process.env.JWTSecret, {expiresIn: "10s"});
        console.log(accessToken);
        return accessToken;
    }
    else if(type === 'RefreshKey'){
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "14d"});
        console.log(refreshToken);
        return refreshToken;
    }
}

const signin = (req, res, next) => {
    try{
        passport.authenticate('local', (authError, user, info) => { // done()을 통해 인자가 불려옴
            if(authError){
                console.log(authError);
                return next(authError);
            }
            if(!user){
                return res.json({loginError: info.message});
            }
            req.login(user, {session: false}, (err) => { // {session:false}
                if(err){
                    console.log(err);
                    return next(err);
                }
                const accessToken = createToken('AccessKey', user._id, user.provider);
                const refreshToken = createToken('RefreshKey');
                console.log(accessToken);
                console.log(refreshToken);
                Token.create({userId: user._id, token: refreshToken, createdAt: new Date(Date.now())});
                res.cookie("accessToken", accessToken, {httpOnly: true});
                res.cookie("refreshToken", refreshToken, {httpOnly: true}).json({message: "access token!"});
            });
        })(req,res,next);
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

const kakaoLogin = async(req, res, next) => {
    const {accessToken} = req.body;
    let kakaoProfile;
    try {
        kakaoProfile = await axios.get(
            'https://kapi.kakao.com/v2/user/me',{
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }       
        })
    }
    catch(err){
        return res.send(errResponse())
    }
}

const signout = async (req, res, next) => {
    try{
        if(req.user.user.id && req.user.user.provider == 'local'){
            req.session.destroy((err) => {
                if(err) console.log(err);
                return res.redirect('/');
            });
            // return res.clearCookie('token').end();
        }
        else if(req.user.user.id && req.user.user.provider == 'kakao'){
            try {
                const ACCESS_TOKEN = req.user.accessToken;
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
            req.session.destroy((err) => {
                if(err) console.log(err);
                return res.redirect('/');
            });
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

module.exports = {
    signin,
    signout,
};