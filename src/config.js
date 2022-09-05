const mongoStore = require('connect-mongo');
require('dotenv').config();

module.exports = {
    MONGOURI: process.env.MONGO_KEY,
    MONGOSTORE: { secret: 'secret', resave: true, saveUninitialized: true, store: new mongoStore({ mongoUrl: process.env.MONGO_KEY, ttl: 10 * 60, expires: 1000 * 60 * 10, autoRemove: "native" })}
}


