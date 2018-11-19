const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4545;

const handlers = require('./lambda');

app.use(bodyParser.json());

// Initialize the Alexa SDK
const Alexa = require('alexa-sdk');

app.get('/', (req, res) => {
  res.jsonp({
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
  alexa.execute();
});

app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`));
