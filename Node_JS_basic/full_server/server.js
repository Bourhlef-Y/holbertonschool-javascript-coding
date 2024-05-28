import routes from './routes';

const express = require('express');

const app = express();
const port = 1245;

app.use('/', routes);

app.listen(port);
module.exports = app;
