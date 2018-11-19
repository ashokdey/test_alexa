const express = require('express');
const bodyParser = require('body-parser');
const Alexa = require('ask-sdk');

const PORT = process.env.PORT || 4545;
// Initialize the express app
const app = express();

// Set-Up Alexa Skill and it's handlers
const lambdaHandlers = require('./lambda');
// const skill = Alexa.SkillBuilders.custom()
//   .addRequestHandlers(lambdaHandlers)
//   .create();
const skill = lambdaHandlers;

app.use(bodyParser.json());

app.post('/alexa/v2', function(req, res) {
  skill
    .invoke(req.body)
    .then(function(responseBody) {
      res.json(responseBody);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send('Error during the request');
    });
});

app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`));
