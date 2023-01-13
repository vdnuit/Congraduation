const express = require('express');
const userRouter = express.Router();
const {signup, getUser, getUserById, deleteUser} = require('../controllers/users');
const auth = require('../middleware/auth');

userRouter.get('/', auth, getUser);
userRouter.get('/:userId', auth, getUserById);
userRouter.delete('/:userId', auth, deleteUser);
userRouter.route('/signup').post(signup);

module.exports = userRouter;