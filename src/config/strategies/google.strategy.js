require('dotenv/config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');

module.exports = function googleStrategy() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/google/callback',
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id}, function (err, user) {
        //     return done(err, user);
        // })
        done(null, profile);
    }
    ));
}