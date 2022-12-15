const express = require('express');
const userRouter = express.Router();
const {getUser} = require('../controllers/users');

userRouter.route('/').get(getUser);
// userRouter.route('/signup').post(signup);

module.exports = userRouter;