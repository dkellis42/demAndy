'use strict';

module.exports = {
	db: 'mongodb://andy:popcorn@kahana.mongohq.com:10055/demAndy_dev',
	app: {
		title: 'demAndy - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1533121546920326',
		clientSecret: process.env.FACEBOOK_SECRET || 'dba2c00922d2b34cc3d712fbbda33cbd',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'qoiWFNr0BOh7PeqI7u5g7URat',
		clientSecret: process.env.TWITTER_SECRET || '1rqlMWHOK2tQrszvKbpB4KX6Zi2zbGZ0hqnttC42JI5hjlqMDo',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '237239153260-5vg8m7llfcocajq1ktqe9dh3f344g0qt.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || '7s7RlIN6VdTxI7rupsYxaijl',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || '75gmcy6qifukhy',
		clientSecret: process.env.LINKEDIN_SECRET || 'xy0FY1gpOHW9804K',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || '6327dbd590ce188f34a9',
		clientSecret: process.env.GITHUB_SECRET || 'cecf3d45432180f445031fa5e9d5bed020505aa8',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};