define(['angular', 'templates', 'dashboard/dashboard-module'], 
function(ng, templates, dashboardModule){
  'use strict';
  var module = ng.module('dashboard-application.module', [ 'ngRoute', 'google-maps', 'ui.bootstrap', 
    dashboardModule.name ]);

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


  return module;
});
