require('dotenv/config');
const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

const url = process.env.DATABASEURL;
const dbName = process.env.DBNAME;

authRouter.route('/signUp').post((req, res)=> {
    const { username, password } = req.body;

    (async function addUser() {
        let client;
        try {
            client = await MongoClient.connect(url);

            const db = client.db(dbName);
            const user = { username, password };
            const results = await db.collection('users').insertOne(user);
            req.login(results.insertedId, ()=> {
                res.redirect('/auth/profile');
            });
        } catch(err) {
            debug(err);
        }
        client.close();
    })();
});

authRouter.route('/signIn').get((req, res)=> {
    res.render('signin');
}).post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureRedirect: '/'
}));

authRouter.route('/google')
    .all(passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.route('/logout').get((req, res)=> {
    req.logout();
    req.session.destroy();
    res.send('Goodbye');
});

authRouter.route('/profile').get((req, res)=> {
    res.json(req.user);
    // res.send(`<a href="/auth/logout">Logout</a>`);
})

module.exports = authRouter;