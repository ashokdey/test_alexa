const messages = {
  WELCOME:
    'Welcome to the Sample Alexa Customer Profile API Skill! You can ask for your name, your email address, or your phone number. What do you want to ask?',
  WHAT_DO_YOU_WANT: 'What do you want to ask?',
  NOTIFY_MISSING_PERMISSIONS:
    'Please enable Customer Profile permissions in the Amazon Alexa app.',
  NAME_MISSING:
    'You can set your name either in the Alexa app under calling and messaging, or you can set it at Amazon.com, under log-in and security.',
  EMAIL_MISSING:
    'You can set your email at Amazon.com, under log-in and security.',
  NUMBER_MISSING:
    'You can set your phone number at Amazon.com, under log-in and security.',
  NAME_AVAILABLE: 'Here is your full name: ',
  EMAIL_AVAILABLE: 'Here is your email address: ',
  NUMBER_AVAILABLE: 'Here is your phone number: ',
  ERROR: 'Uh Oh. Looks like something went wrong.',
  API_FAILURE:
    'There was an error with the Alexa Customer Profile API. Please try again.',
  GOODBYE: 'Bye! Thanks for using the Sample Alexa Customer Profile API Skill!',
  UNHANDLED: "This skill doesn't support that. Please ask something else.",
  HELP: 'You can use this skill by asking something like: whats my name?',
  STOP: 'Bye! Thanks for using the Sample Alexa Customer Profile API Skill!'
};

module.exports = messages;
