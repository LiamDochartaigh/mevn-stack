const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const userService = require('../services/userService');

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access-token'];
    }
    return token;
};

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
},
    async function (jwt_payload, done) {
        try {
            const user = await userService.GetUser(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }
));

module.exports = passport;