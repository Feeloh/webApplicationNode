require('dotenv/config');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

module.exports = function twitterStrategy() {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: 'http://localhost:4000/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        // User.findOrCreate({ googleId: profile.id}, function (err, user) {
        //     return done(err, user);
        // })
        done(null, profile);
    }
    ));
}