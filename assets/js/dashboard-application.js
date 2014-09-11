define(['angular', 'templates', 'dashboard/dashboard-module', 'maps/maps-module'], 
function(ng, templates, dashboardModule, mapsModule){
  'use strict';
  var module = ng.module('dashboard-application.module', [ 'ngRoute', 'google-maps', 'ui.bootstrap', 
    dashboardModule.name,
    mapsModule.name 
  ]);

  module.config(['$routeProvider', '$locationProvider', function($rp, $locationProvider){
    $locationProvider.html5Mode(true);
  }]);

  module.run(['templateProvider', function(tp){
  }]);

  module.factory('templateProvider', ['$templateCache', function($tc){
    for (var key in templates) {
      var templateName = key + '.template';
      $tc.put(templateName, templates[key]());
    }

    return templates;
  }]);

  module.factory('tweetApi', ['$http', function($http){
    var exports = {};

    // should come back as [{ key: name, coordinate: { long: 0, lat: 0 } }]
    exports.allGeo = function(){
      return $http.get('/api/tweets/geo');
    };

    /**
     * Gets all the he geo data for on term
     */
    exports.geo = function(term){
      return $http.get('/api/tweets/geo?key=' + term);
    };

    // should somehow get this to be an embedded tweet on our side
    exports.exampleTweets = function(key){
      return $http.get('/api/tweets/example?key=' + key);
    };

    /**
     * Gets all the example tweets
     */
    exports.exampleTweet = function(key){
      return $http.get('/api/tweets/example');
    };

    return exports;
  }]);

  module.factory('dashboardApi', ['$http', function($http){
    var exports = {};

    exports.counter = function(){
      return $http.get('/api/counter');
    };

    exports.eventStream = function(){};

    return exports;
  }]);

  return module;
});
