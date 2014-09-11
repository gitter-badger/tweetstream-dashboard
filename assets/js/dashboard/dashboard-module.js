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
    },
   all_time = 0;
   dashApi.counter().success(function(item){
      updateModel(item);
      $scope.all_time = 0;
      var eventStream = new EventSource('/api/eventstream');
      eventStream.addEventListener('update', function(model){
        var kvp = JSON.parse(model.data);
        if (kvp.key == "all_time")
          all_time = kvp.value;
        else
          batch[kvp.key] = kvp;
      });
    }).then(function(){
      setInterval(function(){
        if(Object.keys(batch).length > 0) {
          _.chain($scope.model)
           .where(function(item) { return batch[item.key]; })
           .forEach(function(item){ item.value = batch[item.key].value; });
          updateModel($scope.model);
          $scope.all_time = all_time;
          $scope.$digest();
        }
      }, 80);
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
