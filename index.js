require('dotenv').config("vars.env");

const Server = require('./models/server');


const server = new Server();

server.listen();


