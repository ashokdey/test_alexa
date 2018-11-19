const alexaRootRoute = require('express').Router();
const v1 = require('./alexa-legacy');
const v2 = require('./alexa-latest');

alexaRootRoute.use(v1);
alexaRootRoute.use(v2);

module.exports = alexaRootRoute;
