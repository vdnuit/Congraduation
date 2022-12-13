const express = require('express');
const authRouter = express.Router();
const {login} = require('../controllers/auth');

authRouter.route('/').post(login);

module.exports = authRouter;