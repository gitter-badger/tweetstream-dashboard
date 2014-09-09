
var redisDriver = require('then-redis'),
mongodb = require('mongodb'),
config = require("./config"),
subscribers = {},
redis = {},
database = {};


module.exports.getCounter = function(callback){};

module.exports.subscribe = function(callback){
  var key = callback.toString();
  subscribers[key] = callback;
  return { id: callback.toString(); };
};

module.exports.unsubscribe = function(handle){
  subscribers[handle.id] = void 0;
};
