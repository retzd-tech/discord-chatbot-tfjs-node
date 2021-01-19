const CronJob = require('cron').CronJob;
const fs = require('fs');
const axios = require('axios');

const sendMessage = (channel, ticket) => {
  const message = `New Publish :
  android : https://nexus.kismanhong.com/repository/dsme/sit/${ticket}/android/sit.apk
  ios : http://68.183.184.222:3000/?env=sit&version=${ticket}`
  channel.send(message);
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
}

const checkNewPublish = async (channel, nexusConfig) => {
  let checkedData = getNexusLog(); //[]
  const splittedCheckData = checkedData.split('\n');
  const newPublishLogs = '';
  const url = 'https://nexus.kismanhong.com/service/rest/repository/browse/dsme/sit/'
  const path = '/html/body/table/tbody/tr/td[1]/a';

  const repoDocument = axios.get(url);
  const textContent = repoDocument.evaluate(path, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE)
  let ticket;
  let newPublish =[];

  do {
    ticket = textContent.iterateNext();
    const ticketText = ticket?.textContent;
    if(checkData(ticketText, splittedCheckData)){
      newPublish.push(ticketText)
    }
    newPublishLogs.concat(ticketText.concat('\n'))
  } while (ticket)

  newPublish.forEach((item) => sendMessage(channel, item))

  await saveNexusLog(checkedData)
}


const setupNewPublish = (channel, nexusConfig) => {
  const { minute } = nexusConfig.time;
  const startImmediately = true;
  const onComplete = undefined;
  const cronTime = `0 ${minute} * * * *`;
  const timezone = 'Asia/Jakarta';

  const job = new CronJob(cronTime, () => checkNewPublish(channel, nexusConfig), onComplete, startImmediately, timezone);

  job.start();
};

module.exports = setupNewPublish;
