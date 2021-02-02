const scheduled = require('../scheduled');
const cronSetting = require('../cronSetting');
const utils = require('../utils');
const { initializeModel } = require('../commands/answer');
const { broadcastMessage, resetCheckedIn } = require('./../actions');

const initializeScheduled = async (client) => {
  try {
    const announcementChannel = utils.channel.getChannel(client, 'general');
    const releaseChannel = utils.channel.getChannel(client, 'frontend-release');

    scheduled.setupCeremony(announcementChannel, cronSetting.checkIn, broadcastMessage);
    scheduled.setupCeremony(announcementChannel, cronSetting.checkOut, broadcastMessage);
    scheduled.setupCeremony(announcementChannel, cronSetting.greeting, broadcastMessage);

    scheduled.setupActivity(cronSetting.resetCheckedIn, resetCheckedIn);
    scheduled.checkNexus(releaseChannel, cronSetting.checkNexus);

    console.log(`CronJob job ready!`);
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
  // await initializeMachineLearning();
  console.log(`${client.user.tag} Ready!`);
};

module.exports = onReady;
