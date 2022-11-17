const User = require('../models/user');
const crypto = require('crypto');

const getUser = async (req, res) => {
    res.send("getting user id");
};

const createUser = async(req, res) => {
    const pw = req.body.pw;
    const hashedPassword = crypto.createHash("sha512").update(pw).digest("base64"); //해시알고리즘, 업데이트할 패스워드, 인코딩 방식
    req.body.pw=hashedPassword;
    const user = await User.create(req.body);
    res.status(201).json(user);
}

module.exports = {
    getUser,
    createUser,
};