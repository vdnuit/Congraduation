const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');

// 로컬 유저 로그인
const signin = (req, res, next) => {
    try{
        passport.authenticate('local', (authError, user, info) => { // done()을 통해 인자가 불려옴
            if(authError){
                console.log(authError);
                return next(authError);
            }
            if(!user){
                return res.json({loginError: info.message});
            }
            req.login(user, (err) => {
                if(err){
                    console.log(err);
                    return next(err);
                }
                res.redirect('/');
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
        if(req.user.user.id && req.user.user.provider == 'local'){
            req.session.destroy((err) => {
                if(err) console.log(err);
                res.redirect('/');
            });
        }
        else if(req.user.user.id && req.user.user.provider == 'kakao'){
            try {
                const ACCESS_TOKEN = req.user.accessToken;
                console.log(ACCESS_TOKEN);
                await axios({
                    method:'post',
                    url:'https://kapi.kakao.com/v1/user/unlink',
                    headers:{
                      'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                });
            }
            catch(err){
                console.log(err);
                return next(err);
            }
            req.session.destroy((err) => {
                if(err) console.log(err);
                res.redirect('/');
            });
        }
    }
    catch(err){
        console.log(err);
        return next(err);
    }
};

module.exports = {
    signin,
    signout,
};