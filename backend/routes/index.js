const express = require('express');
const router = express.Router();

router.use('/api/v1/auth', require('./auth'));
router.use('/api/v1/users', require('./users'));
router.use('/api/v1/messages', require('./messages'));

module.exports = router;