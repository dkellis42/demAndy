'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
		$stateProvider.
		state('login', {
			url: '/login',
			templateUrl: 'modules/core/views/login.client.view.html'
		});
		$stateProvider.
		state('reserve', {
			url: '/reserve',
			templateUrl: 'modules/core/views/reservation.client.view.html',
			controller: 'ReservationController'
		});
	}
]);