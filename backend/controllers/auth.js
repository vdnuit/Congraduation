const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');

// 로컬 유저 로그인
const signin = (req, res, next) => {
    try{
        passport.authenticate('local', (authError, user, info) => { // done()을 통해 인자가 불려옴
            if(authError){
                console.error(authError);
                return next(authError);
            }
            if(!user){
                return res.redirect(`/?loginError${info.message}`);
            }
            req.login(user, (loginError) => {
                if(loginError){
                    console.error(loginError);
                    return next(loginError);
                }
                // const token = jwt.sign({id: user._id}, process.env.JSON_WEB_TOKEN);
                // console.log(token);
                // res.cookie("token", token, {httpOnly: true}).json({message: "token!"});
                res.redirect('/');
            });
        })(req,res,next); //?
    }
    catch(err){
        console.log(err);
        next(err);
    }
};

const signout = async (req, res) => {
    try{
        if(req.user.user.id && req.user.user.provider == 'local'){
            req.session.destroy((err) => {
                if(err) console.log(err);
                res.redirect('/');
            });
        }
        else if(req.user.user.id && req.user.user.provider == 'kakao'){
            try {
                const ACCESS_TOKEN = req.user.accessToken;
                let logout = await axios({
                    method:'post',
                    url:'https://kapi.kakao.com/v1/user/unlink',
                    headers:{
                      'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                });
                req.session.destroy((err) => {
                    if(err) console.log(err);
                    res.redirect('/');
                });
            }
            catch(err){
                console.log(err);
                res.json(err);
            }
            req.session.destroy();
            res.redirect('/');
        }
    }
    catch(err){
        console.log(err);
        res.send({error: err});
    }
};

// const kakaoLogout = async (req, res) => {
//     try {
//         console.log(req.user);
//         const ACCESS_TOKEN = req.user.accessToken;
//         console.log("This is access token: ");
//         console.log(ACCESS_TOKEN);
//         let logout = await axios({
//             method:'post',
//             url:'https://kapi.kakao.com/v1/user/unlink',
//             headers:{
//               'Authorization': `Bearer ${ACCESS_TOKEN}`
//             }
//           });
//     }
//     catch(err){
//         console.log(err);
//         res.json(err);
//     }
//     req.session.destroy();
//     console.log("LOGOUT!!");
//     res.redirect('/');
// }

module.exports = {
    signin,
    signout,
};