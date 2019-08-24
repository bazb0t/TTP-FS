const path = require('path');
const express = require('express');
const morgan = require('morgan');
const db = require('../db/index');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const port = process.env.PORT || 1817;
const app = express();

// Logging
app.use(morgan('dev'));

// Static Assets
app.use(express.static(path.join(__dirname, '../public')));

// Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sessions MW & Passport
const dbStore = new SequelizeStore({ db: db });
dbStore.sync();
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.Users.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// APIs
app.use('/auth', require('./auth'));
app.use('/api', require('./apis'));

// Send index.html
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 500 Error Handling
app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send(err.message || "Something went wrong, but it's not your fault.");
});

// sync db prior to starting server
db.sync().then(() => {
  app.listen(port, function() {
    console.log(`dutifully listening on port ${port}!`);
  });
});
