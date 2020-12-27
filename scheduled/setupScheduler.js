const CronJob = require('cron').CronJob;

const setupScheduler = (ceremony) => {
  const { hour, minute } = ceremony.time;
  const startImmediately = true;
  const onComplete = undefined;
  const cronTime = `0 ${minute} ${hour} * * *`;
  const timezone = 'Asia/Jakarta';

  return {
   startImmediately,
   onComplete,
   cronTime,
   timezone
  }
};

const setupCeremony = (channel, ceremony, action) => {
  const scheduler = setupScheduler(ceremony);
  const { onComplete, startImmediately, cronTime, timezone } = scheduler;

  const job = new CronJob(cronTime, () => action(channel, ceremony), onComplete, startImmediately, timezone);

  job.start();
};

const setupActivity = (ceremony, action) => {
  const scheduler = setupScheduler(ceremony);
  const { onComplete, startImmediately, cronTime, timezone } = scheduler;

  const job = new CronJob(cronTime, () => action(ceremony), onComplete, startImmediately, timezone);

  job.start();
};

module.exports = {
  setupCeremony,
  setupActivity
};
