const express = require('express');
const userRouter = express.Router();
const {signup, getUser, getUserById} = require('../controllers/users');

userRouter.route('/').get(getUser);
userRouter.route('/:id').get(getUserById);
userRouter.route('/signup').post(signup);

module.exports = userRouter;