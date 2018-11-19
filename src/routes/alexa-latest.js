const alexaRoute = require('express').Router();
// Set-Up Alexa Skill and it's handlers
const skillBuilderInstance = require('../handlers/v2/index');

alexaRoute.post('/alexa/v2', function(req, res) {
  console.table(req.body);
  skillBuilderInstance
    .invoke(req.body)
    .then(function(responseBody) {
      return res.json(responseBody);
    })
    .catch(function(error) {
      console.log(error);
      return res.status(500).send('Error during the request');
    });
});

module.exports = alexaRoute;
