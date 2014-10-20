var config = require('../config'),
_ = require('lodash');

module.exports = function(app, services){

  var db = services.db,
  counters = db.collection('live_list'),
  redisPubSub = services.redis_pub,
  rediskvp = services.redis_kvp,
  subscribers = [],
  getCounter = function(callback){
    counters.find({ enabled: true }).toArray(function(err, counters){
      var transformedModel = counters.map(function(item){ 
        return { key: item.term, value: item.count };
      });
      callback(transformedModel);
    });
  };

  redisPubSub.on('message', function(channel, message) {
    var key = JSON.parse(message);

    rediskvp.get(key.key, function(err, value){
      subscribers.forEach(function(res){
         res.write('event: update\n');
         res.write('data: ' + "{ \"key\":\"" + key.key + "\", \"value\":\"" + value + "\"}" + ' \n\n');
      });
    });
  });

  redisPubSub.subscribe('update');
  /*
   * Serve JSON to our AngularJS client
   */
  app.get('/api/counter', function (req, res) {
    getCounter(function(model){
      res.json(model);
    });
  });

  /*
   * Serve JSON event stream to our AngularJS client
   */
  app.get('/api/eventstream', function (req, res) {
    req.socket.setTimeout(Infinity);

    /* write head */
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection' : 'keep-alive'
    });
    res.write('\n');

    subscribers.push(res);

    req.on('close', function(){
      subscribers = _.reject(subscribers, function(item) { return item === res; });
    });
  });

  app.get('/api/heartbeat', function(req, res){
    res.json({ 'status': 'up' });
  });
};

