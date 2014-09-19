'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Reservation Schema
 */
var ReservationSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	popcorn: {
		type: String,
		default: '',
		trim: true,
		required: 'Popcorn must be specified'
	},
	bowls: {
		type: Number,
		// default: 1,
		required: 'Number of bowls must be specified'
	},
	status: {
		type: String,
		default: 'pending',
		trim: true
	},
	name: {
		first: {
			type: String,
			trim: true
		},
		last: {
			type: String,
			trim: true
		}
	},
	address: {
		street: {
			type: String,
			trim: true
		},
		city: {
			type: String,
			trim: true
		},
		state: {
			type: String,
			trim: true
		}
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Reservation', ReservationSchema);