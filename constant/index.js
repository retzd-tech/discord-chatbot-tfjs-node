const Constant = {
  BASE_COMMAND : '!dsme',
  COMMANDS : {
    KICK: 'kick',
    SPRINT_SCHEDULE: 'sprint schedule',
    CHECK_IN: 'check in',
    RESET_CHECK_IN: 'reset check in',
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
  BOT_KNOWLEDGE: './data/bot_knowledge.txt',
  NEXUS_LOG_URL: 'https://nexus.kismanhong.com/repository/dsme/log/nexusLog.log',
  SIT_URL: 'https://nexus.kismanhong.com/service/rest/repository/browse/dsme/sit/'
};

module.exports = Constant;
