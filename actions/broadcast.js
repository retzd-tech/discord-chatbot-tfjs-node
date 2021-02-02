const getWeekendStatus = () => {
  const date = new Date();
  const options = { weekday: 'long' };
  const dayName = date.toLocaleDateString('en-US', options);
  const isWeekend = (dayName === 'Saturday' || dayName === 'Sunday');
  return isWeekend;
};

const broadcastMessage = (channel, ceremony) => {
  if(!getWeekendStatus()){
    channel.send(ceremony.message);
  }
};

module.exports = broadcastMessage;
