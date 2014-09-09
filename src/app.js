
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorHandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  config = require('./config');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = config.environment;

// development only
if (env === 'development') {
  config.app_name += ' dev'
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  require('newrelic');
}


/**
 * init services
 */
var mongoDb = require('mongodb'),
redisDriver = require('then-redis');

mongoDb.connect(config.mongoDb, function(err, db){
  var redisClient = redisDriver.createClient(config.redis);

  var counterProvider = require('./counterProvider')(db, redisClient);

  /**
   * let routes module init
   */
   routes(app, { counterProvider: counterProvider });
});


/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
