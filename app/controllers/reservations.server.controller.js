'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Reservation = mongoose.model('Reservation'),
	_ = require('lodash');

/**
 * Create a reservation
 */
exports.create = function(req, res) {
	var reservation = new Reservation(req.body);
	reservation.user = req.user;

	reservation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reservation);
		}
	});
};

/**
 * Show the current reservation
 */
exports.read = function(req, res) {
	res.jsonp(req.reservation);
};

/**
 * Update a reservation
 */
exports.update = function(req, res) {
	var reservation = req.reservation;

	reservation = _.extend(reservation, req.body);

	reservation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reservation);
		}
	});
};

/**
 * Delete a reservation
 */
exports.delete = function(req, res) {
	var reservation = req.reservation;

	reservation.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reservation);
		}
	});
};

/**
 * List of reservations
 */
exports.list = function(req, res) {
	Reservation.find().sort('-created').populate('user', 'displayName').exec(function(err, reservations) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reservations);
		}
	});
};

/**
 * reservation middleware
 */
exports.reservationByID = function(req, res, next, id) {
	Reservation.findById(id).populate('user', 'displayName').exec(function(err, reservation) {
		if (err) return next(err);
		if (!reservation) return next(new Error('Failed to load reservation ' + id));
		req.reservation = reservation;
		next();
	});
};

/**
 * reservation authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.reservation.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};