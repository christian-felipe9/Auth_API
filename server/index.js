const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {
	MONGO_DB_URL_TEST,
	MONGO_DB_URL_DEV,
	MONGO_DB_URL_PRD,
} = require('./configuration');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'test') {
	mongoose.connect(MONGO_DB_URL_TEST, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
} else if (process.env.NODE_ENV === 'dev') {
	mongoose.connect(MONGO_DB_URL_DEV, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
} else if (process.env.NODE_ENV === 'prd') {
	mongoose.connect(MONGO_DB_URL_PRD, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
}

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = express();

//Middlewares
if (!process.env.NODE_ENV === 'test') {
	server.use(morgan('dev'));
}

server.use(bodyParser.json());

//Routes
server.use('/users', require('./routes/users'));

module.exports = server;
