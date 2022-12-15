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
            console.log("haha");
            try {
                const exUser = await User.findOne({ // find user
                    where: {userId: profile.id, provider: 'kakao'},
                });
                if (exUser) { // user exist
                    const tokenUser = {
                        user: exUser,
                        accessToken: accessToken || '',
                    }
                    done(null, tokenUser);
                }
                else{ // user not exist
                    const newUser = await User.create({
                        userId: profile.id,
                        nick: profile.displayName,
                        provider: 'kakao',
                    });
                    const tokenUser = {
                        user: newUser,
                        accessToken: accessToken || '',
                    }
                    done(null, tokenUser);
                }
            } catch(err){
                console.log(err);
                done(err);
            };
        },
    ));
};