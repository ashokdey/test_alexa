const express = require('express');
const bodyParser = require('body-parser');

// custom imports
const alexaRoutes = require('./routes');

// declare variables
const PORT = process.env.PORT || 4545;

// Initialize the express app
const app = express();

// inject middlewares
app.use(bodyParser.json());
app.use(alexaRoutes);
// TODO: add alexa-verify middleware (was skipped for local postman development)

// define root route
app.get('/', (req, res) => {
  res.json({
    message: 'Testing alexa app',
  });
});

app.listen(PORT, () => console.info(`app running at http://localhost:${PORT}`));
