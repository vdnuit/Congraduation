const passport = require("passport");
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const User = require('../models/user');
const axios = require('axios');

const delCookie = (res) => {
    res.clearCookie('refreshToken');
    res.clearCookie('provider');
}

const auth = async (req, res, next) => {
    req.isLogin = false;
    let token = null;
    if(req.headers.authorization){
        token = req.headers.authorization.split(' ')[1];
    }
    else{
        console.log("FAILED TO GET AUTHORIZATION HEADER");
    }
    if(token){
        console.log("VERIFYING TOKEN:", token);
        if(req.cookies.provider === 'local'){
            try{
                jwt.verify(token, process.env.JWTSecret, async(err, decoded) => {
                    console.log("VERIFICATION");
                    if(err){
                        if(err instanceof jwt.TokenExpiredError){ // 토큰 만료
                            console.log("TOKEN IS EXPIRED");
                            return next();
                        }
                        else if(err instanceof jwt.JsonWebTokenError){
                            console.log("NO TOKEN PROVIDED");
                            return next();
                        }
                        else{
                            console.log(err);
                            return next(err);
                        }
                    }
                    else{
                        console.log("TOKEN VERIFIED!");
                        req.userId = decoded.id;
                        req.nick = decoded.nick;
                        req.provider = decoded.provider;
                        req.isLogin = true;
                        return next();
                    }
                });
            }
            catch(err){
                console.log(err);
                return next(err);
            }
        }
        else if(req.cookies.provider === 'kakao'){
            try{
                const accessToken = token;
                console.log("VERIFYING TOKEN:", accessToken);
                const isValidAccessToken = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', { // check accessToken
                    headers:{
                        'Authorization': `Bearer ${accessToken}`
                      }
                }).catch((err) => {
                    if(err.response.status === 401){
                        console.log("access token 401");
                        return next();
                    }
                    else if(err.response.status === 400){
                        console.log("access token 400");
                        return next();
                    }
                    else{
                        console.log("Something is wrong with kakao token, please try again");
                        return next();
                    }
                });
                if(isValidAccessToken.status === 200 && isValidAccessToken.data){ // valid token
                    const userInfo = await axios({ // get user
                        method:'get',
                        url:'https://kapi.kakao.com/v2/user/me',
                        headers:{
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    const user = await User.findOne({userId: userInfo.data.id});
                    req.userId = user._id;
                    req.selfId = user.userId;
                    req.nick = user.nick;
                    req.provider = 'kakao';
                    req.accessToken = accessToken;
                    req.isLogin = true;
                    return next(); // successfully access
                }
            }
            catch(err){
                console.log(err);
                return next(err);
            }
        }
        else{
            delCookie(res);
            return next();
        }
    }
    else{
        console.log("UNAUTHORIZED DUE TO EMPTY TOKEN...");
        return next();
    }
};

module.exports = auth;