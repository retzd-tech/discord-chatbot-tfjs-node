const cronSetting = {
  checkIn: {
    time: {
      hour: '9',
      minute: '0'
    },
    message: '@everyone, Check in yuk!'
  },
  checkOut: {
    time: {
      hour: '17',
      minute: '0'
    },
    message: '@everyone, check out yuk!'
  },
  greeting: {
    time: {
      hour: '8',
      minute: '30'
    },
    message: 'Selamat pagi @everyone, yuk bangun dan jangan lupa check in ya'
  },
  resetCheckedIn: {
    time: {
      hour: '0',
      minute: '0'
    }
  },
  checkNexusSit:{
    time:{
      minute: '4'
    },
    directory: 'sit'
  },
  checkNexusStaging:{
    time:{
      minute: '5'
    },
    directory: 'staging'
  },
  checkNexusUat:{
    time:{
      minute: '10'
    },
    directory: 'uat'
  }
};

module.exports = cronSetting;
