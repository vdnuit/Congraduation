const express = require('express');
const userRouter = express.Router();
const {signup, getUser, getUserById, deleteUserById} = require('../controllers/users');
const jwtAuth = require('../middleware/auth');

userRouter.get('/', jwtAuth, getUser);
userRouter.get('/:userId', jwtAuth, getUserById);
userRouter.delete('/:userId', jwtAuth, deleteUserById);
userRouter.route('/signup').post(signup);

module.exports = userRouter;