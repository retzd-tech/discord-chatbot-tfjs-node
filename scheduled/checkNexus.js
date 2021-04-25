const CronJob = require('cron').CronJob;
const cheerio = require('cheerio');
const axios = require('axios');

const config = require('../config');
const Constant = require('../constant');
const utils = require('../utils');

const sendMessage = (channel, ticket) => {
  const embedOptions = {
    title: "New Publish",
    description: `Halo #qa , there is new Publish for ticket ${ticket}`,
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
  const embedMessage = utils.embed(embedOptions);
  channel.send(embedMessage);
};

const getNexusLog = async (directory) => {
  const { data } = await axios.get(Constant.NEXUS_LOG_URL(directory));
  return data;
};

const saveNexusLog = async (data, directory) => {
  const headers = {
    authorization : `Basic ${config.CREDENTIALS}`,
    "Content-Type": 'text/plain'
  };
  const url = Constant.NEXUS_LOG_URL(directory);
  const result = await axios.put( url, data,{ headers });
  console.debug(`Status = ${result.status}`);
};

const checkData = (searchTerm, logData) => {
  const dataExist = logData.includes(searchTerm);
  return !dataExist;
};

const checkNewPublish = async (channel, directory) => {
  console.log(`check publish on ${directory} : `, new Date());
  let checkedData = await getNexusLog(directory);
  const splittedCheckData = checkedData.split('\n');
  let newPublishLogs = '';
  let newPublish =[];

  const { data } = await axios.get(Constant.REPO_URL + directory);
  const document = cheerio.load(data);
  document('td').find('a').each((index, value) => {
    const ticketText = value.children[0].data;
    if(checkData(ticketText, splittedCheckData)){
      newPublish.push(ticketText)
    }
    newPublishLogs = newPublishLogs.concat(ticketText.concat('\n'))
  });

  newPublish.forEach((item) => sendMessage(channel, item));

  await saveNexusLog(newPublishLogs, directory);
};

const setupNewPublish = (channel, nexusConfig) => {
  console.log(nexusConfig);
  const { time: {minute}, directory } = nexusConfig;
  console.log('start cron job for directory : ', directory);
  const startImmediately = true;
  const onComplete = undefined;
  const cronTime = `*/${minute} * * * *`;
  const timezone = 'Asia/Jakarta';

  const job = new CronJob(cronTime, () => checkNewPublish(channel, directory), onComplete, startImmediately, timezone);

  job.start();
};

module.exports = setupNewPublish;
