const alexaRoute = require('express').Router();
// Set-Up Alexa Skill and it's handlers
const { v2: skillBuilderInstance } = require('../handlers');

alexaRoute.post('/alexa/v2', function(req, res) {
  skillBuilderInstance
    .invoke(req.body)
    .then(function(responseBody) {
      res.json(responseBody);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send('Error during the request');
    });
});

module.exports = alexaRoute;
