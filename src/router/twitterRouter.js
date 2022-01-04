const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:twittereRouter');

const twittereRouter = express.Router();

twittereRouter.route('/callback')
    .all(passport.authenticate('twitter', {
        failureRedirect: '/',
        successRedirect: '/index'
    }));

module.exports = twittereRouter;