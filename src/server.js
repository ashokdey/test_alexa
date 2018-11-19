const express = require('express');
const bodyParser = require('body-parser');

// custom imports
const alexaRoute = require('./routes/alexa');

// declare variables
const PORT = process.env.PORT || 4545;

// Initialize the express app
const app = express();

// inject middlewares
app.use(bodyParser.json());
app.use(alexaRoute);

app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`));
