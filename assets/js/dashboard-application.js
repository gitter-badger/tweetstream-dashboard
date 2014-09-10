define(['angular', 'templates', 'dashboard/dashboard-module'], 
function(ng, templates, dashboardModule){
  'use strict';
  var module = ng.module('dashboard-application.module', [ 'ngRoute', 'google-maps', dashboardModule.name ]);

  module.run(['templateProvider', function(tp){
  }]);

  module.config(['$routeProvider', '$locationProvider', function($rp, $locationProvider){
    $locationProvider.html5Mode(true);
  }]);

  module.factory('templateProvider', ['$templateCache', function($tc){
    for (var key in templates) {
      var templateName = key + '.template';
      $tc.put(templateName, templates[key]());
    }

    return templates;
  }]);


  return module;
});
