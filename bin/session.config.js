const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const sessionTime = 60 * 60 * 24 * 1000;
// vamos a utilizar este middleware en app.js,por lo tanto lo tenemos que exportar
module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: sessionTime }, // 8 horas...
      store: new MongoStore({
        // <== ADDED !!!
        mongooseConnection: mongoose.connection,
        // ttl => time to live
        ttl: sessionTime// 60sec * 60min * 24h => 1 day
      })
    })
  );
};