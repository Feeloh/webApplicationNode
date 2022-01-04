require('dotenv/config');
const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    (username, password, done)=> {
        const url = process.env.DATABASEURL;
        const dbName = process.env.DBNAME;
        
        (async function validateUser() {
            let client;
            try {
                client = await MongoClient.connect(url);

                const db = client.db(dbName);
                const user = await db.collection('users').findOne({ username });
                
                if(user && user.password) {
                    done(null, user);
                } else {
                    done(null, false);
                }

            } catch(err) {
                done(err, false)
            }
            client.close();
        }());

    }));
}