const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const {signin, signout, kakaoAuth} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/isLogin');
const jwtAuth = require('../middleware/auth');

passportConfig();
authRouter.post('/login', signin);
authRouter.get('/logout', jwtAuth, signout);
authRouter.get('/kakao', passport.authenticate('kakao'));
authRouter.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/', session: false}), (req, res) => {
  res.cookie('provider', 'kakao', {httpOnly: true});
  res.cookie('accessToken', req.user.accessToken, {httpOnly: true});
  res.cookie('refreshToken', req.user.refreshToken, {httpOnly: true});
  res.redirect('/');
}); // redirect URI (Access token) [fail, success]
authRouter.get('/kakao/token', kakaoAuth);

authRouter.get('/test', jwtAuth, (req, res) => {
  res.send(req.userId);
})

module.exports = authRouter;