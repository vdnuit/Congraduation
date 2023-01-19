const passport = require("passport");
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const User = require('../models/user');
const axios = require('axios');

const auth = async (req, res, next) => {
    console.log("AUTH");
    req.isLogin = false;
    console.log(req.headers);
    let token = null;
    if(req.headers.authorization){
        console.log("AUTHORIZATION_HEADER");
        token = req.headers.authorization.split(' ')[1];
    }
    if(token){
        console.log("TOKEN:", token);
        if(req.cookies.provider === 'local'){
            console.log("here0");
            try{
                jwt.verify(token, process.env.JWTSecret, async(err, decoded) => {
                    if(err){
                        console.log("here1");
                        if(err instanceof jwt.TokenExpiredError){ // 토큰 만료
                            return res.status(401).json({message: "Access token expired"});
                        }
                        else if(err instanceof jwt.JsonWebTokenError){
                            return res.status(400).json({message: "Token is required"});
                        }
                        else{
                            console.log(err);
                            return res.json({message: err});
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
                });
            }
            catch(err){
                console.log(err);
                return res.next(err);
            }
        }
        else if(req.cookies.provider === 'kakao'){
            try{
                const accessToken = token;
                console.log("HERES TOKEN:", accessToken);
                const isValidAccessToken = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', { // check accessToken
                    headers:{
                        'Authorization': `Bearer ${accessToken}`
                      }
                }).catch((err) => {
                    if(err.response.status === 401){
                        console.log("access token 401");
                        return res.status(401).json({message: "Token is expired"});
                    }
                    else if(err.response.status === 400){
                        console.log("access token 400");
                        return res.status(400).json({message: "Token does not exist"});
                    }
                    else{
                        console.log("Something is wrong with kakao token, please try again");
                        return res.status(500).json({message: "Something is wrong with kakao token, please try again"})
                    }
                });
                if(isValidAccessToken.status === 200 && isValidAccessToken.data){ // valid token
                    const userInfo = await axios({ // get user
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
            return res.status(400).json({message: "Bad Request - Field \"provider\" must exist"});
        }
    }
    else{
        return res.status(401).json({message: "Unauthorized"});
    }
};

module.exports = auth;