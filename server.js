const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { MONGO_DB_URL } = require('./config').dev;

mongoose.connect(MONGO_DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = express();

//Middlewares
server.use(morgan('dev'));
server.use(bodyParser.json());
//Routes
server.use('/users', require('./routes/users'));
//Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT);

console.log(`Server Listening at ${PORT}`);
