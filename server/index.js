const path = require('path');
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 1817;
const app = express();

// Logging
app.use(morgan('dev'));

// Static Assets
app.use(express.static(path.join(__dirname, 'public')));

// Parsing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// APIs
app.use('/api', require('./apis'));

// Send index.html
app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

// 500 Error Handling
app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Something went wrong, but it\'s not your fault.');
  });

app.listen(port, function () {
    console.log(`dutifully listening on port ${port}!`);
  });
