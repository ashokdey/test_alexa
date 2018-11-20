const messages = require('../../messages');
const PERMISSIONS = require('../../permissions');

const NameIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'NameIntent';
  },
  async handle(handlerInput) {
    // console.log('----------------HandlerInput-----------------------');
    // console.log(handlerInput);
    // console.log('---------------------------------------');
    const { requestEnvelope, serviceClientFactory, responseBuilder } = handlerInput;

    const consentToken = requestEnvelope.context.System.apiAccessToken;
    if (!consentToken) {
      return responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(PERMISSIONS)
        .getResponse();
    }
    try {
      const client = serviceClientFactory.getUpsServiceClient();
      const name = await client.getProfileName();

      console.log('Name successfully retrieved, now responding to user.');

      let response;
      if (name == null) {
        response = responseBuilder.speak(messages.NAME_MISSING).getResponse();
      } else {
        response = responseBuilder
          .speak(messages.NAME_AVAILABLE + name)
          .withShouldEndSession(false)
          .getResponse();
      }
      return response;
    } catch (error) {
      console.error(error);
      if (error.name !== 'ServiceError') {
        const response = responseBuilder.speak(messages.ERROR).getResponse();
        return response;
      }
      throw error;
    }
  },
};

module.exports = NameIntent;
