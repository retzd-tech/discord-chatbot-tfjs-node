const scheduled = require('../scheduled');
const ceremonies = require('../ceremonies');
const utils = require('../utils');
const { initModel } = require('../commands/answer');

const initializeScheduled = async (client) => {
  try {
    const announcementChannel = utils.channel.getChannel(client, 'general');

    scheduled.setupCeremony(announcementChannel, ceremonies.checkIn);
    scheduled.setupCeremony(announcementChannel, ceremonies.checkOut);
    scheduled.setupCeremony(announcementChannel, ceremonies.greeting);

    console.log(`ceremonies job ready!`);
  } catch (exception) {
    console.log(exception.message)
  }
};

const initializeMLModel = async () => {
  await initModel();
  console.log('Model Loaded');
};

const onReady = async (client) => {
  await initializeScheduled(client);
  await initializeMLModel();
  console.log(`${client.user.tag} Ready!`);
};

module.exports = onReady;
