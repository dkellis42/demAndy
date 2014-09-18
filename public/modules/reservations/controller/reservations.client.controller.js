'use strict';

angular.module('reservations').controller('ReservationsController', ['$scope', '$stateParams', '$http', '$location', '$animate', 'Authentication', 'Reservations',
	function($scope, $stateParams, $http, $location, $animate, Authentication, Reservations) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			console.log("YOU CALLED ME?");

			var reservation = new Reservations({
				popcorn: this.popcorn,
				bowls: this.bowls
			});
			reservation.$save(function(response) {
				$location.path('reservations/' + response._id);
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
		$scope.pop = function(){
      $('input[name="pop-type"]').parent().find('img').attr('src', 'modules/core/img/kernel.png');
      var $img = $('input:checked').parent().find('img')
      $img.attr('src', $img.attr('data-alt-src'));
    };
    $scope.roll = function(element){
      $animate.addClass(element, 'roll-add', function(){
        console.log('added class');
      });
    };
    $scope.submitForm = function(){
    	$('#reserve.submit').click();
    	console.log('submitted');
    	$scope.create();
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


		$scope.stripeIt = function () {
			  var handler = StripeCheckout.configure({
			    key: 'pk_test_IDokFv8Q9yQIRx0HQ5FweDf3',
			    image: '',
			    token: function(token) {
			      // Use the token to create the charge with a server-side script.
			      // You can access the token ID with `token.id`
			    }
			  });

			  document.getElementById('customButton').addEventListener('click', function(e) {
			    // Open Checkout with further options
			    handler.open({
			      name: 'demAndy',
			      description: $scope.reservation.bowls + " bowls of " + $scope.reservation.popcorn,
			      amount: $scope.reservation.bowls * 999
			    });
			    e.preventDefault();
			  });


		};
	}
]);