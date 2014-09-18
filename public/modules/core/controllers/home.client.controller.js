'use strict';


angular.module('core')
  .controller('HomeController', ['$scope', '$animate', 'Authentication',
  	function($scope, $animate, Authentication) {
  		// This provides Authentication context.
  		$scope.authentication = Authentication;
      $scope.roll = function(element){
        $animate.addClass(element, 'roll-add', function(){
          console.log('home added class');
        });
      };
      //$animate.enter('.circle-container', '.container');
  	}
  ])
  .directive('login', function(){
    return {
      templateUrl: 'modules/users/views/authentication/signin.client.view.html',
      restrict: 'E' 
    };
  })
  .directive('reserve', function(){
    return {
      templateUrl: 'modules/reservations/views/create-reservation.client.view.html',
      restrict: 'E',
      controller: 'ReservationsController',
      transclude: true 
    };
  });