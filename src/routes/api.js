var config = require('../config'),
_ = require('lodash');

module.exports = function(app, services){

  var db = services.db,
  counters = db.collection('counter'),
  redisPubSub = services.redis, 
  subscribers = [],
  getCounter = function(callback){
    counters.findOne({ name: config.counter_name }, function(err, model){
      var transformedModel = [];
      for (var key in model.model) {
        transformedModel.push({ key: key, value: model.model[key] });
      }
      callback(transformedModel);
    });
  };

  redisPubSub.on('message', function(channel, message) {
    subscribers.forEach(function(res){
       res.write('event: update\n');
       res.write('data: ' + message + ' \n\n');
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
   * Serve JSON to our AngularJS client
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

};

