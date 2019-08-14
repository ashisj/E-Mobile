const GoogleStrategy = require('passport-google-token').Strategy
const User = require('../api/models/index').User

const strategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    function(token, tokenSecret, profile, done) {
		const { id, photos, picture } = profile
        
        User.findOne({ 'google.googleId': id }, (err, userMatch) => {
			if (err) {
				return done(null, false)
			}
			// if there is already someone with that googleId
			if (userMatch) {
				return done(null, userMatch)
			} else {
				// if no user in our db, create a new user with that googleId
				const newGoogleUser = new User({
					'google.googleId': id,
					'google.token': token,
					'google.email': profile.emails[0].value,
					name: profile.displayName,
					photos: picture
				})
				// save this user
				newGoogleUser.save((err, savedUser) => {
					if (err) {
						return done(null, false)
					} else {
						return done(null, savedUser)
					}
				})
			}
        })
        
    }
)

module.exports = strategy