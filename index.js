const server = require('./server');

//Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT);

console.log(`Server Listening at ${PORT}!`);
