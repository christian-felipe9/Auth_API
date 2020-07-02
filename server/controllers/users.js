const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

const signToken = user => {
	return jwt.sign(
		{
			iss: 'Authentication',
			sub: user.id, //subject of token
			iat: new Date().getTime(), //current time
			exp: new Date().setDate(new Date().getDate() + 1), //expiration time
		},
		JWT_SECRET
	);
};

module.exports = {
	signUp: async (req, res, next) => {
		const { email, password } = req.value.body;

		//Check if there is a user with the same e-mail
		const foundUser = await User.findOne({ 'local.email': email });

		if (foundUser) {
			return res.status(403).json({ error: 'Email is already in use' });
		}

		//Create  a new user
		const newUser = new User({
			method: 'local',
			local: {
				email,
				password,
			},
		});
		await newUser.save();

		// Generate Token
		const token = signToken(newUser);

		//Respond with Token
		res.status(200).json({ token });
	},

	signIn: async (req, res, next) => {
		// Generate Token
		const token = signToken(req.user);

		//Respond with Token
		res.status(200).json({ token });
	},

	signInGoogleOAuth: async (req, res, next) => {
		// Generate Token
		const token = signToken(req.user);

		//Respond with Token
		res.status(200).json({ token });
	},

	secret: async (req, res, next) => {
		console.log('I managed to get here!');
		res.json({ secret: 'resource' });
	},
};
