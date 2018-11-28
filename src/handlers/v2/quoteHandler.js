const Messages = require('../../messages');

function callDirectiveService(handlerInput) {
  // Call Alexa Directive Service.
  const { requestEnvelope } = handlerInput;
  const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();

  const { requestId } = requestEnvelope.request;
  const endpoint = requestEnvelope.context.System.apiEndpoint;
  const token = requestEnvelope.context.System.apiAccessToken;

  // build the progressive response directive
  // build the progressive response directive
  const directive = {
    header: {
      requestId,
    },
    directive: {
      type: 'VoicePlayer.Speak',
      speech: 'Please wait, fetching data',
    },
  };
  // send directive
  return directiveServiceClient.enqueue(directive, endpoint, token);
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const GetFirstEventHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'IntentRequest' && request.intent.name === 'give_quote';
  },
  async handle(handlerInput) {
    console.log('initial second request ==> ', handlerInput.request);

    const { responseBuilder } = handlerInput;

    try {
      await callDirectiveService(handlerInput);
    } catch (err) {
      // if it failed we can continue, just the user will wait longer for first response
      console.log(Messages.DIRECTIVEERRORMESSAGE + err);
      console.error('=====error : ==== ', err);
    }
    try {
      // let's purposely insert a 5 second delay for this demo.
      // shouldn't go longer else Lambda function may time out
      await sleep(5000);
      return (
        responseBuilder
          .speak('Here is response of API call..')
          .reprompt(Messages.MOREREPROMPTTEXT)
          // .withShouldEndSession(false)
          .getResponse()
      );
    } catch (err) {
      console.log(`Error processing events request: ${err}`);
      console.error('=====error final : ==== ', err);
      return responseBuilder.speak(Messages.GETEVENTSERRORMESSAGE).getResponse();
    }
  },
};

module.exports = {
  GetFirstEventHandler,
};
