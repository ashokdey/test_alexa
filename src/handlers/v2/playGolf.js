// 1. Text strings ================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const welcomeOutput = "It's good time to play golf. Where would you like to play?";
const welcomeReprompt = "Let me know where you'd like to go or when you'd like to book a ticket";
const helpOutput = 'You can demonstrate the delegate directive by saying "let\'s play golf".';
const helpReprompt = "Try saying Let's play golf.";
const golfIntro = [
  'This sounds like a cool play time. ',
  'This will be fun. ',
  'Oh, I like this game plan. ',
];

// Helper Functions ============================================================================

function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const { name } = filledSlots[item];

    if (
      filledSlots[item]
      && filledSlots[item].resolutions
      && filledSlots[item].resolutions.resolutionsPerAuthority[0]
      && filledSlots[item].resolutions.resolutionsPerAuthority[0].status
      && filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code
    ) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            isValidated: true,
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false,
      };
    }
  }, this);

  return slotValues;
}

function getRandomPhrase(array) {
  // the argument is an array [] of words or phrases
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

// 1. Intent Handlers =============================================

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const { responseBuilder } = handlerInput;
    return responseBuilder
      .speak(welcomeOutput)
      .reprompt(welcomeReprompt)
      .getResponse();
  },
};

const InProgressGolfTicketBookingHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest'
      && request.intent.name === 'book_ticket'
      && request.dialogState !== 'COMPLETED'
    );
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    return handlerInput.responseBuilder.addDelegateDirective(currentIntent).getResponse();
  },
};

const CompletedGolfTicketBookingHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'IntentRequest' && request.intent.name === 'book_ticket';
  },
  handle(handlerInput) {
    console.log('Plan My Golf - handle');

    const { responseBuilder } = handlerInput;
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
    const slotValues = getSlotValues(filledSlots);

    // compose speechOutput that simply reads all the collected slot values
    let speechOutput = getRandomPhrase(golfIntro);

    console.log('Speech output ---------------> 1', speechOutput);

    // activity is optional so we'll add it to the output
    // only when we have a valid activity
    if (slotValues.numberOfHoles.value) {
      speechOutput += slotValues.numberOfHoles.synonym;
    } else {
      speechOutput += "You'll go ";
    }

    console.log('Speech output --------------->2', speechOutput);

    // Now let's recap the trip
    speechOutput = `${speechOutput} for golf on ${slotValues.playTime.synonym} at ${
      slotValues.place.synonym
    } with ${slotValues.numberOfPlayers.synonym}`;

    if (slotValues.numberOfHoles.value) {
      speechOutput += ` and field type has ${slotValues.numberOfHoles.synonym} holes.`;
    }

    console.log('Speech output --------------->3', speechOutput);

    return responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(helpOutput)
      .reprompt(helpReprompt)
      .getResponse();
  },
};

const CancelStopHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const { responseBuilder } = handlerInput;
    const speechOutput = 'Okay, talk to you later! ';

    return responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const { request } = handlerInput.requestEnvelope;

    console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);
    console.log(`Error handled: ${error}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can not understand the command.  Please say again.')
      .reprompt('Sorry, I can not understand the command.  Please say again.')
      .getResponse();
  },
};

module.exports = {
  LaunchRequestHandler,
  InProgressGolfTicketBookingHandler,
  CompletedGolfTicketBookingHandler,
  HelpHandler,
  CancelStopHandler,
  SessionEndedHandler,
  ErrorHandler,
};
