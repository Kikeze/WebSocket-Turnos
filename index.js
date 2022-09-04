require("dotenv").config({ path: "vars.env" });

const Server = require('./models/server');


const server = new Server();

server.listen();


