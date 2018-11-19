const states = {
  SEARCHMODE: '_SEARCHMODE',
  DESCRIPTION: '_DESKMODE'
};

const skillName = 'Test App:';

// Message when the skill is first called
const welcomeMessage = 'You can ask for the facts today. ';

// Message for help intent
const HelpMessage = `Here are some things you can say: 
    Tell me a fact,
    Tell me a space fact,
    Give me a fact,
    Give me a space fact,
    Tell me trivia,
  `;

const newSessionHandlers = {
  LaunchRequest() {
    this.handler.state = states.SEARCHMODE;
    this.emit(':ask', skillName + ' ' + welcomeMessage, welcomeMessage);
  },
  Unhandled() {
    this.emit(':tell', HelpMessage, HelpMessage);
  }
};

module.exports = newSessionHandlers;
