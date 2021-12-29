const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb');

const sessionRouter = express.Router();
sessionRouter.use((req, res, next)=> {
    if(req.user) {
        next();
    } else {
        res.redirect('/auth/signIn');
    }
})

const url = 'mongodb+srv://philip:Malkia254@globomantics.9lomc.mongodb.net?retryWrites=true&w=majority';
const dbName = 'globomantics';

sessionRouter.route('/').get((req, res)=> {

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo Db');

            const db = client.db(dbName);
            const sessions = await db.collection('sessions').find().toArray();

            res.render('sessions', {
                sessions
            });

        } catch(err) {
            debug(err.stack);
        }
        client.close();
    }());
})

sessionRouter.route('/:id').get((req, res)=> {
    const id = req.params.id;

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo Db');

            const db = client.db(dbName);
            const session = await db.collection('sessions').findOne({ _id: new ObjectID(id) });
            
            res.render('session', {
                session
            });

        } catch(err) {
            debug(err.stack);
        }
        client.close();
    }());
})

module.exports = sessionRouter;