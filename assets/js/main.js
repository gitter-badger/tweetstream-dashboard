  require.config({
    urlArgs: (new Date()).getTime(),
    baseUrl: '/js',
    paths:{
      'angular':'lib/angular/angular',
      'angular-route':'lib/angular-route/angular-route',
      'angular-maps':'lib/angular-google-maps/angular-google-maps',
      'lodash' : 'lib/lodash/lodash.compat',
      'dashapp' : 'dashboard-application',
    },
    shim: {
      'angular': { 
        exports: 'angular'
      },
      'angular-maps': ['angular'],
      'angular-route' : ['angular'],
      'dashapp' : ['angular-route', 'angular-maps']
    }
  });
  require(['angular', 'dashapp', 'analytics'], function(ng, application){
    ng.element(document).ready(function(){
      ng.bootstrap(document, [application.name]);
    });
  });

