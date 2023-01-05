const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const {signin, signout} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/isLogin');
const jwtAuth = require('../middleware/auth');

passportConfig();
authRouter.post('/login', signin);
authRouter.get('/logout', signout);
authRouter.get('/kakao', isNotLoggedIn, passport.authenticate('kakao'));
authRouter.get('/kakao/callback', isNotLoggedIn, passport.authenticate('kakao', {failureRedirect: '/'}), (req, res) => { res.redirect('/');}); // redirect URI (Access token) [fail, success]

authRouter.get('/test', jwtAuth, (req, res) => {
  res.send(req.userId);
})

module.exports = authRouter;