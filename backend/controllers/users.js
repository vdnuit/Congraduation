const User = require('../models/user');
const crypto = require('crypto');

const getUser = async (req, res) => {
    res.send("getting user id");
};

const createUser = async(req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
}

module.exports = {
    getUser,
    createUser,
};