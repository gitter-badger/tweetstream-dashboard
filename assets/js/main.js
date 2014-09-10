(function(require, document){
  'use strict';
  var config = {
    urlArgs: (new Date()).getTime(),
    baseUrl: '/js',
    paths:{
      'angular':'lib/angular/angular',
      'angular-route':'lib/angular-route/angular-route',
      'lodash' : 'lib/lodash/lodash.compat',
      'dashapp' : 'dashboard-application',
    },
    shim: {
      'angular': { 
        exports: 'angular'
      },
      'angular-route' : ['angular'],
      'dashapp' : ['angular-route']
    }
  };

  require(config, ['angular', 'dashapp'], function(ng, application){
    ng.element(document).ready(function(){
      ng.bootstrap(document, [application.name]);
    });
  });

}(requirejs, document));
