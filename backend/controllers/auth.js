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
                console.log(info);
                return res.status(400).json({loginError: info.reason});
            }
            req.login(user, {session: false}, (err) => { // {session:false}
                if(err){
                    console.log(err);
                    return next(err);
                }
                const accessToken = createToken('AccessKey', user._id, user.nick, user.provider);
                const refreshToken = createToken('RefreshKey');
                Token.create({userId: user._id, token: refreshToken, createdAt: new Date(Date.now())});
                res.cookie("provider", "local", {httpOnly: true});
                res.cookie("accessToken", accessToken, {httpOnly: true});
                res.cookie("refreshToken", refreshToken, {httpOnly: true}).status(200).json({_id: user._id, nick: user.nick});
            });
        })(req,res,next);
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

const signout = async (req, res, next) => {
    try{
        if(req.isLogin == true){
            if(req.cookies.provider === 'local'){
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                return res.clearCookie('provider').status(200).json({message: "Logout succeed"});
            }
            else if(req.cookies.provider === 'kakao'){
                try {
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                    res.clearCookie('provider');
                    return res.redirect(`https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_ID}&logout_redirect_uri=${process.env.LOGOUT_REDIRECT_URL}`);
                }
                catch(err){
                    console.log(err);
                    return next(err);
                }
            }
        }
        else{
            res.status(401).json({message: "Unauthorized"});
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