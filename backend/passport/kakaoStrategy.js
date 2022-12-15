const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(
        new KakaoStrategy({ // (1) Strategy
            clientID: process.env.KAKAO_ID, // REST API Key
            callbackURL: "/auth/kakao/callback", // Redirect URI
        },
        async (accessToken, refreshToken, profile, done) => { // (2) Verify Function, proceed after accessing redirect URI
            try {
                const exUser = await User.findOne({ // find user
                    where: {snsId: profile.id, provider: 'kakao'},
                });
                if (exUser) { // user exist
                    done(null, exUser);
                }
                else{ // user not exist
                    const newUser = await User.create({
                        nick: profile.displayName,
                        snsId: profile.id,
                        provider: 'kakao',
                    });
                    done(null, exUser);
                }
            } catch(err){
                console.log(err);
                done(err);
            };
        },
    ));
};