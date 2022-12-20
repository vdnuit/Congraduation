const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const {signin, kakaoLogout, signout} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/isLogin');
const jwtAuth = require('../middleware/auth');

passportConfig();
authRouter.route('/login').post(signin);
authRouter.route('/logout').get(signout);
authRouter.route('/kakao').get(passport.authenticate('kakao'));
authRouter.route('/kakao/callback').get(passport.authenticate('kakao', {failureRedirect: '/'}), (req, res) => {res.redirect('/');}); // redirect URI (Access token) [fail, success]

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

authRouter.use(isLoggedIn);
authRouter.route('/kakao/logout').get(kakaoLogout);

module.exports = authRouter;