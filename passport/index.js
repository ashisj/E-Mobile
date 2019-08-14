const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const GoogleStratgey = require('./googleStrategy')
const User = require('../api/models/index').User

passport.serializeUser((user, done) => {
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	User.findOne(
		{ _id: id },
		(err, user) => {
			done(null, user)
		}
	)
})

// ==== Register Strategies ====
passport.use(LocalStrategy)
passport.use(GoogleStratgey)

module.exports = passport