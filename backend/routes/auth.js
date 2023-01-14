const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const {signin, signout, kakaoAuth} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/isLogin');
const auth = require('../middleware/auth');
const axios = require('axios');

passportConfig();
authRouter.post('/login', signin);
authRouter.get('/logout', auth, signout);
authRouter.get('/kakao', passport.authenticate('kakao'));
authRouter.get('/kakao/callback', async(req, res) => { //passport.authenticate('kakao', {failureRedirect: '/', session: false}),
  if(req.query.code){
    console.log(req.query.code);
    try{
      const data = await axios.get('https://kauth.kakao.com/oauth/token', {
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_ID,
          redirect_uri: 'http://localhost:3000/auth/kakao/callback',
          code: req.query.code
        }
      });
      return res.send(data);
    }
  catch(err){
    if(err){
      console.log(err);
      return res.send(err);
    }
  }
}
  res.cookie('provider', 'kakao', {httpOnly: true});
  res.cookie('accessToken', req.user.accessToken, {httpOnly: true});
  res.cookie('refreshToken', req.user.refreshToken, {httpOnly: true});
  return res.redirect('http://localhost:3000/');
}); // redirect URI (Access token) [fail, success]

authRouter.get('/test', auth, (req, res) => {
  res.send(req.userId);
})

module.exports = authRouter;