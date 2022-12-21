const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const {signin, kakaoLogout, signout} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/isLogin');
const jwtAuth = require('../middleware/auth');

passportConfig();
authRouter.post('/login', isNotLoggedIn, signin);
authRouter.get('/logout', isLoggedIn, signout);
authRouter.get('/kakao', isNotLoggedIn, passport.authenticate('kakao'));
authRouter.get('/kakao/callback', isNotLoggedIn, passport.authenticate('kakao', {failureRedirect: '/'}), (req, res) => {res.redirect('/');}); // redirect URI (Access token) [fail, success]
authRouter.get('/kakao/logout', isLoggedIn, kakaoLogout); //

authRouter.post('/test', jwtAuth,
	async (req, res, next) => {
	  try {
        console.log("hoho");
        console.log(req);
	    res.json({ result: true });
	  } catch (error) {
        console.log("heh");
	    console.error(error);
	    next(error);
	  }
});

authRouter.get('/isLogin', (req, res) => {
    if(req.isAuthenticated()){
        console.log(req.session);
        res.send("yeah");
    }
    else{
        console.log(req.session);
        res.send("no");
    }
})

module.exports = authRouter;