const messages = {
  WELCOME:
    'Welcome to the Sample Alexa Customer Profile API Skill! You can ask for your name, your email address, or your phone number. What do you want to ask?',
  WHAT_DO_YOU_WANT: 'What do you want to ask?',
  NOTIFY_MISSING_PERMISSIONS: 'Please enable Customer Profile permissions in the Amazon Alexa app.',
  NAME_MISSING:
    'You can set your name either in the Alexa app under calling and messaging, or you can set it at Amazon.com, under log-in and security.',
  EMAIL_MISSING: 'You can set your email at Amazon.com, under log-in and security.',
  NUMBER_MISSING: 'You can set your phone number at Amazon.com, under log-in and security.',
  NAME_AVAILABLE: 'Here is your full name: ',
  EMAIL_AVAILABLE: 'Here is your email address: ',
  NUMBER_AVAILABLE: 'Here is your phone number: ',
  ERROR: 'Uh Oh. Looks like something went wrong.',
  API_FAILURE: 'There was an error with the Alexa Customer Profile API. Please try again.',
  GOODBYE: 'Bye! Thanks for using the Sample Alexa Customer Profile API Skill!',
  UNHANDLED: "This skill doesn't support that. Please ask something else.",
  HELP: 'You can use this skill by asking something like: whats my name?',
  STOP: 'Bye! Thanks for using the Sample Alexa Customer Profile API Skill!',
};

const welcomeOutput = 'Welcome to History buff. What day do you want events for?';
const welcomeReprompt = 'which day do you want events for?';
const helpOutput = 'With History Buff, you can get historical events for any day of the year. For example, you could say today, or August thirtieth. Now, which day do you want?';
const helpReprompt = 'which day do you want events for?';
const CONNECTERROR = 'There is a problem connecting to Wikipedia at this time. Please try again later.';
const GODEEPER = 'Wanna go deeper in history?';
const CARDTITLE = 'More events on this day in history';
const MOREREPROMPTTEXT = 'Do you want to know more about what happened on this date?';
const NOMORE = 'There are no more events for this date. Try another date by saying, get events for august thirtieth.';
const HELPREPROMPTTEXT = 'Which day do you want?';
const DIRECTIVESERVICEMESSAGE = 'Please wait while I look up information about';
const DIRECTIVEERRORMESSAGE = 'Cannot enqueue a progressive direcitve.';
const GETEVENTSERRORMESSAGE = 'Cannot get events from wiki, thanks for using the history buff skill';
const GOODBYE = 'Bye! Thanks for using the history buff skill';
const UNHANDLED = "This skill doesn't support that. Please ask something else.";

module.exports = {
  ...messages,
  ...{
    welcomeOutput,
    welcomeReprompt,
    helpOutput,
    helpReprompt,
    CONNECTERROR,
    GODEEPER,
    CARDTITLE,
    MOREREPROMPTTEXT,
    NOMORE,
    HELPREPROMPTTEXT,
    DIRECTIVESERVICEMESSAGE,
    DIRECTIVEERRORMESSAGE,
    GETEVENTSERRORMESSAGE,
    GOODBYE,
    UNHANDLED,
  },
};
