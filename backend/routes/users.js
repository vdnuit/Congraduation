const express = require('express');
const userRouter = express.Router();
const {signup, getUser, getUserById, deleteUserById} = require('../controllers/users');

userRouter.route('/').get(getUser);
userRouter.route('/:userId').get(getUserById).delete(deleteUserById);
userRouter.route('/signup').post(signup);

module.exports = userRouter;