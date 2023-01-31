const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcrypt');

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

const delCookie = (res) => {
    res.clearCookie('provider');
    res.clearCookie('refreshToken');
}

const signin = (req, res, next) => {
    try{
        delCookie(res);
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
                    delCookie(res);
                    return next(err);
                }
                const accessToken = createToken('AccessKey', user._id, user.nick, user.provider);
                const refreshToken = createToken('RefreshKey');
                Token.create({userId: user._id, token: refreshToken, createdAt: new Date(Date.now())});
                res.cookie("provider", "local", {samesite: 'none', secure: true});
                return res.cookie("refreshToken", refreshToken, {httpOnly: true, samesite: 'none', secure: true}).status(200).json({accessToken: accessToken, _id: user._id, nick: user.nick});
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
        if(req.isLogin === false) {
            return res.status(401).json({message: "Unauthorized"});
        }
        else {
            if(req.cookies.provider === 'local'){
                delCookie(res);
                return res.status(200).json({message: "Logout successful"});
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
                delCookie(res);
                return res.status(200).json({message: "Logout successful"});
            }
            else { // already blocked by auth.js
                delCookie(res);
                return res.status(400).json({message: "Bad request"});
            }
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
    console.log("[KAKAO CALLBACK]");
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
        console.log("YOUR REFRESHTOKEN:", refreshToken);
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
                res.cookie("refreshToken", refreshToken, {httpOnly: true, samesite: 'none', secure: true});
                res.cookie("provider", "kakao", {samesite: 'none', secure: true});
                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, provider: 'kakao', _id: newUser._id});
            }
            else{
                res.cookie("refreshToken", refreshToken, {httpOnly: true, samesite: 'none', secure: true});
                res.cookie("provider", "kakao", {samesite: 'none', secure: true});
                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, provider: 'kakao', _id: exUser._id});
            }
          }
          else{
            return res.status(400).json({message: "Bad Request"});
          }
        }
        else{
            delCookie(res);
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
        console.log("[REFRESH TOKEN]");
        if(req.cookies.refreshToken) {
            console.log("CHECKING REFRESH TOKEN IN COOKIE...");
            const refreshToken = req.cookies.refreshToken;
            if(req.cookies.provider === 'local'){
                console.log("[LOCAL]")
                const token = await Token.findOne({token: refreshToken});
                console.log("CHECKING IF THERE IS REFRESH TOKEN...");
                if(token){ // 리프레쉬 토큰 존재 -> 재발급
                    console.log("NEW ACCESS TOKEN PROVIDED!");
                    const user = await User.findOne({_id: token.userId});
                    const accessToken = createToken('AccessKey', user._id, user.nick, user.provider);
                    res.status(200).json({accessToken: accessToken});
                }
                else{
                    delCookie(res);
                    res.status(401).json({message: "The refresh token does not exist"});
                }
            }
            else if(req.cookies.provider === 'kakao'){
                console.log("[KAKAO]")
                console.log("CHECKING IF THERE IS REFRESH TOKEN...");
                const tokenInfo = await axios.get('https://kauth.kakao.com/oauth/token', {
                        params: {
                            grant_type: 'refresh_token',
                            client_id: process.env.KAKAO_ID,
                            refresh_token: refreshToken
                        }
                }).catch((err) => {
                    if(err.response.status === 401 || err.response.status === 400){
                        console.log("REFRESH TOKEN IS NOT OR NO LONGER VALID");
                        delCookie(res);
                        return res.status(401).json({message: "The refresh token does not exist"});
                    }
                    else{
                        console.log("Something is wrong with kakao token, please try again");
                        delCookie(res);
                        return res.status(500).json({message: "Something is wrong with kakao token"});
                    }
                });
                if(tokenInfo.status === 200) {
                    console.log("NEW ACCESS TOKEN PROVIDED!");
                    return res.status(200).json({accessToken: tokenInfo.data.access_token});
                }
            }
            else{
                delCookie(res);
                return res.status(400).json({message: "You must contain provider field in cookie"});
            }
        }
        else{
            console.log("NO REFRESH TOKEN IN COOKIE");
            delCookie(res);
            res.status(401).json({message: "The refresh token is empty"});
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

const checkPassword = async(req, res, next) => {
    try {
        if(req.isLogin === false) {
            return res.status(401).json({message: "Unauthorized"});
        }
        else {
            let user = null;
            const { password } = req.body;
            if(req.userId && req.provider === 'local' ) {
                user = await User.findOne({_id: req.userId});
                if(user !== null){
                    const compareResult = await bcrypt.compare(password, user.password);
                    if(compareResult){
                        res.status(200).json({message: "Account verified"});
                    }
                    else{
                        res.status(400).json({message: "Password incorrect"});
                    }
                }
                else {
                    res.status(400).json({message: "Bad request - The user does not exist"});
                }
            }
            else {
                res.status(401).json({message: "Unauthorized"});
            }
        }
    }
    catch(err) {
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
    checkPassword,
    getRefreshToken,
};


// 액세스 토큰을 갖고 api 요청하는데, 1) 미들웨어 2) accessToken 확인 후 refresh-token 요청