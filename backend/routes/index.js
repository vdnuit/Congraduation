const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/api/v1/users', require('./users'));

module.exports = router;