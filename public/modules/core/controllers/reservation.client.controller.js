angular.module('core').
  controller('ReservationController', ['$scope', function($scope) {
    $scope.increment = function(){
      console.log('increment ran!');
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
    };
    $scope.decrement = function(){
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
    };
    $scope.pop = function(){
      $('input[name="pop-type"]').parent().find('img').attr('src', 'modules/core/img/kernel.png');
      $img = $('input:checked').parent().find('img')
      $img.attr('src', $img.attr('data-alt-src'));
    };
    $scope.hi = 'Hi!';
}]);