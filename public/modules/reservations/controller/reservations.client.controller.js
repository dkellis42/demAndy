'use strict';

angular.module('reservations').controller('ReservationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reservations',
	function($scope, $stateParams, $location, Authentication, Reservations) {
		$scope.authentication = Authentication;
		console.log($scope.authentication)

		$scope.create = function() {
			console.log($scope.authentication.user.email)
			var reservation = new Reservations({
				popcorn: this.popcorn,
				bowls: this.bowls
			});
			reservation.$save(function(response) {
				$location.path('reservations/' + response._id);
				console.log('you just saved a reservation')
				$scope.popcorn = '';
				$scope.bowls = 1;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(reservation) {
			if (reservation) {
				reservation.$remove();

				for (var i in $scope.reservations) {
					if ($scope.reservations[i] === reservation) {
						$scope.reservations.splice(i, 1);
					}
				}
			} else {
				$scope.reservation.$remove(function() {
					$location.path('reservations');
				});
			}
		};

		$scope.update = function() {
			var reservation = $scope.reservation;

			reservation.$update(function() {
				$location.path('reservations/' + reservation._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.reservations = Reservations.query();
		};

		$scope.findOne = function() {
			$scope.reservation = Reservations.get({
				reservationId: $stateParams.reservationId
			});
		};

		$scope.increment = function(){
		  console.log('increment ran!');
		  $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
		};

		$scope.decrement = function(){
		  $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
		};
	}
]);