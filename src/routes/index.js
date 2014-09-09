var config = require('../config'),
cacheBust = !config.isProduction ? "?cachebust=" + (new Date()).getTime() : "";

/*
 * GET home page.
 */
exports = function(app, services) {

  app.get('/', function(req, res){
    var developmentMode = !config.isProduction;
    res.render('index', { optimize: config.isProduction, reload : developmentMode, cachebust: cachebust});
  });

  var api = require('./api');
  api(app, services);

  app.get('*');

};
