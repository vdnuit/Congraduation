const passport = require("passport");
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const User = require('../models/user');
const axios = require('axios');

const jwtAuth = async (req, res, next) => {
    console.log("HERERERE!", req.cookies);
    const token = req.cookies.accessToken;
    console.log("accessToken: ", token);
    if(req.cookies.refreshToken){
        if(req.cookies.provider === 'local'){
            try{
                console.log("I")
                jwt.verify(token, process.env.JWTSecret, async(err, decoded) => {
                    console.log("L")
                    if(err){
                        console.log("O")
                        if(err instanceof jwt.TokenExpiredError){
                            const refreshToken = await Token.findOne({token: req.cookies.refreshToken});
                            console.log("refresh token: ", refreshToken);
                            if(refreshToken){
                                const user = await User.findOne({_id: refreshToken.userId});
                                console.log("REFRESH TOKEN!");
                                const accessToken = jwt.sign({id: user._id, nick: user.nick, provider: user.provider}, process.env.JWTSecret, {expiresIn: "10s"});
                                res.cookie("accessToken", accessToken, {httpOnly: true});
                                req.userId = user._id;
                                req.nick = user.nick;
                                req.provider = user.provider;
                                req.isLogin = true;
                            }
                            else{
                                res.clearCookie('accessToken');
                                res.clearCookie('refreshToken');
                                res.clearCookie('provider');
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
                        console.log("ACCESS TOKEN!");
                        req.userId = decoded.id;
                        req.nick = decoded.nick;
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
        else if(req.cookies.provider === 'kakao'){
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
    }
    else{
        res.status(401).json({message: "Unauthorized"});
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