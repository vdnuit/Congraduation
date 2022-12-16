const passport = require('passport');
const {ExtractJwt, Strategy: JWTStrategy} = require('passport-jwt');

module.exports = () => {
    passport.use(
        'jwt',
        new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromHeader('authorization'), secretOrKey: 'jwt-secret-key'
        },
        async (jwtPayload, done) => {
            try{
                const user = await User.findOne({userId: jwtPayload.id});
                if(user)
                    return done(null, user);
                done(null, false, {reason: '올바르지 않은 인증 정보입니다.'});
            }
            catch(err){
                console.log(err);
                return done(err);
            }
        }));
}