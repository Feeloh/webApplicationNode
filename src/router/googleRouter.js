const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:googleRouter');

const googleRouter = express.Router();

googleRouter.route('/callback')
    .all(passport.authenticate('google', {
        successRedirect: '/index',
        failureRedirect: '/'
    })
)

module.exports = googleRouter;