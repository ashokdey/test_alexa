const alexaRootRoute = require('express').Router();
const v2 = require('./alexa-latest');

alexaRootRoute.use(v2);

module.exports = alexaRootRoute;
