module.exports = {
  app_name : 'tweet stream dashboard',
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoDb: process.env.MONGOHQ_URL,
  redis: process.env.REDISCLOUD_URL,
  new_relic_license_key : 'dbfe171960e800ab83f8cc7e2e308b772d442379'
};
