const express = require('express');
const { createMessage, getMessages, getMessagesByUserId, deleteMessage, getMessageByMessageId } = require('../controllers/messages');
const jwtAuth = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/isLogin');
const messageRouter = express.Router();

messageRouter.get('/', getMessages);
messageRouter.get('/:userId', jwtAuth, getMessagesByUserId);
messageRouter.get('/:userId/:messageId', jwtAuth, getMessageByMessageId);
messageRouter.post('/:userId', createMessage);
messageRouter.delete('/:messageId', jwtAuth, deleteMessage);

module.exports = messageRouter;