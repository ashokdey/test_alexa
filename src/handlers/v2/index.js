/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('ask-sdk');
// const NameIntentHandler = require('./getNameIntent');
// const {
//   GetNewFactHandler,
//   HelpHandler,
//   ExitHandler,
//   SessionEndedRequestHandler,
//   ErrorHandler,
// } = require('./factHandlers');

const {
  LaunchRequestHandler,
  InProgressGolfTicketBookingHandler,
  CompletedGolfTicketBookingHandler,
  HelpHandler,
  CancelStopHandler,
  SessionEndedHandler,
  ErrorHandler,
} = require('./playGolf');

const skillBuilder = Alexa.SkillBuilders.custom();

module.exports = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    InProgressGolfTicketBookingHandler,
    CompletedGolfTicketBookingHandler,
    HelpHandler,
    CancelStopHandler,
    SessionEndedHandler,
    ErrorHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient()) // for using device information
  .create();
