const commands = require("../commands");
const { BASE_COMMAND, COMMANDS } = require("../constant");

const onCommand = (command, message) => {
  return message.content.startsWith(`${BASE_COMMAND} ${command}`)
};

const onMessage = (client, message) => {
  if (onCommand(COMMANDS.KICK, message)) {
    // return commands.kick(message);
  }
  if (onCommand(COMMANDS.SPRINT_SCHEDULE, message)) {
    return commands.sprintSchedule(message);
  }
  if (onCommand(COMMANDS.CHECK_IN, message)) {
    return commands.checkIn(client, message);
  }
  if (onCommand(COMMANDS.HELLO, message)) {
    return message.reply('Hello!');
  }
  if (onCommand(COMMANDS.ASK, message)) {
    return commands.answer(message);
  }
  if (onCommand(COMMANDS.TELL, message)) {
    return commands.learn(message);
  }
};

module.exports = onMessage;
