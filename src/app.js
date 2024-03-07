'use struct';

const server = require('./server.js');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

server.start(PORT)