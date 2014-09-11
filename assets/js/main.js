  require.config({
    urlArgs: (new Date()).getTime(),
    baseUrl: '/js',
    paths:{
      'angular':'lib/angular/angular',
      'angular-route':'lib/angular-route/angular-route',
      'angular-ui':'lib/angular-ui-bootstrap-bower/ui-bootstrap-tpls',
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
      'angular-ui' : ['angular'],
      'dashapp' : ['angular-route', 'angular-maps', 'angular-ui']
    }
  });
  require(['angular', 'dashapp', 'lodash', 'analytics'], function(ng, application, _){
    window._ = _;
    ng.element(document).ready(function(){
      ng.bootstrap(document, [application.name]);
    });
  });

