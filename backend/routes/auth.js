const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport/index');

passportConfig();
authRouter.route('/kakao').get(passport.authenticate('kakao'));
authRouter.route('/kakao/callback').get(passport.authenticate('kakao', {failureRedirect: '/'}), (req, res) => {res.redirect('/');}); // redirect URI (Access token) [fail, success]

module.exports = authRouter;