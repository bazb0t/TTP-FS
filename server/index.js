const path = require('path');
const express = require('express');
const morgan = require('morgan');
const db = require('../db/index');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const PORT = process.env.PORT || 1817;
const app = express();
const dbStore = new SequelizeStore({ db });

// Passport Registration
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.Users.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  // Logging
  app.use(morgan('dev'));

  // Parsing
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Sessions MW & Passport
  dbStore.sync();
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: dbStore,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // APIs
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // Static Assets
  app.use(express.static(path.join(__dirname, '../public')));

  // 404 requests w extension
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // Send index.html
  app.use('*', (req, res) => {
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
};

const startListening = () => {
  app.listen(PORT, () => console.log(`Dutifully listening on port ${PORT}!`));
};

const syncDb = () => db.sync();

async function bootApp() {
  await dbStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

// sync db prior to starting server
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
