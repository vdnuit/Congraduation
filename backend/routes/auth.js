const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const {signin, signout, kakaoCallback, kakaoLogin} = require('../controllers/auth');
const auth = require('../middleware/auth');
const axios = require('axios');
const User = require('../models/user');
const Token = require('../models/token');

passportConfig();
authRouter.post('/login', signin);
authRouter.get('/logout', auth, signout);
// authRouter.get('/kakao', passport.authenticate('kakao'));
authRouter.get('/kakao', kakaoLogin);
authRouter.get('/kakao/callback', kakaoCallback);

module.exports = authRouter;