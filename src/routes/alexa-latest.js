const alexaRoute = require('express').Router();
// Set-Up Alexa Skill and it's handlers
const skillBuilderInstance = require('../handlers/v2/index');

alexaRoute.post('/alexa/v2', (req, res) => {
  console.table(req.body);
  skillBuilderInstance
    .invoke(req.body)
    .then(responseBody => res.json(responseBody))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('Error during the request');
    });
});

module.exports = alexaRoute;
