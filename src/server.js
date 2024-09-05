const express = require('express');
const logger = require('morgan');
const debug = require('debug')('app:server');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());

app.use('/public', express.static('public'));
app.use('/api-docs', routes.apiDocs);
app.use('/api', routes.api);

app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ status, message });
});

app.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});
