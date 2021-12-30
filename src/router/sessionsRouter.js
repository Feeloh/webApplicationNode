require('dotenv/config');
const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb');
const speakerService = require('../services/speakerService');

const sessionRouter = express.Router();
sessionRouter.use((req, res, next)=> {
    if(req.user) {
        next();
    } else {
        res.redirect('/auth/signIn');
    }
})

const url = process.env.DATABASEURL;
const dbName = process.env.DBNAME;

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

            const db = client.db(dbName);
            const session = await db.collection('sessions').findOne({ _id: new ObjectID(id) });

            const speaker = await speakerService.getSpeakerById(session.speakers[0].id);

            session.speaker = speaker.data;
            
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