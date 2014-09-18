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



		// $scope.checkout = function (serviceName) {

		//     // sanity
		//     if (serviceName == null) {
		//         throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
		//     }

		//     // go to work
		//     // var parms = this.checkoutParameters[serviceName];

		//     // if (parms == null) {
		//     //     throw "Cannot get checkout parameters for '" + serviceName + "'.";
		//     // }
		//     switch (serviceName) {
		//         case "PayPal":
		//         	console.log("YOU WORK!!!!!!!!!!!!!!!!!!!!!!")
		//             $scope.checkoutPayPal();
		//             break;
		//         case "Google":
		//             this.checkoutGoogle(parms, clearCart);
		//             break;
		//         case "Stripe":
		//             this.checkoutStripe(parms, clearCart);
		//             break;
		//         default:
		//             throw "Unknown checkout service: " + parms.serviceName;
		//     }
		// };

		// check out using PayPal
		// for details see:
		// www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
		$scope.checkoutPayPal = function () {
		    console.log("fuck")

		//     // global data
		    var data = {
		        cmd: "_xclick",
		        business: 'dkellis42@gmail.com',
		        upload: "1",
		        amount: "10.00",
		        currency_code: "USD"
		    };

		    // build form
		    var form = $('<form/></form>');
		    form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
		    form.attr("method", "POST");
		    form.attr("style", "display:none;");
		    // this.addFormFields(form, parms.options);
		    $("body").append(form);
		    // submit form
		    // this.clearCart = clearCart == null || clearCart;
		    form.submit();
		    form.remove();
		}

		// // check out using Google Wallet
		// // for details see:
		// // developers.google.com/checkout/developer/Google_Checkout_Custom_Cart_How_To_HTML
		// // developers.google.com/checkout/developer/interactive_demo
		$scope.checkoutGoogle = function (parms, clearCart) {

		    // global data
		    // var data = {};

		    // item data
		    // for (var i = 0; i < this.items.length; i++) {
		    //     var item = this.items[i];
		    //     var ctr = i + 1;
		    //     data["item_name_" + ctr] = item.sku;
		    //     data["item_description_" + ctr] = item.name;
		    //     data["item_price_" + ctr] = item.price.toFixed(2);
		    //     data["item_quantity_" + ctr] = item.quantity;
		    //     data["item_merchant_id_" + ctr] = parms.merchantID;
		    // }

		    // build form
		    var form = $('<form/></form>');
		    // NOTE: in production projects, use the checkout.google url below;
		    // for debugging/testing, use the sandbox.google url instead.
		    //form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantID);
		    form.attr("action", "https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/" + 15542752132073639018);
		    form.attr("method", "POST");
		    form.attr("style", "display:none;");
		    // this.addFormFields(form, data);
		    // this.addFormFields(form, parms.options);
		    $("body").append(form);

		    // submit form
		    // this.clearCart = clearCart == null || clearCart;
		    form.submit();
		    form.remove();
		}

		// // check out using Stripe
		// // for details see:
		// // https://stripe.com/docs/checkout
		$scope.checkoutStripe = function () {

		    // global data
		    var $form = $('<form/></form>');
		    $form.attr("method", "POST");
		    $form.attr("action", "/charge");

		    var script = $('<script></script>');

		    $form.append( script );
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