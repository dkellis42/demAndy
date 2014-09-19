'use strict';

// Setting up route
angular.module('reservations').config(['$stateProvider',
	function($stateProvider) {
		// reservations state routing
		$stateProvider.
		state('listReservations', {
			url: '/reservations',
			templateUrl: 'modules/reservations/views/list-reservations.client.view.html'
		}).
		state('createReservation', {
			url: '/reservations/create',
			templateUrl: 'modules/reservations/views/create-reservation.client.view.html',
			controller: 'ReservationsController'
		}).
		state('viewReservation', {
			url: '/reservations/:reservationId',
			templateUrl: 'modules/reservations/views/view-reservation.client.view.html'
		}).
		state('payReservation', {
			url: '/reservations/:reservationId/pay',
			templateUrl: 'modules/reservations/views/pay-reservation.client.view.html'
		}).
		state('updateReservation', {
			url: '/reservations/:reservationId/edit',
			templateUrl: 'modules/reservations/views/update-reservation.client.view.html'
		}).
		state('successfulUpdate', {
			url: '/reservations/:reservationId/edit/success',
			templateUrl: 'modules/reservations/views/update-success.client.view.html'
		});
	}
]);