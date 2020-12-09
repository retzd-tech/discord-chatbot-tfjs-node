const sprintSchedule = (message) => {
  return message.reply(`DSME sprint schedule`)
    .catch(error => message.reply(`Sorry, an error occured.`));
};

module.exports = sprintSchedule;
