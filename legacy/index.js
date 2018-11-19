const express = require('express');
const bodyParser = require('body-parser');

// Initialize the express app
const app = express();
app.use(bodyParser.json());
// TODO: alexa-verifier
const PORT = process.env.PORT || 4545;

const handlers = require('./handlers');

console.log('appId: ', process.env.APP_ID);

app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`));
