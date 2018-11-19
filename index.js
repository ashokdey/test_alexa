const express = require('express');
const bodyParser = require('body-parser');
const Alexa = require('alexa-sdk');

// Initialize the express app
const app = express();
app.use(bodyParser.json());
// TODO: alexa-verifier
const PORT = process.env.PORT || 4545;

const handlers = require('./handlers');

console.log('appId: ', process.env.APP_ID);

app.get('/', (req, res) => {
  res.json({
    message: 'Testing alexa app'
  });
});

app.post('/alexa', function(req, res) {
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

app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`));
