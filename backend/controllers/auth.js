const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');

// 로컬 유저 로그인
const createToken = (type, bodyId='', bodyNick='', bodyProvider='') => {
    if(type === 'AccessKey'){
        const accessToken = jwt.sign({id: bodyId, nick: bodyNick, provider: bodyProvider}, process.env.JWTSecret, {expiresIn: "30m"});
        return accessToken;
    }
    else if(type === 'RefreshKey'){
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "14d"});
        return refreshToken;
    }
}

const signin = (req, res, next) => {
    try{
        passport.authenticate('local', (authError, user, info) => { // done()을 통해 인자가 불려옴
            if(authError){
                console.log(authError);
                res.clearCookie('provider');
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                res.clearCookie('_id');
                res.clearCookie('nick');
                return next(authError);
            }
            if(!user){
                console.log(info);
                return res.status(400).json({loginError: info.reason});
            }
            req.login(user, {session: false}, (err) => { // {session:false}
                if(err){
                    console.log(err);
                    res.clearCookie('provider');
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                    res.clearCookie('_id');
                    res.clearCookie('nick');
                    return next(err);
                }
                const accessToken = createToken('AccessKey', user._id, user.nick, user.provider);
                const refreshToken = createToken('RefreshKey');
                Token.create({userId: user._id, token: refreshToken, createdAt: new Date(Date.now())});
                res.cookie("provider", "local");
                res.cookie("accessToken", accessToken, {httpOnly: true});
                res.cookie("_id", user._id);
                res.cookie("nick", user.nick);
                return res.cookie("refreshToken", refreshToken, {httpOnly: true}).status(200).json({_id: user._id, nick: user.nick});
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
                res.clearCookie('_id');
                res.clearCookie('nick');
                return res.clearCookie('provider').status(200).json({message: "Logout successful"});
            }
            else if(req.cookies.provider === 'kakao'){
                try {
                    const data = await axios.get('https://kapi.kakao.com/v1/user/logout',
                    {
                        headers: {
                            Authorization: `Bearer ${req.cookies.accessToken}`
                        }
                    }
                    );
                }
                catch(err){
                    console.log(err);
                    return next(err);
                }
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                res.clearCookie('_id');
                res.clearCookie('nick');
                return res.clearCookie('provider').status(200).json({message: "Logout successful"});
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

const kakaoLogin = async(req, res, next) => {
    try{
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code`
        res.redirect(kakaoURL);
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

const kakaoCallback = async(req, res, next) => {
    if(req.query.code){
      try{
        const tokenInfo = await axios.get('https://kauth.kakao.com/oauth/token', {
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_ID,
            redirect_uri: process.env.REDIRECT_URL,
            code: req.query.code
          }
        });
        const accessToken = tokenInfo.data.access_token;
        const refreshToken = tokenInfo.data.refresh_token;
        if(accessToken){
          const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          });
          if(userInfo.data){
            let exUser = null;
            exUser = await User.findOne({ // find user
              userId: userInfo.data.id, provider: 'kakao'
            });
            if(exUser === null){
                const newUser = await User.create({
                    userId: userInfo.data.id,
                    nick: userInfo.data.kakao_account.profile.nickname,
                    provider: 'kakao',
                });
                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, provider: 'kakao', nick: userInfo.data.kakao_account.profile.nickname, _id: newUser._id});
            }
            else{
              return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, provider: 'kakao', nick: exUser.nick, _id: exUser._id});
            }
          }
          else{
            return res.status(400).json({message: "Bad Request"});
          }
        }
        else{
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.clearCookie('_id');
            res.clearCookie('nick');
            res.clearCookie('provider');
            return res.status(400).json({message: "Bad Request"});
        }
      }
    catch(err){
      if(err){
        console.log(err);
        return next(err);
      }
    }
  }
}; // redirect URI (Access token) [fail, success]

module.exports = {
    signin,
    signout,
    kakaoLogin,
    kakaoCallback,
    createToken,
};