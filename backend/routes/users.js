const express = require('express');
const usersRouter = express.Router();
const {getUser, createUser} = require('../controllers/users');

usersRouter.route('/').get(getUser).post(createUser);

module.exports = usersRouter;