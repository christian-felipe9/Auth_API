const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('./models/user');
const { JWT_SECRET } = require('./config').dev;

//JSON WEB TOKENS STRATEGY
passport.use(
	new jwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
			secretOrKey: JWT_SECRET,
		},
		async (payload, done) => {
			try {
				// Find the user specified in token
				const user = await User.findById(payload.sub);

				// If user doesn't exist, handle it
				if (!user) {
					return done(null, false);
				}

				// Otherwise, return the user
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

//LOCAL STRATEGY
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				//Find the user given the e-mail
				const user = await User.findOne({ email });

				//If doesn't find, handle it
				if (!user) {
					return done(null, false);
				}

				//Check if the password is correct
				const isMatch = await user.isValidPassword(password);

				//If not, handle it
				if (!isMatch) {
					return done(null, false);
				}

				//Otherwise, return the user
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);
