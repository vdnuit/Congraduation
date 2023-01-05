const passport = require("passport");
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const User = require('../models/user');
const moment = require('moment-timezone');

const jwtAuth = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log("accessToken: ", token);
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
                        return res.cookie("accessToken", accessToken, {httpOnly: true}).json({message: "reissued: " + accessToken});
                    }
                    else{
                        res.clearCookie('accessToken');
                        return res.clearCookie('refreshToken').end();
                    }
                }
                return next(err);
            }
            else{
                console.log(decoded);
                console.log(decoded.id);
                console.log("yeah");
                req.userId = decoded.id;
                req.provider = decoded.id;
                return next();
            }
        })
    }
    catch(err){
        res.clearCookie("accessToken");
        return res.redirect('/');
    }
};

module.exports = jwtAuth;