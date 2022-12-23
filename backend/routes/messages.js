const express = require('express');
const { createMessage, getMessages, getMessagesByUserId, deleteMessage } = require('../controllers/messages');
const jwtAuth = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/isLogin');
const messageRouter = express.Router();

messageRouter.get('/', getMessages);
messageRouter.get('/:userId', getMessagesByUserId); // /~~임
messageRouter.post('/:userId', isLoggedIn, createMessage);
messageRouter.delete('/:messageId', isLoggedIn, deleteMessage);

module.exports = messageRouter;