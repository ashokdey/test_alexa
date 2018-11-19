const Alexa = require('alexa-sdk');
const alexaRoute = require('express').Router();
const { v1: handlers } = require('../handlers');

alexaRoute.post('/alexa/v1', (req, res) => {
  console.log('Request from alexa ', req.body);
  // Build the context manually, because Amazon Lambda is missing
  const context = {
    succeed(result) {
      console.log(result);
      res.json(result);
    },
    fail(error) {
      console.error(error);
    },
  };
  // Delegate the request to the Alexa SDK and the declared intent-handlers
  const alexa = Alexa.handler(req.body, context);
  alexa.registerHandlers(handlers);
  alexa.appId = process.env.APP_ID;
  alexa.execute();
});

module.exports = alexaRoute;
