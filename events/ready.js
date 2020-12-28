const scheduled = require('../scheduled');
const ceremonies = require('../ceremonies');
const utils = require('../utils');
const { initializeModel } = require('../commands/answer');
const { broadcastMessage, resetCheckedIn } = require('./../actions');

const initializeScheduled = async (client) => {
  try {
    const announcementChannel = utils.channel.getChannel(client, 'general');

    scheduled.setupCeremony(announcementChannel, ceremonies.checkIn, broadcastMessage);
    scheduled.setupCeremony(announcementChannel, ceremonies.checkOut, broadcastMessage);
    scheduled.setupCeremony(announcementChannel, ceremonies.greeting, broadcastMessage);

    scheduled.setupActivity(ceremonies.resetCheckedIn, resetCheckedIn);

    console.log(`ceremonies job ready!`);
  } catch (exception) {
    console.log(exception.message)
  }
};

const initializeMachineLearning = async () => {
  await initializeModel();
  console.log('Machine Learning Model Loaded');
};

const onReady = async (client) => {
  await initializeScheduled(client);
  await initializeMachineLearning();
  console.log(`${client.user.tag} Ready!`);
};

module.exports = onReady;
