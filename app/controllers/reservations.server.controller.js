'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Reservation = mongoose.model('Reservation'),
	nodemailer = require('nodemailer'),
	config = require('../../config/config'),
	crypto = require('crypto'),
	User = mongoose.model('User'),
	async = require('async'),
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
			var transporter = nodemailer.createTransport(config.mailer.options);

			// NB! No need to recreate the transporter object. You can use
			// the same transporter object for all e-mails

			// setup e-mail data with unicode symbols
			var mailOptions = {
					to: 'dkellis42@gmail.com',
					from: 'demandandy@gmail.com',
					subject: 'Reservation Made',
					html: 'YOU HAVE MADE A RESERVATION'
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        console.log(error);
			    }else{
			        console.log('Message sent: ' + info.response);
			    }
			});
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

	console.log(reservation.status)

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
	Reservation.findById(id).populate('user', 'roles').exec(function(err, reservation) {
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
	if (req.user.roles[0] == "admin") {
		return next();
	}

	if (req.reservation.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};