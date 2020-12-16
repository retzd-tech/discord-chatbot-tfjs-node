const commands = require("../commands");
const { BASE_COMMAND, COMMANDS } = require("../constant");

const onCommand = (command, message) => {
  return message.content.startsWith(`${BASE_COMMAND} ${command}`)
};

const onMessage = (client, message) => {
  if (onCommand(COMMANDS.HELLO, message)) {
    return commands.hello(message);
  }
  if (onCommand(COMMANDS.KICK, message)) {
    // return commands.kick(message);
  }
  if (onCommand(COMMANDS.SPRINT_SCHEDULE, message)) {
    return commands.sprintSchedule(message);
  }
  if (onCommand(COMMANDS.CHECK_IN, message)) {
    return commands.checkIn(client, message);
  }
  if (onCommand(COMMANDS.ASK, message)) {
    return commands.answer(message);
  }
  if (onCommand(COMMANDS.TELL, message)) {
    return commands.learn(message);
  }
  if (onCommand(COMMANDS.RANDOM, message)) {
    return commands.random(client, message);
  }
  if (onCommand(COMMANDS.COME, message)) {
    // commented due to big syntax change from version 12.0.0 discord js, will do it later
    // return commands.come(client, message);
  }
};

module.exports = onMessage;
