/**
 * Module dependencies
 */
var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  config = require('./config');

if(config.isProduction){
  require('newrelic');
}

var app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/**
 * Configuration
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static('public'));


var routes = require('./routes/api'),
mongo = require('mongodb'),
redis = require('redis'),
redisConfig = config.redis;


mongo.connect(config.mongoDb, function(err, db){
  if(err) throw err;

  var redisPub = redis.createClient(redisConfig.port, redisConfig.host);
  redisPub.auth(config.redis.auth.pass, function(){
    var redisKvp = redis.createClient(redisConfig.port, redisConfig.host);
    redisKvp.auth(config.redis.auth.pass, function(){
      var services = {
          db: db,
          redis_pub: redisPub,
          redis_kvp: redisKvp
      };
      routes(app, services);
      app.get('*', function(req, res){ res.render('index', config.view_params ); });
    });
  });
});


app.listen(config.port);
console.info('app running in', config.isProduction ? 'production' : 'development' ,'mode');
console.info('A comprehensive listing of vulgar phrases awaits you on port ' + config.port);
