'use strict';

/**
 * Module dependencies.
 */
<<<<<<< HEAD
var users = require('../../app/controllers/users'),
	reservations = require('../../app/controllers/reservations');

module.exports = function(app) {
=======

module.exports = function(app) {
	var users = require('../../app/controllers/users'),
		reservations = require('../../app/controllers/reservations');
>>>>>>> b57aa7553dfc422965686a39e4ac730d71eea656
	// reservation Routes
	app.route('/reservations')
		.get(reservations.list)
		.post(users.requiresLogin, reservations.create);

<<<<<<< HEAD
	app.route('/reservations/:reservationId')
		.get(reservations.read)
		.put(users.requiresLogin, reservations.hasAuthorization, reservations.update)
		.delete(users.requiresLogin, reservations.hasAuthorization, reservations.delete);

=======
	//, reservations.requestReservation

	app.route('/reservations/:reservationId')
		.get(reservations.read)
		// .post(reservations.requestReservation)
		.put(users.requiresLogin, reservations.hasAuthorization, reservations.update)
		.delete(users.requiresLogin, reservations.hasAuthorization, reservations.delete);


	// app.route('/reservations/email')
	// 	.post(reservations.requestReservation)



>>>>>>> b57aa7553dfc422965686a39e4ac730d71eea656
	// Finish by binding the reservation middleware
	app.param('reservationId', reservations.reservationByID);
};