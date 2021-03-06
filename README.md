# REST API implementation for Alexa Skill

The RESPT API implementation contains both the v1 (`alexa-sdk`) and v2 (`ask-sdk`).

## Migrate from AWS-Lambda to REST

If you already have a `aws-lambda` code and you want to migrate it to your own express/etc server implementation then simply have a look into the following files:

- `src/handlers/v2handlers.js`
- `src/routes/alexa-v2-latest.js`

Basically, you have to remove `.lambda()` with `.create()` inside `handlers(containg your aws-lambda code)` and inside the route, you can invoke the `skillBuilderInstance` imported from `/handlers` with the `req.body`. Have a look at the code snippet

### Instance of Alexa skill builder

```javascript
const Alexa = require('ask-sdk');
// import handlers
const skillBuilder = Alexa.SkillBuilders.custom();

module.exports = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
    NameIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .create();
```

### Sample request handler

```javascript
const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'LaunchRequest' ||
      (request.type === 'IntentRequest' &&
        request.intent.name === 'GetNewFactIntent')
    );
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = LAUNCH_MESSAGE;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  }
};
```

### Notes:

- By default, `ask-sdk` ends the session after you send response hence to avoid this add `.withShouldEndSession(false)` in the response chain [here](#Sample-request-handler)

- If you want to use 3rd party services, add `.withApiClient(new Alexa.DefaultApiClient())` in the instance building chain for Alexa skill builder [here](#Instance-of-Alexa-skill-builder)

### Inside the route

```javascript
const alexaRoute = require('express').Router();
// Set-Up Alexa Skill and it's handlers
const skillBuilderInstance = require('../handlers/v2/index');

alexaRoute.post('/alexa/v2', (req, res) => {
  console.table(req.body);
  skillBuilderInstance
    .invoke(req.body)
    .then(responseBody => res.json(responseBody))
    .catch(error => {
      console.error(error);
      return res.status(500).send('Error during the request');
    });
});

module.exports = alexaRoute;
```

## Repo Structure

- **src** : contains all the code
  - **handlers** : contains the event/intent handlers for your Alexa skill
  - **routes** : contains the routes for the app

**src/server.js** is the entry point for the application
