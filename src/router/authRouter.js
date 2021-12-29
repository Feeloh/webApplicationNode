const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();
const url = 'mongodb+srv://philip:Malkia254@globomantics.9lomc.mongodb.net?retryWrites=true&w=majority';
const dbName = 'globomantics';

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

authRouter.route('/profile').get((req, res)=> {
    res.json(req.user);
})

module.exports = authRouter;