const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');

// 로컬 유저 로그인
const signin = (req, res, next) => {
    try{
        console.log("wow");
        passport.authenticate('local', (authError, user, info) => { // done()을 통해 인자가 불려옴
            console.log("haha");
            if(authError){
                console.error(authError);
                return next(authError);
            }
            if(!user){
                return res.redirect(`/?loginError${info.message}`);
            }
            console.log("Login!");
            req.login(user, {session: false}, (loginError) => {
                if(loginError){
                    console.error(loginError);
                    return next(loginError);
                }
                const token = jwt.sign({id: user.id}, 'jwt-secret-key');
                res.json({token});
            });
        })(req,res,next);
    }
    catch(err){
        console.log(err);
        next(err);
    }
};

const kakaoLogout = async (req, res) => {
    try {
        const ACCESS_TOKEN = req.user.accessToken;
        let logout = await axios({
            method:'post',
            url:'https://kapi.kakao.com/v1/user/unlink',
            headers:{
              'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
          });
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
    req.logout();
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    signin,
    kakaoLogout,
};