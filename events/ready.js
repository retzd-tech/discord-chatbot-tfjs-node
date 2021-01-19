const scheduled = require('../scheduled');
const cronSetting = require('../cronSetting');
const utils = require('../utils');
const { initModel } = require('../commands/answer');

const initializeScheduled = async (client) => {
  try {
    const announcementChannel = utils.channel.getChannel(client, 'general');
    const releaseChannel = utils.channel.getChannel(client, 'frontend-release');

    scheduled.setupCeremony(announcementChannel, cronSetting.checkIn);
    scheduled.setupCeremony(announcementChannel, cronSetting.checkOut);
    scheduled.setupCeremony(announcementChannel, cronSetting.greeting);
    scheduled.checkNexus(releaseChannel, cronSetting.nexus);

    console.log(`CronJob job ready!`);
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
