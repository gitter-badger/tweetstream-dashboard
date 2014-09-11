define(['angular', 'lodash'], function(ng, _){
   'use strict';
    var module = ng.module('maps.module', []);

    module.config(['$routeProvider', function($rp){
      $rp.when('/map', {
        controller: 'MapController',
        templateUrl: 'js/maps/tempaltes/maps-view.template'
      });
    }]);


    module.controller('MapController', ['$scope', function($scope){
    }]);


    module.factory('', ['$http', function($http){}]);

    return module;
});
