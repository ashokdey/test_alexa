const states = {
  SEARCHMODE: '_SEARCHMODE',
  DESCRIPTION: '_DESKMODE'
};

const skillName = 'Test App:';

// Message when the skill is first called
const welcomeMessage =
  'You can ask for the events today. Search for events by date. or say help. What would you like? ';

// Message for help intent
const HelpMessage =
  'Here are some things you can say: Is there an event today? Is there an event on the 18th of July? What are the events next week? Are there any events tomorrow?  What would you like to know?';

const newSessionHandlers = {
  LaunchRequest: function() {
    this.handler.state = states.SEARCHMODE;
    this.emit(':ask', skillName + ' ' + welcomeMessage, welcomeMessage);
  },
  Unhandled: function() {
    this.emit(':ask', HelpMessage, HelpMessage);
  }
};

module.exports = newSessionHandlers;
