angular.module('core').
  controller('ReservationController', ['$scope', function($scope) {
    $scope.increment = function(){
      console.log('increment ran!');
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
    };
    $scope.decrement = function(){
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
    };
    $scope.hi = 'Hi!';
}]);