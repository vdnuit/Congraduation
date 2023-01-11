const express = require('express');
const { createMessage, getMessages, getMessagesByUserId, deleteMessage, getMessageByMessageId } = require('../controllers/messages');
const auth = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/isLogin');
const messageRouter = express.Router();

messageRouter.get('/', getMessages);
messageRouter.get('/:userId', auth, getMessagesByUserId);
messageRouter.get('/:userId/:messageId', auth, getMessageByMessageId);
messageRouter.post('/:userId', createMessage);
messageRouter.delete('/:messageId', auth, deleteMessage);

module.exports = messageRouter;