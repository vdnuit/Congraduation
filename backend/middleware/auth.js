const passport = require("passport");
const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    jwt.verify(req.cookies['token'], process.env.JSON_WEB_TOKEN, (err, decoded) => {
        if(err){
            next(err);
        }
        else{
            console.log(decoded.id);
            req.userObjectId = decoded.id;
            next();
        }
    })
};

module.exports = jwtAuth;