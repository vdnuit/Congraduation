const User = require('../models/user');
const passport = require('passport');
const {ExtractJwt, Strategy: JWTStrategy} = require('passport-jwt');

const cookieExtractor = (req) => {
    const {token} = req.cookies;
    return token;
}

module.exports = () => {
    passport.use(
        'jwt',
        new JWTStrategy({
            // jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.JWTSecret // authorization header로부터 jwt 가져옴, 복호화하기 위한 암호키
        },
        async (jwtPayload, done) => { // 토큰의 페이로드에서 가져온 정보를 갖고 DB 접근하여 유저 찾음
            console.log("JWT!");
            try{
                const user = await User.findOne({_id: jwtPayload.id});
                if(user){
                    return done(null, user);
                }
                done(null, false, {reason: '올바르지 않은 인증 정보입니다.'});
            }
            catch(err){
                console.log(err);
                return done(err);
            }
        }));
}