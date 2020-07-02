const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');

const User = require('./models/user');

const {
	JWT_SECRET,
	GOOGLE_CLIENT_ID_OAUTH,
	GOOGLE_CLIENT_SECRET_OAUTH,
} = require('./configuration');

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
				const user = await User.findOne({ 'local.email': email });

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

//GOOGLE OAUTH STRATEGY
passport.use(
	'googleToken',
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID_OAUTH,
			clientSecret: GOOGLE_CLIENT_SECRET_OAUTH,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				//Check wheter this current user exists in our DB
				const existingUser = await User.findOne({ 'google.id': profile.id });
				if (existingUser) {
					return done(null, existingUser);
				}

				//If new account of google in our database
				const newUser = new User({
					method: 'google',
					google: {
						id: profile.id,
						email: profile.emails[0].value,
					},
				});
				//Save Google Id, e-mail in database
				await newUser.save();
				done(null, newUser);
			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);
