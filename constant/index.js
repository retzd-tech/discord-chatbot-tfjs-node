const Constant = {
  BASE_COMMAND : '!dsme',
  COMMANDS : {
    KICK: 'kick',
    SPRINT_SCHEDULE: 'sprint schedule',
    CHECK_IN: 'check in',
    HELLO: 'hello',
    ASK: 'ask',
    TELL: 'tell',
    RANDOM: 'random',
    COME: 'come'
  },
  READ_FILE_STANDARD: 'utf-8',
  CHECK_IN_LOG_DIRECTORY: './data/checkIn.log',
  DATA_DIRECTORY: './data/',
  CHECK_IN_MEMBERS_DIRECTORY: './data/checkedInMembers.log',
  BOT_KNOWLEDGE: './data/bot_knowledge.txt'
};

module.exports = Constant;
