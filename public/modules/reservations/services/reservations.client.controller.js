'use strict';

//reservations service used for communicating with the reservations REST endpoints
angular.module('reservations').factory('Reservations', ['$resource',
	function($resource) {
		return $resource('reservations/:reservationId', {
			reservationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);