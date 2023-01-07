const passport = require("passport");
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const User = require('../models/user');
const axios = require('axios');

const jwtAuth = async (req, res, next) => {
    console.log("HERERERE!", req.cookies);
    const token = req.cookies.accessToken;
    console.log("accessToken: ", token);
    if(req.cookies.provider == 'local'){
        try{
            jwt.verify(token, process.env.JWTSecret, async(err, decoded) => {
                if(err){
                    if(err instanceof jwt.TokenExpiredError){
                        const refreshToken = await Token.findOne({token: req.cookies.refreshToken});
                        console.log("refresh token: ", refreshToken);
                        if(refreshToken){
                            const user = await User.findOne({_id: refreshToken.userId});
                            console.log("userId: ", user);
                            const accessToken = jwt.sign({id: user._id, provider: user.provider}, process.env.JWTSecret, {expiresIn: "10s"});
                            res.cookie("accessToken", accessToken, {httpOnly: true});
                            req.userId = user._id;
                            req.provider = user.provider;
                            req.isLogin = true;
                        }
                        else{
                            res.clearCookie('accessToken');
                            res.clearCookie('refreshToken');
                            req.isLogin = false;
                        }
                        return next();
                    }
                    else if(err instanceof jwt.JsonWebTokenError){
                        req.isLogin = false;
                        return next();
                    }
                }
                else{
                    req.userId = decoded.id;
                    req.provider = decoded.provider;
                    req.isLogin = true;
                    return next();
                }
            })
        }
        catch(err){
            res.clearCookie("accessToken");
            return res.redirect('/');
        }
    }
    else if(req.cookies.provider == 'kakao'){
        try{
            console.log(req.cookies.accessToken);
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;
            const accessTokenInfo = await axios({
                method:'get',
                url:'https://kapi.kakao.com/v1/user/access_token_info',
                headers:{
                  'Authorization': `Bearer ${accessToken}`
                }
            });
            // const refreshTokenInfo = await axios({
            //     method:'post',
            //     url:'https://kauth.kakao.com/oauth/token/',
            //     headers:{
            //       'Content-Type': "application/x-www-form-urlencoded"
            //     },
            //     params:{
            //         grant_type:'refresh_token',
            //         client_id: process.env.KAKAO_ID,
            //         refresh_token: refreshToken
            //     }
            // });
            // console.log("HERE:", refreshTokenInfo.data);
            if(accessTokenInfo.data){
                req.isLogin = true;
                return next();
            }
            else{
                req.isLogin = false;
                return next();
            }
        }
        catch(err){
            console.log(err);
            return next(err);
        }
    }
};

const kakaoAuth = async(req, res, next) => {
    try{
        console.log(req.cookies.accessToken);
        const ACCESS_TOKEN = req.cookies.accessToken;
        const tokenInfo = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v1/user/access_token_info',
            headers:{
              'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        if(tokenInfo.data)
            res.status(200).json({message: "valid token"});
        else
            res.json({message: "invalid token"});
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = jwtAuth;