const getChannel = (client, channelName) => {
  let selectedChannel;
  client.channels.map((channel) => {
    if(channel.name === channelName){
      selectedChannel = channel;
    }
  });
  return selectedChannel;
};

module.exports = {
  getChannel
};
