const express = require('express');
const { createMessage, getMessages } = require('../controllers/messages');
const messageRouter = express.Router();

messageRouter.route('/').get(getMessages).post(createMessage);

module.exports = messageRouter;