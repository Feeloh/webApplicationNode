const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    (username, password, done)=> {
        const url = 'mongodb+srv://philip:Malkia254@globomantics.9lomc.mongodb.net?retryWrites=true&w=majority';
        const dbName = 'globomantics';
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