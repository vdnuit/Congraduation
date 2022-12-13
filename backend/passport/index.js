const User = require('../models/user');
const passport = require('passport');

// req.login()이 호출함
passport.serializeUser((user, done) => {
    done(null, user.id); // req.session에 user.id 저장
});

// passport.session()이 호출함
passport.deserializeUser((id, done) => {     // req.session의 id로 DB 조회 후 req.user에 전체 정보 불러옴
    User.findOne({id: id})
    .then(user => done(null, user)) // req.user에 저장
    .catch(err => done(err));
});