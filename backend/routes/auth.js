const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const {signin, signout, kakaoAuth, createToken} = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/isLogin');
const auth = require('../middleware/auth');
const axios = require('axios');
const User = require('../models/user');
const Token = require('../models/token');
passportConfig();
authRouter.post('/login', signin);
authRouter.get('/logout', auth, signout);
authRouter.get('/kakao', passport.authenticate('kakao'));
authRouter.get('/kakao/callback', async(req, res) => { //passport.authenticate('kakao', {failureRedirect: '/', session: false}),
  if(req.query.code){
    console.log(req.query.code);
    try{
      const tokenInfo = await axios.get('https://kauth.kakao.com/oauth/token', {
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_ID,
          redirect_uri: 'http://localhost:3000/auth/kakao/callback',
          code: req.query.code
        }
      });
      if(tokenInfo.data.access_token){
        const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${tokenInfo.data.access_token}`,
          }
        })
        if(userInfo.data){
          let exUser = null;
          exUser = await User.findOne({ // find user
            userId: userInfo.data.id, provider: 'kakao'
          });
          if(exUser === null){
            const newUser = await User.create({
              userId: userInfo.data.id,
              nick: userInfo.data.kakao_account.profile.nickname,
              provider: 'kakao',
          });
          const accessToken = createToken('AccessKey', newUser._id, userInfo.data.kakao_account.profile.nickname, user.provider);
          const refreshToken = createToken('RefreshKey');
          Token.create({userId: newUser._id, token: refreshToken, createdAt: new Date(Date.now())});
          return res.json({accessToken: accessToken, refreshToken: refreshToken, provider: 'kakao', userId: userInfo.data.id, nick: userInfo.data.kakao_account.profile.nickname});
          }
          else{
            const accessToken = createToken('AccessKey', exUser._id, exUser.nick, exUser.provider);
            const refreshToken = createToken('RefreshKey');
            Token.create({userId: exUser._id, token: refreshToken, createdAt: new Date(Date.now())});
            return res.json({accessToken: accessToken, refreshToken: refreshToken, provider: 'kakao', userId: exUser.userId, nick: exUser.nick});
          }
        }
        else{
          return res.status(401).json({message: "Unauthorized"});
        }
      }
      return res.status(401).json({message: "Unauthorized"});
    }
  catch(err){
    if(err){
      console.log(err);
      return res.send(err);
    }
  }
}
  // res.cookie('provider', 'kakao', {httpOnly: true});
  // res.cookie('accessToken', req.user.accessToken, {httpOnly: true});
  // res.cookie('refreshToken', req.user.refreshToken, {httpOnly: true});
  // return res.redirect('http://localhost:3000/');
}); // redirect URI (Access token) [fail, success]

authRouter.get('/test', auth, (req, res) => {
  res.send(req.userId);
})

module.exports = authRouter;