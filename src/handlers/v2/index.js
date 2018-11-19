/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('ask-sdk');
const NameIntentHandler = require('./getNameIntent');
const {
  GetNewFactHandler,
  HelpHandler,
  ExitHandler,
  SessionEndedRequestHandler,
  ErrorHandler
} = require('./factHandlers');

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
  .withApiClient(new Alexa.DefaultApiClient()) // for using device information
  .create();