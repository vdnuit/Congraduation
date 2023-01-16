const passport = require("passport");
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const User = require('../models/user');
const axios = require('axios');

const auth = async (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log("AUTH");
    console.log(req.cookies);
    if(req.cookies.refreshToken){
        if(req.cookies.provider === 'local'){
            console.log("here0");
            try{
                jwt.verify(token, process.env.JWTSecret, async(err, decoded) => {
                    if(err){
                        console.log("here1");
                        if(err instanceof jwt.TokenExpiredError){
                            const refreshToken = await Token.findOne({token: req.cookies.refreshToken});
                            if(refreshToken){
                                const user = await User.findOne({_id: refreshToken.userId});
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
                                res.clearCookie('_id');
                                res.clearCookie('nick');
                                res.clearCookie('provider');
                                req.isLogin = false;
                                // return res.redirect('http://localhost:3000/');
                            }
                            return next();
                        }
                        else if(err instanceof jwt.JsonWebTokenError){
                            req.isLogin = false;
                            return next();
                        }
                    }
                    else{
                        console.log("here2");
                        console.log(decoded);
                        req.userId = decoded.id;
                        req.nick = decoded.nick;
                        req.provider = decoded.provider;
                        req.isLogin = true;
                        return next();
                    }
                })
            }
            catch(err){
                console.log(err);
                return res.next(err);
            }
        }
        else if(req.cookies.provider === 'kakao'){
            try{
                console.log(req.cookies.accessToken);
                const accessToken = req.cookies.accessToken;
                const refreshToken = req.cookies.refreshToken;
                console.log("yaa");
                const isValidAccessToken = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', {
                    headers:{
                        'Authorization': `Bearer ${accessToken}`
                      }
                });
                console.log("hereyab", isValidAccessToken);
                console.log("yab");

                if(isValidAccessToken.status === 200 && isValidAccessToken.data){
                    const userInfo = await axios({
                        method:'get',
                        url:'https://kapi.kakao.com/v2/user/me',
                        headers:{
                            'Authorization': `Bearer ${accessToken}`
                        }
                    })
                    console.log("yay");
                    console.log("this is", userInfo.data.id);
                    const user = await User.findOne({userId: userInfo.data.id});
                    req.userId = user._id;
                    req.nick = user.nick;
                    req.provider = 'kakao';
                    req.isLogin = true;
                    return next();
                }
                else if(isValidAccessToken.status === 401){
                    const isValidRefreshToken = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', {
                        headers:{
                            'Authorization': `Bearer ${refreshToken}`
                          }
                    });
                    console.log("KAKAO: REFRESH_TOKEN_CHECK");
                    if(isValidRefreshToken.status === 200 && isValidRefreshToken.data){
                        const tokenInfo = await axios.get('https://kauth.kakao.com/oauth/token', {
                            params: {
                                grant_type: 'refresh_token',
                                client_id: process.env.KAKAO_ID,
                                refresh_token: refreshToken
                            }
                        });
                        req.isLogin = true;
                        res.cookie(tokenInfo.data.access_token, {httpOnly: true});
                        res.cookie(tokenInfo.data.refresh_token, {httpOnly: true});
                        return next();
                    }
                    else if(isValidRefreshToken.status === 401){
                        req.isLogin = false;
                        return next();
                    }
                }
                else{
                    console.error("Something is wrong with kakao token, please try again");
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                    res.clearCookie('_id');
                    res.clearCookie('nick');
                    res.clearCookie('provider');
                    req.isLogin = false;
                    return next();
                }
            }
            catch(err){
                console.log(err);
                return next(err);
            }
        }
        else{
            console.log("HERE");
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.clearCookie('_id');
            res.clearCookie('nick');
            res.clearCookie('provider');
            req.isLogin = false;
            return res.status(400).json({message: "Bad Request - Field \"provider\" must exist"});
        }
    }
    else{
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('_id');
        res.clearCookie('nick');
        res.clearCookie('provider');
        req.isLogin = false;
        return next();
    }
};

module.exports = auth;