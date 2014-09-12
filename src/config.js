
var environment = process.env.NODE_ENV || "development",
    isProduction = environment === "production",
    appName = 'tweet stream dashboard' + (isProduction ? '' : ' development'),
    url = require('url'),
    redisString = url.parse(process.env.REDISCLOUD_URL) || "",
    auth = redisString.auth.split(':') || ['', ''];

module.exports = {
  app_name : appName,
  isProduction: isProduction,
  environment: environment,
  port: process.env.PORT || 3001,
  mongoDb: process.env.MONGOHQ_URL || "",
  redis: {
    port: redisString.port,
    host: redisString.hostname,
    auth: {
      username: auth[0],
      pass: auth[1] 
    }
  },
  new_relic_license_key : process.env['NEW_RELIC_LICENSE_KEY'],
  counter_name: 'live_counter',
  view_params: { 
    optimize: isProduction,
    cachebust: "?bust=" + (new Date()).getTime(),
    reload : !isProduction
  }
};
