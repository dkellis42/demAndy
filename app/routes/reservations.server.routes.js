'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	var users = require('../../app/controllers/users'),
		reservations = require('../../app/controllers/reservations');
	// reservation Routes
	app.route('/reservations')
		.get(reservations.list)
		.post(users.requiresLogin, reservations.create);

	//, reservations.requestReservation

	app.route('/reservations/:reservationId')
		.get(reservations.read)
		// .post(reservations.requestReservation)
		.put(users.requiresLogin, reservations.hasAuthorization, reservations.update)
		.delete(users.requiresLogin, reservations.hasAuthorization, reservations.delete);


	// app.route('/reservations/email')
	// 	.post(reservations.requestReservation)



	// Finish by binding the reservation middleware
	app.param('reservationId', reservations.reservationByID);
};