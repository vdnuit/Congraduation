const passport = require('passport');

// const login = async (req, res) => {
//     passport.authenticate('local', (authError, user, info) => { // done()을 통해 인자가 불려옴
//         if(authError){
//             console.error(authError);
//             return next(authError);
//         }
//         if(!user){
//             return res.redirect(`/?loginError${info.message}`);
//         }
//         return req.login(user, (loginError) => {
//             if(loginError){
//                 console.error(loginError);
//                 return next(loginError);
//             }
//             return res.redirect('/'); // 리스폰스를 세션에 넘겨줌
//         });
//     });
// };

const kakaoLogin = () => {
    passport.authenticate('kakao');
}


module.exports = {
    // login,
    kakaoLogin,
};