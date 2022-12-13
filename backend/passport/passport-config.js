const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy; //객체
const bcrypt = require('bcrypt');
const passport = require('passport');

// 로컬 인증에 필요한 정보
const passportConfig = {usernameField: 'id', passwordField: 'password'}; //form으로 오는 값

// 인증 함수
const passportVerify = async(id, password, done) => { //입력한 아이디, 패스워드
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
}

module.exports = ()=>{
    passport.use('local', new LocalStrategy(passportConfig, passportVerify)); //local에 대한 객체, 인증용 함수
}

//POST 라우터에서 passport.authenticate() 전략과 함께 실행
    // passport.authenticate('전략', 콜백); // 로컬(passport-local)