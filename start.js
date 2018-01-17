const debug = require('debug')('fdj-backend:server'); // ???
//const http = require('http'); // ???
const helpers = require('./helpers');

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

/**
 * Get port from environment and start our app !
 */
const app = require('./app');
const port = helpers.normalizePort(process.env.PORT || 3001);
app.set('port', port);
const server = app.listen(app.get('port'), () => {
  console.log(`🚅 Express running → PORT ${server.address().port}`);
});


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
