const passport = require("passport");

const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', {session: false}) // session true 하면 req.login() => serializeUser 단계를 거침
    next();
}

module.exports = jwtAuth;