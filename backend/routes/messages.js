const express = require('express');
const { createMessage, getMessages, getMessagesByUserId } = require('../controllers/messages');
const jwtAuth = require('../middleware/auth');
const messageRouter = express.Router();

messageRouter.get('/', getMessages);
messageRouter.post('/', jwtAuth, createMessage);
messageRouter.route('/:id').get(getMessagesByUserId); // /~~임

module.exports = messageRouter;