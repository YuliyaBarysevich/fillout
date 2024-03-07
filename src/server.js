'use strict';

const express = require('express');
const app = express();

app.use(express.json())

const formRoute = require('./routes/index.js');
const notFoundError = require('./error-handlers/404');

app.use(formRoute);
app.use('*', notFoundError)


module.exports ={
    server: app,
    start: port => {
      app.listen(port, () => console.log(`server is up on http://localhost:${port}/`));
    }
}