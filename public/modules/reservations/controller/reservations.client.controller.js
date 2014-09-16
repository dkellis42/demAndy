'use strict';

angular.module('reservations').controller('ReservationsController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'Reservations',
	function($scope, $stateParams, $http, $location, Authentication, Reservations) {
		$scope.authentication = Authentication;

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

		// Submit account id for reservation confirmation
		$scope.submitReservation = function() {
			$scope.success = $scope.error = null;

			$http.post('/reservations/', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

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
	}
]);