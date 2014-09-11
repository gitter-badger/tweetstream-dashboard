define(['angular', 'lodash'], function(ng, _){
  'use strict';
  var module = ng.module('dashboard.module', []);

  module.config(['$routeProvider', function($rp){
    $rp.when('/', {
      controller: 'DashboardController',
      templateUrl: 'js/dashboard/templates/index.template'
    });
  }]);

  module.controller('DashboardController', ['$scope', 'dashboardApi', function($scope, dashApi){
    var batch = {},
    updateModel = function(items){
      $scope.model = _.sortBy(items, function(element) { return -element.value; });
    };

    dashApi.counter().success(function(item){
      updateModel(item);
      var eventStream = new EventSource('/api/eventstream');
      eventStream.addEventListener('update', function(model){
        var kvp = JSON.parse(model.data);
        batch[kvp.key] = kvp;
      });
    }).then(function(){
      setInterval(function(){
        if(Object.keys(batch).length > 0) {

          _.chain($scope.model)
           .where(function(item) { return batch[item.key]; })
           .forEach(function(item){ item.value = batch[item.key].value; })
           .value();

          updateModel($scope.model);
          $scope.$digest();
        }
      }, 16);
    });
  }]);

  module.directive('termCounter', [function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'js/dashboard/templates/term-counter.template',
      scope: { model: '=' }
    };
  }]);

  return module;
});
