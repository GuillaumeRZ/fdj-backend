const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errorHandlers = require('./handlers/errorHandlers');

const index = require('./routes/index');
const users = require('./routes/users');

// Create our express app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views')); // folder where we keep our views
app.set('view engine', 'jade');

// Set logger to dev or prod depending on NODE_ENV
app.get('env') === 'development' ?
  app.use(logger('dev')) :
  app.use(logger('prod'));

// Serves up static files from the public folder. Anything in public will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// After allllll that above middleware, we finally handle our own routes!
app.use('/', index);
app.use('/users', users);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
  /* Development Error Handler - Prints stack trace */
  /* Prod one - Just message and error */
app.get('env') === 'development' ?
  app.use(errorHandlers.developmentErrors) :
  app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
