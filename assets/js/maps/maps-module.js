define(['angular', 'lodash'], function(ng, _){
   'use strict';
    var module = ng.module('maps.module', []);

    module.config(['$routeProvider', function($rp){
      $rp.when('/map', {
        controller: 'MapController',
        templateUrl: 'js/maps/templates/map-view.template'
      });
    }]);

    module.controller('MapController', ['$scope', 'tweetApi', function($scope, tweetApi){
      tweetApi.geo().success(function(data){
        $scope.geoData = data;
      });
    }]);

    return module;
});
