const express = require('express');
const userRouter = express.Router();
const {signup, getUserById, deleteUser, getMyInfo} = require('../controllers/users');
const auth = require('../middleware/auth');

userRouter.get('/myInfo', auth, getMyInfo);
userRouter.get('/:userId', auth, getUserById);
userRouter.delete('/:userId', auth, deleteUser);
userRouter.route('/signup').post(signup);

module.exports = userRouter;