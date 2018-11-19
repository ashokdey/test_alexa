const Alexa = require('alexa-sdk');
const alexaRoute = require('express').Router();
const { v1: handlers } = require('../handlers');

alexaRoute.post('/alexa/v1', function(req, res) {
  console.log('Request from alexa ', req.body);
  // Build the context manually, because Amazon Lambda is missing
  var context = {
    succeed: function(result) {
      console.log(result);
      res.json(result);
    },
    fail: function(error) {
      console.log(error);
    }
  };
  // Delegate the request to the Alexa SDK and the declared intent-handlers
  const alexa = Alexa.handler(req.body, context);
  alexa.registerHandlers(handlers);
  alexa.appId = process.env.APP_ID;
  alexa.execute();
});

module.exports = alexaRoute;
