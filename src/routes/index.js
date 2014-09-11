var config = require('../config'),
    express = require('express');

module.exports.init = function(app, services){
  /*
   * GET json and SSE
   */
  var api = require('./api')(app, services);
};
