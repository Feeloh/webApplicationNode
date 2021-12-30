require('dotenv/config');
const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res)=> {
    const url = process.env.DATABASEURL;
    const dbName = process.env.DBNAME;

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo Db');

            const db = client.db(dbName);
            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);

        } catch(err) {
            debug(err.stack);
        }
        client.close();
    }());
})

module.exports = adminRouter;