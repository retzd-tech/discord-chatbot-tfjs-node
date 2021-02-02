const CronJob = require('cron').CronJob;
const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

const Constant = require('../constant');
const utils = require('../utils');

const sendMessage = (channel, ticket) => {
  const embedOptions = {
    title: "New Publish",
    description: `Hey!, there is new Publish for ticket ${ticket}`,
    fields: [{
      name: "Android",
      value: `https://nexus.kismanhong.com/repository/dsme/sit/${ticket}/android/sit.apk`
    },
      {
        name: "IOS",
        value: `http://68.183.184.222:3000/?env=sit&version=${ticket}`
      }
    ],
  };
  const embedMessage = utils.embed(embedOptions)
  channel.send(embedMessage);
};

const getNexusLog = () => {
  return fs.readFileSync(Constant.CHECK_NEXUS_LOG_DIRECTORY, Constant.READ_FILE_STANDARD);
};

const saveNexusLog = async (data) => {
  await fs.writeFileSync(Constant.CHECK_NEXUS_LOG_DIRECTORY, data);
};

const checkData = (searchTerm, logData) => {
  const dataExist = logData.includes(searchTerm);
  return !dataExist;
};

const checkNewPublish = async (channel) => {
  const releaseChannel = utils.channel.getChannel(channel, 'frontend-release');
  console.log('check publish on : ', new Date());
  let checkedData = getNexusLog();
  const splittedCheckData = checkedData.split('\n');
  let newPublishLogs = '';
  const url = 'https://nexus.kismanhong.com/service/rest/repository/browse/dsme/sit/';
  let newPublish =[];

  const { data } = await axios.get(url);
  const document = cheerio.load(data);
  document('td').find('a').each((index, value) => {
    const ticketText = value.children[0].data;
    if(checkData(ticketText, splittedCheckData)){
      newPublish.push(ticketText)
    }
    newPublishLogs = newPublishLogs.concat(ticketText.concat('\n'))
  });

  newPublish.forEach((item) => sendMessage(releaseChannel, item));

  await saveNexusLog(newPublishLogs);
};


const setupNewPublish = (channel, nexusConfig) => {
  const { minute } = nexusConfig.time;
  const startImmediately = true;
  const onComplete = undefined;
  const cronTime = `0 ${minute} * * * *`;
  const timezone = 'Asia/Jakarta';

  const job = new CronJob(cronTime, () => checkNewPublish(channel), onComplete, startImmediately, timezone);

  job.start();
};

module.exports = setupNewPublish;
