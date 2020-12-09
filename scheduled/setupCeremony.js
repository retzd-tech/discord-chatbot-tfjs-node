const CronJob = require('cron').CronJob;

const activity = (channel, ceremony) => {
  channel.send(ceremony.message);
};

const setupCeremony = (channel, ceremony) => {
  const { hour, minute } = ceremony.time;
  const startImmediately = true;
  const onComplete = undefined;
  const cronTime = `0 ${minute} ${hour} * * *`;
  const timezone = 'Asia/Jakarta';

  const job = new CronJob(cronTime, () => activity(channel, ceremony), onComplete, startImmediately, timezone);

  job.start();
};

module.exports = setupCeremony;
