const passport = require('passport');
const axios = require('axios');

// 로컬 유저 로그인
const signin = async (req, res) => {
    passport.authenticate('local', (authError, user, info) => { // done()을 통해 인자가 불려옴
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/'); // 리스폰스를 세션에 넘겨줌
        });
    });
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