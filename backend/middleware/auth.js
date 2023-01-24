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
    console.log("[AUTH]");
    req.isLogin = false;
    let token = null;
    if(req.headers.authorization){
        console.log("SUCCESSFULLY GET AUTHORIZATION HEADER");
        token = req.headers.authorization.split(' ')[1];
    }
    else{
        console.log("FAILED TO GET AUTHORIZATION HEADER");
    }
    if(token){
        console.log("VERIFYING TOKEN:", token);
        if(req.cookies.provider === 'local'){
            console.log("[LOCAL]");
            try{
                jwt.verify(token, process.env.JWTSecret, async(err, decoded) => {
                    if(err){
                        if(err instanceof jwt.TokenExpiredError){ // 토큰 만료
                            console.log("TOKEN IS EXPIRED");
                            return next();
                            // return res.status(401).json({message: "Access token expired"});
                        }
                        else if(err instanceof jwt.JsonWebTokenError){
                            console.log("NO TOKEN PROVIDED");
                            return next();
                            // return res.status(400).json({message: "Token is required"});
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
                console.log("[KAKAO]");
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
                        // return res.status(401).json({message: "Token is expired"});
                    }
                    else if(err.response.status === 400){
                        console.log("access token 400");
                        return next();
                        // return res.status(400).json({message: "Token does not exist"});
                    }
                    else{
                        console.log("Something is wrong with kakao token, please try again");
                        return next();
                        // return res.status(500).json({message: "Something is wrong with kakao token, please try again"})
                    }
                });
                if(isValidAccessToken.status === 200 && isValidAccessToken.data){ // valid token
                    console.log("TOKEN VERIFIED!");
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
            // return res.status(401).json({message: "Field \"provider\" must exist"});
        }
    }
    else{
        console.log("UNAUTHORIZED DUE TO EMPTY TOKEN...");
        delCookie(res);
        return next();
    }
};

module.exports = auth;