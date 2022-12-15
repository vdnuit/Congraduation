const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const {kakaoLogout} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/isLogin');
// const {isLoggedIn, isNotLoggedIn} = require('../middleware/isLogin');
passportConfig();
authRouter.route('/kakao').get(passport.authenticate('kakao'));
authRouter.route('/kakao/callback').get(passport.authenticate('kakao', {failureRedirect: '/'}), (req, res) => {res.redirect('/');}); // redirect URI (Access token) [fail, success]

authRouter.use(isLoggedIn);
authRouter.route('/kakao/logout').get(kakaoLogout);

module.exports = authRouter;