'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	reservations = require('../../app/controllers/reservations');

module.exports = function(app) {
	// reservation Routes
	app.route('/reservations')
		.get(reservations.list)
		.post(users.requiresLogin, reservations.create);

	app.route('/reservations/:reservationId')
		.get(reservations.read)
		.put(users.requiresLogin, reservations.hasAuthorization, reservations.update)
		.delete(users.requiresLogin, reservations.hasAuthorization, reservations.delete);

	// Finish by binding the reservation middleware
	app.param('reservationId', reservations.reservationByID);
};