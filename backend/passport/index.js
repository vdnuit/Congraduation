const User = require('../models/user');
const passport = require('passport');
const kakao = require('./kakaoStrategy');
const local = require('./localStrategy');
const jwt = require('./jwtStrategy');

module.exports = () => { // middleware function
    // req.login()이 호출함
    passport.serializeUser((data, done) => {
        if(data.user){
            if(data.user.provider == 'kakao'){
                done(null, {id: data.user.id, accessToken: data.accessToken, provider: data.user.provider}); // req.session에 user.id 저장
            }
        }
        else{ // local
            done(null, {id: data.id, provider: data.provider});
        }
    });

    // passport.session()이 호출함
    passport.deserializeUser((data, done) => {     // req.session의 id로 DB 조회 후 req.user에 전체 정보 불러옴
        if(data.provider == 'kakao'){
            User.findOne({_id: data.id})
            .then(result => {console.log(result); done(null, {user: result, accessToken: data.accessToken})}) // req.user에 저장
            .catch(err => done(err));
        }
        else{
            User.findOne({_id: data.id})
            .then(result => done(null, {user: result}))
            .catch(err => done(err));
        }
    });
    local();
    kakao();
    jwt();
};