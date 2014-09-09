
module.exports = function(app, services){
  app.get('api/counter', function(req, res){
    services.getCounter(function(counterModel){
      req.json(counterModel);
    });
  });

  app.get('api/updates', function (req, res) {

    var handle = services.subscribe(function(kvp){
      res.write("data: " + kvp + "\n\n");
    });

    req.on('close', function(){
      services.unsubscribe(handle);
    });
  });
};

