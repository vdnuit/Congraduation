// local
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy; //객체
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports = () => {
    passport.use(
        new LocalStrategy({ // (1) Strategy
            usernameField: 'id',
            passwordField: 'password'
        },
        async(id, password, done) => { // (2) Verify Function
            try{
                const user = await User.findOne({_id: id});
                if(!user){
                    done(null, false, {reason: '존재하지 않는 사용자입니다.'});
                    //done은 passport.authenticate()의 콜백으로 3개의 인자 err, 수행결과(정보), 추가정보를 넘김
                    return;
                }
                const compareResult = await bcrypt.compare(password, user.password);
                if(compareResult){
                    done(null, user); //유저 객체 전송
                    return;
                }
                done(null, false, {reason:'올바르지 않은 비밀번호입니다.'});
            }
            catch(err){
                console.error(err);
                done(err);
            }
        })
    )
}

//POST 라우터에서 passport.authenticate() 전략과 함께 실행
    // passport.authenticate('전략', 콜백); // 로컬(passport-local)