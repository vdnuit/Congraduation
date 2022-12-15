const User = require('../models/user');
const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

module.exports = () => { // middleware function
    // req.login()이 호출함
    passport.serializeUser((data, done) => {
        console.log("Hoo");
        done(null, {id: data.user.id, accessToken: data.accessToken}); // req.session에 user.id 저장
    });

    // passport.session()이 호출함
    passport.deserializeUser((user, done) => {     // req.session의 id로 DB 조회 후 req.user에 전체 정보 불러옴
        console.log("yeah");
        User.findOne({id: user.id})
        .then(result => done(null, {user: result, accessToken: user.accessToken})) // req.user에 저장
        .catch(err => done(err));
    });
    // local();
    kakao();
};