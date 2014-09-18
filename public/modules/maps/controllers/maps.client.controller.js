'use strict';

angular.module('app.ui-maps', ['$scope', 'ui-maps', 
    function ($scope){
      $scope.map = function() {
        angular.bootstrap(document.getElementById("map"), ['app.ui-map']);
      };
  }
]);