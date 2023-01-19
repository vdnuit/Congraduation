const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');

// 로컬 유저 로그인
const createToken = (type, bodyId='', bodyNick='', bodyProvider='') => {
    if(type === 'AccessKey'){
        const accessToken = jwt.sign({id: bodyId, nick: bodyNick, provider: bodyProvider}, process.env.JWTSecret, {expiresIn: "5m"});
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
                res.cookie("_id", user._id);
                res.cookie("nick", user.nick);
                res.cookie("accessToken", accessToken, {httpOnly: true});
                return res.cookie("refreshToken", refreshToken, {httpOnly: true}).status(200).json({accessToken: accessToken, _id: user._id, nick: user.nick});
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
                res.clearCookie('refreshToken');
                return res.clearCookie('provider').status(200).json({message: "Logout successful"});
            }
            else if(req.cookies.provider === 'kakao'){
                try {
                    const data = await axios.get('https://kapi.kakao.com/v1/user/logout',
                    {
                        headers: {
                            Authorization: `Bearer ${req.accessToken}`
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
                }); // 카카오는, 액세스 토큰 쿠키 만들 필요 없음
                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, provider: 'kakao', _id: newUser._id});
            }
            else{
              return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, provider: 'kakao', _id: exUser._id});
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

const getRefreshToken = async(req, res, next) => {
    try{
        if(req.cookies.refreshToken) {
            const refreshToken = req.cookies.refreshToken;
            if(req.cookies.provider === 'local'){
                const refreshToken = await Token.findOne({token: refreshToken});
                if(refreshToken){ // 리프레쉬 토큰 존재 -> 재발급
                    const user = await User.findOne({_id: refreshToken.userId});
                    const accessToken = jwt.sign({id: user._id, nick: user.nick, provider: user.provider}, process.env.JWTSecret, {expiresIn: "5m"});
                    res.status(200).json({accessToken: accessToken});
                }
                else{
                    res.status(401).json({message: "The refresh token does not exist"});
                }
            }
            else if(req.cookies.provider === 'kakao'){
                const isValidRefreshToken = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', { // check refreshToken
                    headers:{
                        'Authorization': `Bearer ${refreshToken}`
                      }
                });
                console.log("KAKAO: REFRESH_TOKEN_CHECK");
                if(isValidRefreshToken.status === 200 && isValidRefreshToken.data){ // valid refreshToken
                    const tokenInfo = await axios.get('https://kauth.kakao.com/oauth/token', {
                        params: {
                            grant_type: 'refresh_token',
                            client_id: process.env.KAKAO_ID,
                            refresh_token: refreshToken
                        }
                    });
                    return res.status(200).json({accessToken: tokenInfo.data.access_token});
                }
                else if(isValidRefreshToken.status === 400 || isValidRefreshToken.status === 401){ // invalid refreshToken
                    return res.status(401).json({message: "The refresh token does not exist"});
                }
                else{ // others
                    console.log("Something is wrong with kakao token, please try again");
                    return res.status(500).json({message: "Something is wrong with kakao token"});
                }
            }
            else{
                return res.status(400).json({message: "You must contain provider field in cookie"});
            }
        }
        else{
            res.status(401).json({message: "The refresh token is empty"});
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = {
    signin,
    signout,
    kakaoLogin,
    kakaoCallback,
    createToken,
    getRefreshToken,
};


// 액세스 토큰을 갖고 api 요청하는데, 1) 미들웨어 2) accessToken 확인 후 refresh-token 요청